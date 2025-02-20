import React, { useState, useEffect } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { FaQuoteLeft, FaStar } from "react-icons/fa";

const testimonials = [
  {
    text: "This platform has completely transformed my event management experience. Highly recommend it!",
    name: "John Doe",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    rating: 5,
  },
  {
    text: "Excellent service! The booking process is seamless and efficient.",
    name: "Jane Smith",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    rating: 4,
  },
  {
    text: "A game-changer in event planning. I'm so impressed by the user-friendly interface.",
    name: "Michael Lee",
    image: "https://randomuser.me/api/portraits/men/12.jpg",
    rating: 5,
  },
];

const TestimonialCarousel: React.FC = () => {
  const [slidesToShow, setSlidesToShow] = useState(1);

  // Adjust slidesToShow based on screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setSlidesToShow(1); // Large screens
      } else if (window.innerWidth >= 768) {
        setSlidesToShow(2); // Medium screens
      } else {
        setSlidesToShow(1); // Small screens
      }
    };

    handleResize(); // Initial setup
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: slidesToShow,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 4000,
  };

  return (
    <div className="flex justify-center items-center bg-gray-50">
      <div className="w-full  bg-white rounded-lg shadow-lg lg:mx-0 p-6 md:px-12 lg:px-16">
        <p className="mb-4 text-center lg:text-left">
          Read what our customers have to say about their experiences.
        </p>
        <Slider {...settings}>
          {testimonials.map((testimonial, index) => (
            <div key={index} className="flex flex-col md:flex-row items-center gap-4">
              <div className="flex-grow">
                <FaQuoteLeft className="text-orange-500 text-3xl mb-4" />
                <p className="text-gray-700 text-lg italic">{testimonial.text}</p>
                <div className="mt-4 flex items-center">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <FaStar key={i} className="text-orange-400" />
                  ))}
                </div>
                <p className="mt-2 text-sm font-bold text-gray-500">- {testimonial.name}</p>
              </div>
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="w-16 h-16 md:w-20 md:h-20 rounded-full border-2 border-gray-200 shadow-lg"
              />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default TestimonialCarousel;
