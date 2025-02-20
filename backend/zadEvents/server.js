// server.js
const { Server } = require("socket.io");
const {
  addChatroom,
  fetchChatroom,
  fetchChatroomById,
  addMessage,
  getAllChatrooms,
} = require('./database');

const io = new Server(8080, {
  cors: {
    origin: "*", // Allow all origins for testing purposes
  },
});

io.on("connection", (socket) => {
  console.log("New client connected:", socket.id);
  // User joins a chatroom
  socket.on('join_chat', ({ username, phone }) => {
    const chatroom = fetchChatroom(username,phone);
    // Log the chatroom ID
    console.log(username,' : joined chatroom ID:',chatroom.chatroomId);
    // Join the chatroom
    socket.join(chatroom.chatroomId);
    // Emit a test message to the room
    socket.to(chatroom.chatroomId).emit('new_message', `Welcome to ${chatroom.chatroomId}!`);
    // Send chat history to the user
    console.log(chatroom);
    io.to(chatroom.chatroomId).emit('chat_history', chatroom);
  });

  // Admin joins a specific chatroom
  socket.on('admin_join', ({ chatroomId }) => {
    socket.join(chatroomId);
    const chatroom = fetchChatroomById(chatroomId);
    if (chatroom) {
      socket.emit('chat_history', chatroom.messages);
    }
  });

  // Send a message to the chatroom
  socket.on('send_message', ({ chatroomId, sender, message }) => {
    addMessage(chatroomId, sender, message);
    io.to(chatroomId).emit('new_message', { sender, message });
  });

  // Emit chatroom list to admin
  socket.on('fetch_chatrooms', (adminPhone) => {
    const chatrooms = getAllChatrooms(adminPhone);
    socket.emit('chatroom_list', chatrooms);
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});
