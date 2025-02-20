const WebSocket = require("ws");

const inMemoryDB = {
  admin: { phoneNumber: "+2547696086" }, // Admin's phone number
  users: {}, // Store users and their chat histories
  chatRooms: {}, // Map users to their unique chat rooms
};

const server = new WebSocket.Server({ port: 8080 });

server.on("connection", (ws) => {
  let currentUserPhone = null;
  let currentChatRoom = null;

  ws.on("message", (message) => {
    const data = JSON.parse(message);
    console.log("Received from client:", data);

    if (data.type === "getRooms" && data.role === "admin") {
      // Send the list of all active chat rooms to the admin
      const chatRoomsList = Object.keys(inMemoryDB.chatRooms).map((roomId) => {
        return roomId;
      });

      ws.send(
        JSON.stringify({
          type: "rooms",
          rooms: chatRoomsList,
        })
      );
    } else if (data.type === "joinRoom") {
      currentChatRoom = data.room;
      // Notify the admin that they have joined the chat room
      ws.send(
        JSON.stringify({
          type: "joined",
          room: currentChatRoom,
        })
      );
    } else if (data.type === "message") {
      const { sender, text } = data;
      const time = new Date().toLocaleTimeString();
      const chatMessage = { sender, text, time };

      if (currentChatRoom) {
        // Broadcast to the chat room
        server.clients.forEach((client) => {
          if (
            client.readyState === WebSocket.OPEN &&
            client !== ws &&
            inMemoryDB.chatRooms[currentChatRoom] &&
            inMemoryDB.chatRooms[currentChatRoom].includes(sender)
          ) {
            client.send(
              JSON.stringify({
                type: "message",
                room: currentChatRoom,
                sender,
                message: chatMessage,
                time,
              })
            );
          }
        });
      }
    }
  });
});
