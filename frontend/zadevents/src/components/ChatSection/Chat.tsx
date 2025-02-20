import React, { useEffect, useRef, useState } from "react";

interface Message {
  type: "incoming" | "outgoing";
  text: string;
  time: string;
  status: "read" | "unread" | "failed";
}

const ChatSection: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { type: "incoming", text: "Hi there!", time: "10:00 AM", status: "read" },
    {
      type: "incoming",
      text: "How's it going?",
      time: "10:02 AM",
      status: "unread",
    },
    {
      type: "outgoing",
      text: "All good, planning for the weekend events!",
      time: "10:03 AM",
      status: "read",
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [adminStatus, setAdminStatus] = useState<"online" | "offline">("online");
  const [isTyping, setIsTyping] = useState(false);

  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll to the bottom when messages are updated
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    // Simulate admin typing and online status
    if (adminStatus === "online") {
      const typingInterval = setInterval(() => {
        setIsTyping((prev) => !prev);
      }, 10000);

      return () => clearInterval(typingInterval);
    }
  }, [adminStatus]);

  const handleSendMessage = () => {
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

      // Simulate status updates for outgoing messages
      setTimeout(() => {
        setMessages((prevMessages) =>
          prevMessages.map((msg, index) =>
            index === prevMessages.length - 1
              ? { ...msg, status: "read" }
              : msg
          )
        );
      }, 2000);

      // Simulate incoming messages after sending
      setTimeout(() => {
        const incomingMessage: Message = {
          type: "incoming",
          text: "Got it! Let’s finalize the details soon.",
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          status: "unread",
        };
        setMessages((prevMessages) => [...prevMessages, incomingMessage]);

        // Simulate incoming message being read
        setTimeout(() => {
          setMessages((prevMessages) =>
            prevMessages.map((msg, idx) =>
              idx === prevMessages.length - 1
                ? { ...msg, status: "read" }
                : msg
            )
          );
        }, 3000);
      }, 3000);
    }
  };

  return (
    <div className="bg-gray-50 p-4 rounded shadow-md mt-6">
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

      {/* Typing Indicator */}
      {adminStatus === "online" && isTyping && (
        <div className="mb-2 text-gray-400 text-sm">Admin is typing...</div>
      )}

      {/* Chat Messages */}
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
                {/* Display status only for outgoing messages */}
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

      {/* Input and Send Button */}
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
          onClick={handleSendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatSection;
