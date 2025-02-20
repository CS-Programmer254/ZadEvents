import React, { useState } from "react";
const UserChatDetailsModal: React.FC<{
    onSubmit: (username: string, phone: string) => void;
    onClose: () => void;
  }> = ({ onSubmit, onClose }) => {
    const [username, setUsername] = useState("");
    const [phone, setPhone] = useState("");
  
    const handleSubmit = () => {
      if (username && phone) {
        onSubmit(username, phone);
      }
    };
  
    return (
      <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
        <div className="bg-white p-6 rounded shadow-lg w-96">
          <h2 className="text-lg font-bold mb-4">Enter Your Details</h2>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">Username</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded p-2"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">Phone Number</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded p-2"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button
              className="bg-gray-300 hover:bg-gray-400 text-black py-2 px-4 rounded"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
              onClick={handleSubmit}
            >
              Join Chat
            </button>
          </div>
        </div>
      </div>
    );
  };
  