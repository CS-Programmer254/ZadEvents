import React, { useState } from "react";
import Sidebar from "./components/SideBar/SideBar";
import Banner from "./components/Banner/Banner"; // Assuming Banner contains the carousel
import TopCircles from "./components/TopCircles/TopCircles";
import EventList from "./components/EventList/EventList";
import ChatSection from "./components/ChatSection/ChatSection";
import RightHeroSection from "./components/RightHeroSection/RightHeroSection";
import "./App.css";

const App: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Toggle body scroll
  React.useEffect(() => {
    if (isSidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isSidebarOpen]);

  return (
    <div className="flex flex-col h-screen lg:flex-row lg:overflow-hidden">
      {/* Menu Button (visible only when sidebar is closed) */}
      {!isSidebarOpen && (
        <button
          className="fixed top-4 left-4 z-50 bg-blue-500 text-white px-4 py-2 rounded-full lg:hidden"
          onClick={() => setIsSidebarOpen(true)}
        >
          Menu
        </button>
      )}

      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />

      {/* Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:flex-row lg:overflow-hidden">
        {/* Main Section */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-6 bg-gray-50 hide-scrollbar">
          <TopCircles bookedUsersCount={30000} />
          <div className="relative flex flex-col items-center mb-10 bg-white rounded-lg shadow-md">
            <Banner /> 
          </div>
          <EventList />
          <ChatSection />
        </main>

        {/* Right Hero Section */}
        <div className="lg:w-96 w-full overflow-y-auto bg-white">
          <RightHeroSection />
        </div>
      </div>
    </div>
  );
};

export default App;
