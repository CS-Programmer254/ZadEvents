import React from "react";

interface SidebarProps {
  isOpen: boolean;
  setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, setIsSidebarOpen }) => {
  return (
    <div
      className={`fixed top-0 left-0 h-full bg-blue-500 text-white w-64 transform transition-transform duration-300 z-50 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } lg:relative lg:translate-x-0 lg:block`}
    >
      {/* Close Button */}
      {isOpen && (
        <button
          className="absolute top-4 right-4 text-white text-2xl"
          onClick={() => setIsSidebarOpen(false)}
          aria-label="Close sidebar"
        >
          ×
        </button>
      )}

      <nav className="p-6">
        <h1 className="text-2xl font-bold mb-8">ZadEvents</h1>
        <ul className="space-y-4">
          {[
            "Home",
            "Upcoming Events",
            "Bookings",
            "Mode of Payment",
            "Chat Admin",
            "Contact",
            "Location",
            "Subscribe to Our Newsletters",
            "Social Media Links",
          ].map((item) => (
            <li key={item}>
              <a
                href="#"
                className="block px-4 py-2 rounded hover:bg-gray-700 transition"
              >
                {item}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
