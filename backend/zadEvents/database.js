// database.js
// database.js
const inMemoryDB = {
    chatRooms: {
      "12345": {
        user: {
          username: "Stan",
          phone: "12345",
        },
        admin: {
            username: "Admin",
            phone: "123456",
          },
        messages: [
          {
            sender: "Admin",
            message: "Hello, how can I assist you today?",
            timestamp: new Date("2024-12-01T10:00:00Z"),
          },
          {
            sender: "Stan",
            message: "I need help with my subscription.",
            timestamp: new Date("2024-12-01T10:05:00Z"),
          },
          {
            sender: "Admin",
            message: "Sure, let me check that for you.",
            timestamp: new Date("2024-12-01T10:10:00Z"),
          },
        ],
      },
    },
  };
  const addChatroom = (user, admin) => {
    const chatroomId = `room_${Date.now()}`;
    inMemoryDB.chatRooms[chatroomId] = {
      user,
      admin,
      messages: [
        {
          sender: admin.username,
          message: "Hello, welcome to the chat! How can I assist you today?",
          timestamp: new Date().toISOString(), // Current timestamp
        },
      ],
    };
    return chatroomId;
  };
  
  const fetchChatroom = (username, userPhone) => {
      // Find the chatroom based on user phone
    let chatroomId;
    let chatroom = Object.entries(inMemoryDB.chatRooms).find(([id, room]) => {
      if (room.user.phone === userPhone) {
        chatroomId = id;
        return true;
      }
      return false;
    });
    if (!chatroom) {
        const admin = { username: "Admin", phone: "123456" };
        const user = { username, phone: userPhone };
        chatroomId = addChatroom(user, admin);
        chatroom = [chatroomId, inMemoryDB.chatRooms[chatroomId]];
      }
      // Return both chatroom object and its ID
      return { chatroomId, ...chatroom[1] };
    
  };
  
  const fetchChatroomById = (chatroomId) => {
    return inMemoryDB.chatRooms[chatroomId];
  };
  
  const addMessage = (chatroomId, sender, message) => {
    const chatroom = inMemoryDB.chatRooms[chatroomId];
    if (chatroom) {
      chatroom.messages.push({
        sender,
        message,
        timestamp: new Date().toISOString(),
      });
    }
  };
  
  const getAllChatrooms = (adminPhone) => {
    return Object.values(inMemoryDB.chatRooms).filter(
      (room) => room.admin.phone === adminPhone
    );
  };
  
  module.exports = {
    addChatroom,
    fetchChatroom,
    fetchChatroomById,
    addMessage,
    getAllChatrooms,
  };
  