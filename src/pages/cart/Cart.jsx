

import React, { useEffect } from "react";
import { useStateValue } from "../../context";
import Empty from "../../components/empty/Empty";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cart, setCart } = useStateValue();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleIncrement = (product) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === product.id ? { ...item, amount: item.amount + 1 } : item
      )
    );
  };

  const handleDecrement = (product) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === product.id
          ? {
              ...item,
              amount: item.amount > 1 ? item.amount - 1 : item.amount,
            }
          : item
      )
    );
  };

  const handleDelete = (product) => {
    setCart((prev) => prev.filter((item) => item.id !== product.id));
  };

  const totalPrice = cart?.reduce(
    (sum, item) => sum + item.price * item.amount,
    0
  );

  return (
    <section className="min-h-[80vh] bg-gray-50 py-10">
      <div className="container mx-auto text-center">
        {cart.length ? (
          <div className="flex flex-col lg:flex-row gap-8 relative">
            <div className="flex-1">
              {cart?.map((item) => (
                <div
                  key={item.id}
                  className="w-full flex flex-col p-4 mb-6 shadow-lg items-center rounded-lg bg-white"
                >
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-20 h-20 rounded-lg object-cover"
                  />
                  <div className="ml-4 flex-1">
                    <h3 className="text-lg font-semibold truncate text-gray-800 hover:text-green-600">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-500">
                      ${(item.price * item.amount).toFixed(2)} USD
                    </p>
                    <button
                      className="text-sm text-red-500 mt-2 hover:underline"
                      onClick={() => handleDelete(item)}
                    >
                      Remove
                    </button>
                  </div>
                  <div className="flex items-center">
                    <button
                      disabled={item.amount <= 1}
                      onClick={() => handleDecrement(item)}
                      className="px-3 py-1 bg-gray-200 rounded-l-md hover:bg-gray-300"
                    >
                      -
                    </button>
                    <span className="px-4">{item.amount}</span>
                    <button
                      onClick={() => handleIncrement(item)}
                      className="px-3 py-1 bg-gray-200 rounded-r-md hover:bg-gray-300"
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="lg:w-1/3 p-6 bg-white shadow-lg rounded-lg h-60 sticky top-20">
              <h2 className="text-xl font-bold mb-4 text-gray-800">
                Order Summary
              </h2>
              <p className="text-gray-600">
                Total:{" "}
                <span className="text-lg font-semibold text-green-600">
                  ${totalPrice.toFixed(2)} USD
                </span>
              </p>
              <button
                onClick={() => navigate("/checkout")}
                className="w-full mt-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition duration-200"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        ) : (
          <Empty
            title="Savatingiz hozircha bo‘sh"
            url="https://uzum.uz/static/img/shopocat.490a4a1.png"
          />
        )}
      </div>
    </section>
  );
};

export default Cart;
