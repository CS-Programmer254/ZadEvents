const WebSocket = require("ws");

// In-memory database
const inMemoryDB = {
  admin: { phoneNumber: "+2547696086" }, // Admin's phone number
  users: {}, // Store users and their chat histories
  chatRooms: {}, // Map users to their unique chat rooms
};

const server = new WebSocket.Server({ port: 8080 });

server.on("connection", (ws) => {
  console.log("New client connected.");

  ws.on("message", (message) => {
    const data = JSON.parse(message);

    if (data.type === "getRooms" && data.role === "admin") {
      // Send the list of chat rooms to the admin
      const rooms = Object.keys(inMemoryDB.chatRooms);
      ws.send(
        JSON.stringify({
          type: "rooms",
          rooms: rooms,
        })
      );
    } else if (data.type === "joinRoom") {
      // Handle admin joining a chat room
      const room = data.room;
      if (inMemoryDB.chatRooms[room]) {
        ws.send(
          JSON.stringify({
            type: "joined",
            room: room,
          })
        );

        // Notify all users in the chat room about the admin joining
        server.clients.forEach((client) => {
          if (client.readyState === WebSocket.OPEN) {
            client.send(
              JSON.stringify({
                type: "adminJoined",
                room: room,
              })
            );
          }
        });
      }
    } else if (data.type === "message") {
      // Handle new message
      const { sender, text, room } = data;
      const time = new Date().toLocaleTimeString();

      const chatMessage = { sender, text, time };
      if (inMemoryDB.chatRooms[room]) {
        inMemoryDB.chatRooms[room].forEach((clientPhone) => {
          // Broadcast message to all users in the chat room
          server.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN && clientPhone !== client.userPhone) {
              client.send(
                JSON.stringify({
                  type: "message",
                  room: room,
                  message: chatMessage,
                })
              );
            }
          });
        });
      }
    }
  });

  ws.on("close", () => {
    console.log("Client disconnected.");
  });
});
