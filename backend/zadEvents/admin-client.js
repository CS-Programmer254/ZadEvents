const WebSocket = require("ws");
const readline = require("readline");

const ws = new WebSocket("ws://localhost:8080");

ws.on("open", () => {
  console.log("Connected to server.");
  console.log("Retrieving list of chat rooms...");

  // Send a request to the server to get the chat room list
  ws.send(JSON.stringify({ type: "getRooms", role: "admin" }));
});

ws.on("message", (message) => {
  const data = JSON.parse(message);
  console.log("Received from server:", data);

  if (data.type === "rooms") {
    // Display the list of chat rooms and prompt the admin to choose
    if (data.rooms.length > 0) {
      console.log("Pending chat rooms:");
      data.rooms.forEach((room, index) => {
        console.log(`${index + 1}: ${room}`);
      });
      console.log("Enter the number of the chat room you want to join.");

      // Set up readline for input
      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
      });

      rl.question("Enter the number: ", (answer) => {
        const roomNumber = parseInt(answer, 10) - 1;
        if (data.rooms[roomNumber]) {
          ws.send(
            JSON.stringify({
              type: "joinRoom",
              room: data.rooms[roomNumber],
            })
          );
          console.log(`You have chosen to join chat room: ${data.rooms[roomNumber]}`);
          rl.close();
        } else {
          console.log("Invalid room selection. Please try again.");
          rl.close();
        }
      });
    } else {
      console.log("No chat rooms available at the moment.");
    }
  } else if (data.type === "joined") {
    console.log(`You have joined the chat room: ${data.room}`);
    // Listen for messages in the joined chat room
    listenForMessages();
  } else if (data.type === "message") {
    console.log(`[${data.time}] ${data.sender}: ${data.message}`);
  }
});

// Function to listen for new messages and send them to the server
function listenForMessages() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.on("line", (input) => {
    ws.send(
      JSON.stringify({
        type: "message",
        text: input,
      })
    );
  });
}
