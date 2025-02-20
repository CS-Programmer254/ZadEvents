import React, { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import { motion } from "framer-motion";

interface Message {
  sender: "Admin" | "User";
  type: "incoming" | "outgoing" | "system";
  text: string;
  time: string;
  status: "read" | "unread" | "failed";
}

const ChatSection: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [adminStatus, setAdminStatus] = useState<"online" | "offline">("online");
  const [isTyping, setIsTyping] = useState(false);
  const [isChatVisible, setIsChatVisible] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");

  const chatContainerRef = useRef<HTMLDivElement>(null);
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    socketRef.current = io("http://localhost:8080");

    // Listen for chat history response
    socketRef.current.on("chat_history", (chatHistory) => {
      if (chatHistory) {
        setMessages(
          chatHistory.messages.map((msg) => ({
            sender: msg.sender === "Admin" ? "Admin" : "User",
            type: msg.sender === "Admin" ? "incoming" : "outgoing",
            text: msg.message,
            time: new Date(msg.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            status: "unread",
          }))
        );
        setIsFormVisible(false);
        setIsChatVisible(true); // Show chat section
        setIsLoading(false); // Stop loading spinner
      }
    });

    // Listen for new messages
    socketRef.current.on("new_message", (data) => {
      const incomingMessage: Message = {
        sender: data.sender === "Admin" ? "Admin" : "User",
        type: "incoming",
        text: data.message,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        status: "unread",
      };
      setMessages((prevMessages) => [...prevMessages, incomingMessage]);
    });

    return () => {
      socketRef.current?.disconnect();
    };
  }, []);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleJoinChat = () => {
    setIsFormVisible(true);
  };

  const handleFormSubmit = () => {
    if (username && phone) {
      setIsLoading(true); // Show loading spinner
      socketRef.current?.emit("join_chat", { username, phone }); // Emit join_chat event
    } else {
      alert("Please fill in both fields.");
    }
  };

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      const newMessage: Message = {
        sender: "User",
        type: "outgoing",
        text: inputMessage,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        status: "unread",
      };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setInputMessage("");

      socketRef.current?.emit("send_message", {
        chatroomId: phone,
        sender: username,
        message: inputMessage,
      });
    }
  };

  return (
    <div className="bg-gray-50 p-4 rounded shadow-md mt-6">
      {!isChatVisible && !isFormVisible && (
        <button
          className="bg-green-500 text-white px-6 py-3 rounded hover:bg-green-600 transition"
          onClick={handleJoinChat}
        >
          Join Chat
        </button>
      )}

      {isFormVisible && !isLoading && (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 bg-white p-6 rounded-lg shadow-lg flex flex-col items-center"
        >
          <h3 className="text-xl font-semibold mb-4">Enter Your Details to Join Chat With Admin</h3>
          <input
            type="text"
            className="border border-gray-300 rounded px-4 py-2 mb-3"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="text"
            className="border border-gray-300 rounded px-4 py-2 mb-3"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
            onClick={handleFormSubmit}
          >
            Submit
          </button>
        </motion.div>
      )}

      {isLoading && (
        <div className="absolute inset-0 bg-white flex justify-center items-center">
          <div className="spinner-border animate-spin h-8 w-8 border-4 border-blue-500 rounded-full"></div>
        </div>
      )}

      {isChatVisible && (
        <div>
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
            </div>
          </div>

          <div ref={chatContainerRef} className="overflow-y-auto h-64 bg-white p-4 rounded border relative hide-scrollbar">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`mb-3 flex ${
                  message.sender === "Admin" ? "justify-start" : "justify-end"
                }`}
              >
                <div
                  className={`relative max-w-xs px-4 py-2 rounded-lg text-sm ${
                    message.sender === "Admin"
                      ? "bg-blue-200 border border-blue-300"
                      : "bg-green-200 border border-green-300"
                  }`}
                >
                  <div className="text-gray-400 text-xs mb-1">{message.time}</div>
                  {message.text}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 flex">
            <input
              type="text"
              className="flex-1 border border-gray-300 px-3 py-2 rounded"
              placeholder="Type a message..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
            />
            <button
              className="ml-3 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
              onClick={handleSendMessage}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatSection;
