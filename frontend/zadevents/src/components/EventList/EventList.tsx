import React, { useState, useEffect, useRef } from "react";

const EventList: React.FC = () => {
  const events = [
    {
      id: 1,
      title: "The Hangover (2009)",
      date: "2023-11-28",
      time: "10:00 AM",
      backgroundImage:
        "https://images.pexels.com/photos/2608517/pexels-photo-2608517.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      id: 2,
      title: "Mad Max: Fury Road (2015)",
      date: "2023-11-28",
      time: "11:30 AM",
      backgroundImage:
        "https://images.pexels.com/photos/169198/pexels-photo-169198.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      id: 3,
      title: "Inception (2010)",
      date: "2023-11-29",
      time: "2:00 PM",
      backgroundImage:
        "https://images.pexels.com/photos/13234772/pexels-photo-13234772.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    // Add more events as needed
  ];

  const carouselRef = useRef<HTMLUListElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timer;

    if (!isHovered) {
      interval = setInterval(() => {
        if (carouselRef.current) {
          carouselRef.current.scrollBy({ left: 200, behavior: "smooth" });
        }
      }, 3000);
    }

    return () => clearInterval(interval);
  }, [isHovered]);

  return (
    <div className="mt-10">
      {/* Event List Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Upcoming Events</h2>
        <button
          className="hidden md:block px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
          onClick={() => {
            if (carouselRef.current) {
              carouselRef.current.scrollBy({ left: 300, behavior: "smooth" });
            }
          }}
        >
          See More Events →
        </button>
      </div>

      {/* Event List */}
      <ul
        ref={carouselRef}
        className="mt-4 space-y-6 md:flex md:space-y-0 md:gap-6 md:overflow-x-auto hide-scrollbar"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {events.map((event) => (
          <li
            key={event.id}
            className="relative h-48 min-w-full md:min-w-[300px] rounded-lg overflow-hidden bg-cover bg-center text-white shadow-lg flex-shrink-0"
            style={{
              backgroundImage: `url(${event.backgroundImage})`,
            }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>
            <div className="relative p-6 flex flex-col justify-between h-full">
              <div>
                <h3 className="text-xl font-semibold">{event.title}</h3>
                <p className="text-sm">
                  {event.date} - {event.time}
                </p>
              </div>
              <button className="self-start px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition">
                Book
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventList;
