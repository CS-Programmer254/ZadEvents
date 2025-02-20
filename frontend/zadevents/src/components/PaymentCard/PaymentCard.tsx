import React from "react";
import { FaHandPointDown } from "react-icons/fa"; // Import the hand icon

const PaymentCard: React.FC = () => {
  return (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="text-xl font-semibold mb-4 text-orange-400">Supported Payment Mode: Mpesa</h3>
      <div className="flex flex-col items-center mb-4">
        {/* Mpesa Icon */}
        <img
          src="https://img.icons8.com/?size=96&id=kUwZnzomzbTj&format=png" // Replace with your Mpesa icon path
          alt="Mpesa"
          className="w-32 h-32 mb-2"
        />
        {/* Hand Icon */}
        <FaHandPointDown className="text-3xl mb-2" />
      </div>
      <div>
        <h4 className="font-semibold mb-2">Payment Steps:</h4>
        <ol className="list-decimal pl-4">
          <li>Go to the Mpesa app on your phone.</li>
          <li>Select "Lipa na Mpesa."</li>
          <li>Choose "Paybill" and enter the business number.</li>
          <li>Follow the instructions to complete the payment.</li>
        </ol>
      </div>
    </div>
  );
};

export default PaymentCard;
