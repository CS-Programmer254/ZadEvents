const WebSocket = require("ws");
const readline = require("readline");

const ws = new WebSocket("ws://localhost:8080");

// When connected to the server
ws.on("open", () => {
  console.log("Connected to the server. You can start chatting with the admin.");

  // Send a message to create a new chat room if necessary
  ws.send(
    JSON.stringify({
      type: "startChat",
      userPhone: "+2547696086", // Replace this with the actual user phone number
    })
  );
});

// Handle incoming messages from the server
ws.on("message", (message) => {
  const data = JSON.parse(message);

  if (data.type === "message") {
    console.log(`[${data.time}] ${data.sender}: ${data.message}`);
  } else if (data.type === "adminJoined") {
    console.log(`Admin has joined your chat room. You can start sending messages.`);
  }
});

// Function to listen for user input and send messages to the server
function startChat() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.on("line", (input) => {
    ws.send(
      JSON.stringify({
        type: "message",
        text: input,
        sender: "+2547696086", // Replace with the user's phone number
      })
    );
  });
}

// Start listening for user input
startChat();
