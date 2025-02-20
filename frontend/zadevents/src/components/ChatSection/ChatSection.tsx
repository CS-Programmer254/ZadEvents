import React, { useState, useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";

// Define message type
interface Message {
  type: "incoming" | "outgoing";
  text: string;
  time: string;
  status: "read" | "unread" | "failed";
}
interface ChatHistory{
  chatroomId: string;
  user: { username: string; phone: string };
  admin: { username: string; phone: string };
  messages: {
    sender: string;
    message: string;
    timestamp: string;
  }[];
}

const ChatSection: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [adminStatus, setAdminStatus] = useState<"online" | "offline">("online");
  const [isTyping, setIsTyping] = useState(false);
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [isJoined, setIsJoined] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);

  // Create a ref to manage the socket connection
  const socketRef = useRef<Socket | null>(null);
  // Ref for the chat container to scroll to the bottom
  const chatContainerRef = useRef<HTMLDivElement | null>(null);

  // Initialize socket connection if it doesn't exist yet
  useEffect(() => {
    if (!socketRef.current) {
      socketRef.current = io("http://localhost:8080"); // Connect to your server URL
    }

    // Cleanup on component unmount
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
      }
    };
  }, []);

  // Auto-scroll to the bottom of the chat container when messages change
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  // Handle form submission for joining chat
  const handleJoinChat = () => {
    if (username && phone && socketRef.current) {
      // Emit the 'join_chat' event with username and phone to the server
      socketRef.current.emit('join_chat', { username, phone });

      // Set the initial messages for the chat
      setMessages([
        {
          type: "incoming",
          text: "Hello, welcome to the chat! How can I assist you today?",
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          status: "unread",
        },
      ]);

      setIsFormVisible(false);
      setIsJoined(true);

      console.log("User joined the chat with username:", username);
    }
  };

  useEffect(() => {
    if (socketRef.current) {
      // Listen for chat history response when joining a chat
      socketRef.current.on("chat_history", (chatHistory:ChatHistory) => {
        if (chatHistory && chatHistory.messages) {
          console.log("Chat History:", chatHistory.messages);
          // Map over the messages to format them as needed
          setMessages(chatHistory.messages.map((msg) => ({
            sender: msg.sender === "Admin" ? "Admin" : "User",
            type: msg.sender === "Admin" ? "incoming" : "outgoing",
            text: msg.message,
            time: new Date(msg.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            status: "unread", // Default to unread; adjust based on your logic
          })));
        }
      });
    }
  
    // Cleanup the event listener on unmount
    return () => {
      if (socketRef.current) {
        socketRef.current.off('chat_history');
      }
    };
  }, []);
  

  // Handle the click event for the join button
  const handleJoinButtonClick = () => {
    setIsFormVisible(true);
  };

  return (
    <div className="bg-gray-50 p-4 rounded shadow-md mt-6">
      {/* Join Button */}
      {!isJoined && !isFormVisible && (
        <div className="flex justify-center mb-4">
          <button
            className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition"
            onClick={handleJoinButtonClick}
          >
            Join Chat
          </button>
        </div>
      )}

      {/* Join Form */}
      {isFormVisible && (
        <div className="fixed top-0 left-0 right-0 flex justify-center items-center bg-gray-500 bg-opacity-50 h-full">
          <div
            className="bg-white p-6 rounded-lg shadow-lg animate__animated animate__fadeIn animate__faster"
            style={{ width: "300px" }}
          >
            <h2 className="text-xl font-semibold mb-4">Join Chat</h2>
            <div className="mb-4">
              <input
                type="text"
                className="w-full border border-gray-300 rounded px-4 py-2"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <input
                type="text"
                className="w-full border border-gray-300 rounded px-4 py-2"
                placeholder="Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <button
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
              onClick={handleJoinChat}
            >
              Join Chat
            </button>
          </div>
        </div>
      )}

      {/* Chat Header */}
      {isJoined && (
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-orange-500">Make Inquiries (Chat Admin)</h2>
          <div className="text-sm text-gray-500">
            <span>
              Admin{" "}
              {adminStatus === "online" ? (
                <span className="text-green-500">Online</span>
              ) : (
                <span className="text-red-500">Offline</span>
              )}
            </span>
            <br />
            (+2547696086)
          </div>
        </div>
      )}

      {/* Typing Indicator */}
      {adminStatus === "online" && isTyping && (
        <div className="mb-2 text-gray-400 text-sm">Admin is typing...</div>
      )}

      {/* Chat Messages */}
      {isJoined && (
        <div
          ref={chatContainerRef}
          className="overflow-y-auto h-64 bg-white p-4 rounded border relative hide-scrollbar"
        >
          {messages.map((message, index) => (
            <div
              key={index}
              className={`mb-3 flex ${
                message.type === "incoming" ? "justify-start" : "justify-end"
              }`}
            >
              <div
                className={`relative max-w-xs px-4 py-2 rounded-lg text-sm ${
                  message.type === "incoming"
                    ? "bg-gray-200 text-black"
                    : "bg-blue-500 text-white"
                }`}
              >
                {message.text}
                <div
                  className={`absolute w-0 h-0 border-t-8 border-b-8 ${
                    message.type === "incoming"
                      ? "border-r-8 border-gray-200 -left-2 top-1/2 transform -translate-y-1/2"
                      : "border-l-8 border-blue-500 -right-2 top-1/2 transform -translate-y-1/2"
                  }`}
                />
                <div className="mt-2 text-xs flex justify-between items-center">
                  <span>{message.time}</span>
                  {message.type === "outgoing" && message.status && (
                    <span
                      className={`ml-2 ${
                        message.status === "read"
                          ? "text-green-500"
                          : message.status === "failed"
                          ? "text-red-500"
                          : "text-gray-500"
                      }`}
                    >
                      {message.status === "read" && (
                        <span className="flex items-center">
                          Read
                          <span className="ml-1 w-2 h-2 bg-green-500 rounded-full"></span>
                        </span>
                      )}
                      {message.status === "unread" && "Unread"}
                      {message.status === "failed" && "Failed"}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Input and Send Button */}
      {isJoined && (
        <div className="mt-4 flex items-center space-x-2">
          <input
            type="text"
            className="flex-1 border border-gray-300 rounded px-3 py-2"
            placeholder="Type a message..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
          />
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
            onClick={() => {
              if (inputMessage.trim()) {
                const newMessage: Message = {
                  type: "outgoing",
                  text: inputMessage,
                  time: new Date().toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  }),
                  status: "unread",
                };
                setMessages((prevMessages) => [...prevMessages, newMessage]);
                setInputMessage("");
              }
            }}
          >
            Send
          </button>
        </div>
      )}
    </div>
  );
};

export default ChatSection;
