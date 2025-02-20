const JoinChatButton: React.FC<{ onClick: () => void }> = ({ onClick }) => (
    <div className="fixed bottom-4 right-4">
      <button
        className="bg-orange-500 hover:bg-orange-600 text-white p-4 rounded-full shadow-lg transition-transform transform hover:scale-110 animate-bounce"
        onClick={onClick}
      >
        Join Chat
      </button>
    </div>
  );
  
  