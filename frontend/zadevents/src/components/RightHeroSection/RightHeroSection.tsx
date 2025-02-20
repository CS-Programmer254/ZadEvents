import React from "react";
import PaymentCard from "../PaymentCard/PaymentCard"; 
import TestimonialCarousel from "../TestimonialCarousel/TestimonialCarousel"; 

const RightHeroSection: React.FC = () => {
  return (
    <aside className="w-full lg:w-96 bg-white-100 p-6 overflow-y-auto hide-scrollbar">
      <h2 className="text-3xl font-bold text-blue-500 text-center mb-6">Testimonials</h2>
      <div className="space-y-6">
        {/* Testimonial Carousel */}
        <TestimonialCarousel />

        {/* Additional content */}
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-xl font-semibold mb-2">See Event Categories</h3>
          <p>Explore different types of events and find what interests you.</p>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-xl font-semibold mb-2">Testimonials</h3>
          <p>Read what our customers have to say about their experiences.</p>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-xl font-semibold mb-2">Satisfied Customers Across the Globe</h3>
          <p>Join thousands of happy customers worldwide.</p>
        </div>

        {/* Payment Card */}
        <PaymentCard />
      </div>
    </aside>
  );
};

export default RightHeroSection;
