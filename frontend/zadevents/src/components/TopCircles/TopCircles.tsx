import React from "react";

interface TopCirclesProps {
  bookedUsersCount: number; // Prop to pass the total number of users who have booked events
}

const TopCircles: React.FC<TopCirclesProps> = ({ bookedUsersCount }) => {
  // Placeholder images for avatars
  const images = [
    "https://randomuser.me/api/portraits/women/1.jpg",
    "https://randomuser.me/api/portraits/men/2.jpg",
    "https://randomuser.me/api/portraits/women/3.jpg",
    "https://randomuser.me/api/portraits/men/4.jpg",
  ];

  return (
    <div className="relative flex flex-col items-center mb-10 p-4 bg-white rounded-lg shadow-md">
      {/* "Trusted By" label and user count */}
      <div className="flex flex-col items-center mb-4">
        <span className="text-sm font-bold text-gray-800">Trusted By</span>
        <span className="text-lg font-semibold text-gray-600">
          {bookedUsersCount.toLocaleString()} Users
        </span>
      </div>

      {/* Cascading images */}
      <div className="flex space-x-[-10px] mb-4">
        {images.map((src, index) => (
          <div
            key={index}
            className="w-10 h-10 rounded-full border-2 border-white overflow-hidden shadow-md"
            style={{ transform: `translateX(${index * -10}px)` }}
          >
            <img
              src={src}
              alt={`Person ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopCircles;
