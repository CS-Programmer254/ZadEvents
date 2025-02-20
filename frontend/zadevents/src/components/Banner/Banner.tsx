import React from "react";

const Banner: React.FC = () => {
  return (
    <div
      className="w-full h-[400px] sm:h-[500px] lg:h-[30rem] bg-cover bg-center text-white relative rounded-md flex flex-col items-center justify-center"
      style={{
        backgroundImage:
          "url('https://images.pexels.com/photos/2263436/pexels-photo-2263436.jpeg?auto=compress&cs=tinysrgb&w=600')",
      }}
    >
      {/* Overlay */}
      <div className="bg-black bg-opacity-50 w-full h-full flex flex-col items-center justify-center px-6 py-8 sm:px-8 lg:px-12 rounded-md">
        {/* Heading */}
        <h1 className="text-2xl sm:text-3xl lg:text-5xl font-bold text-center leading-snug">
          Let's Party <span className="text-orange-400">Relax on Weekends</span>
          <br /> with TikoZadEvents
        </h1>
        <p className="mt-4 text-sm sm:text-base lg:text-lg text-white text-center">
          Come experience a blissful weekend by choosing a package for yourself.
        </p>

        {/* Action Buttons */}
        <div className="mt-4 flex flex-wrap justify-center gap-4 w-full">
          <a
            href="#couple"
            className="inline-block bg-white text-blue-500 px-4 py-2 text-xs sm:text-sm lg:text-base rounded font-bold hover:bg-gray-200 transition"
          >
            Couple Package
          </a>
          <a
            href="#friends"
            className="inline-block bg-white text-blue-500 px-4 py-2 text-xs sm:text-sm lg:text-base rounded font-bold hover:bg-gray-200 transition"
          >
            Friends
          </a>
          <a
            href="#single"
            className="inline-block bg-white text-blue-500 px-4 py-2 text-xs sm:text-sm lg:text-base rounded font-bold hover:bg-gray-200 transition"
          >
            Single Ticket
          </a>
        </div>
      </div>

      {/* Container for "Book Now" button and arrow */}
      <div className="absolute bottom-4 sm:bottom-8 lg:bottom-12 left-1/2 transform -translate-x-1/2 flex flex-col items-center space-y-4">
        {/* Down Arrow */}
        <div
          className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-500 rounded-full flex items-center justify-center animate-bounce"
          style={{ animationDuration: "1.5s" }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="4"
            stroke="white"
            className="w-6 h-6 transform transition duration-300 ease-in-out"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
        {/* Book Now Button */}
        <button
          className="bg-orange-500 text-white px-6 py-3 font-semibold text-xs sm:text-sm lg:text-lg rounded-full shadow-lg hover:bg-orange-600 transition duration-300"
        >
          Book Now
        </button>
      </div>
    </div>
  );
};

export default Banner;
