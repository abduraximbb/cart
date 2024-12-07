

import React, { useRef } from "react";
import { useStateValue } from "../../context";
import { Navigate } from "react-router-dom";

const CheckOut = () => {
  const { cart, setCart } = useStateValue();
  const lname = useRef(null);
  const fname = useRef(null);
  const address = useRef(null);

  if (!cart.length) {
    return <Navigate replace to={"/"} />;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setCart([]);
    lname.current.value = "";
    fname.current.value = "";
    address.current.value = "";
    alert("Your order has been placed successfully!");
  };

  const totalPrice = cart?.reduce(
    (sum, item) => sum + item.price * item.amount,
    0
  );

  return (
    <div className="container flex justify-center items-center min-h-screen bg-gray-50">
      <div className="flex flex-col gap-6 p-6 bg-white rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-2xl font-semibold text-gray-800 text-center">
          Checkout
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            ref={fname}
            className="p-3 outline-none border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400"
            required
            type="text"
            placeholder="First Name"
          />
          <input
            ref={lname}
            className="p-3 outline-none border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400"
            required
            type="text"
            placeholder="Last Name"
          />
          <input
            ref={lname}
            className="p-3 outline-none border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400"
            required
            type="text"
            placeholder="Phone number"
          />
          <input
            ref={lname}
            className="p-3 outline-none border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400"
            required
            type="text"
            placeholder="Email"
          />
          <input
            ref={address}
            className="p-3 outline-none border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400"
            required
            type="text"
            placeholder="Address"
          />
          <div className="p-4 bg-gray-100 rounded-lg shadow-md text-center">
            <p className="text-lg font-medium text-gray-700">
              Total:{" "}
              <span className="text-xl font-semibold text-green-600">
                ${totalPrice.toFixed(2)} USD
              </span>
            </p>
          </div>
          <button className="w-full py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-blue-700 active:scale-95 transition duration-150">
            Place Order
          </button>
        </form>
      </div>
    </div>
  );
};

export default CheckOut;
