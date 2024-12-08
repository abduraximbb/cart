// import axios from "../../api";
// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { FaRegHeart, FaHeart } from "react-icons/fa";
// import { IoCartOutline } from "react-icons/io5";

// import { useStateValue } from "../../context";

// const Detail = () => {
//   const { id } = useParams();
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [imgIndex, setImgIndex] = useState(0);

//   const { setWishlist, wishlist, cart, setCart } = useStateValue();

//   const handleLike = (product) => {
//     const index = wishlist.findIndex((item) => item.id === product.id);
//     if (index < 0) {
//       setWishlist((prev) => [...prev, product]);
//     } else {
//       setWishlist((prev) => prev.filter((item) => item.id !== product.id));
//     }
//   };

//   const handleAddToCart = (product) => {
//     const index = cart.findIndex((item) => item.id === product.id);
//     if (index < 0) {
//       setCart((prev) => [...prev, { ...product, amount: 1 }]);
//     }
//   };

//   useEffect(() => {
//     setLoading(true);
//     axios
//       .get(`/product/${id}`)
//       .then((res) => setData(res.data))
//       .catch((err) => setError(err))
//       .finally(() => setLoading(false));
//   }, []);

//   if (loading) {
//     return (
//       <div className="text-center py-24">
//         <p>loading.....</p>
//       </div>
//     );
//   }
//   if (error) {
//     return (
//       <div className="text-center py-24">
//         <p>{error?.message}</p>
//       </div>
//     );
//   }

//   return (
//     <div className="container py-5 grid grid-cols-2">
//       <div>
//         <div>
//           <img src={data?.images[imgIndex]} alt="" />
//         </div>
//         <div className="flex gap-2">
//           {data?.images?.map((url, inx) => (
//             <img
//               onClick={() => setImgIndex(inx)}
//               className={`w-20 ${imgIndex == inx && "opacity-60"}`}
//               src={url}
//               key={inx}
//             />
//           ))}
//         </div>
//       </div>
//       <div>
//         <h2 className="text-3xl">{data?.title}</h2>
//         <p>{data?.description}</p>
//         <button
//           onClick={() => handleLike(data)}
//           className="top-3 right-3 text-xl"
//         >
//           {wishlist?.some((item) => item?.id === data?.id) ? (
//             <FaHeart />
//           ) : (
//             <FaRegHeart />
//           )}
//         </button>
//         <button
//           onClick={() => handleAddToCart(data)}
//           className="top-10 right-3 text-xl"
//         >
//           <IoCartOutline />
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Detail;

import axios from "../../api";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";

import { useStateValue } from "../../context";

const Detail = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [imgIndex, setImgIndex] = useState(0);

  const { setWishlist, wishlist, cart, setCart } = useStateValue();

  const handleLike = (product) => {
    const index = wishlist.findIndex((item) => item.id === product.id);
    if (index < 0) {
      setWishlist((prev) => [...prev, product]);
    } else {
      setWishlist((prev) => prev.filter((item) => item.id !== product.id));
    }
  };

  const handleAddToCart = (product) => {
    const index = cart.findIndex((item) => item.id === product.id);
    if (index < 0) {
      setCart((prev) => [...prev, { ...product, amount: 1 }]);
    }
  };

  useEffect(() => {
    setLoading(true);
    axios
      .get(`/product/${id}`)
      .then((res) => setData(res.data))
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="text-center py-24">
        <p>Loading...</p>
      </div>
    );
  }
  if (error) {
    return (
      <div className="text-center py-24">
        <p>{error?.message}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-5 px-4 grid md:grid-cols-2 gap-8">
      <div>
        {/* Main Image */}
        <div className="border mb-4">
          <img
            src={data?.images[imgIndex]}
            alt={data?.title}
            className="w-full h-auto"
          />
        </div>
        {/* Thumbnail Images */}
        <div className="flex gap-2">
          {data?.images?.map((url, inx) => (
            <img
              onClick={() => setImgIndex(inx)}
              className={`w-20 h-20 object-cover cursor-pointer border ${
                imgIndex === inx
                  ? "opacity-60 border-gray-400"
                  : "border-gray-200"
              }`}
              src={url}
              key={inx}
            />
          ))}
        </div>
      </div>
      <div>
        <h2 className="text-3xl font-bold mb-4">{data?.title}</h2>
        <p className="text-gray-600 mb-6">{data?.description}</p>
        <div className="flex items-center mb-6">
          <span className="text-2xl text-green-600 font-bold">
            ${data?.price}
          </span>
          <span className="text-gray-400 text-sm ml-2">(Free Shipping)</span>
        </div>
        <button
          onClick={() => handleLike(data)}
          className="text-xl text-red-500 hover:text-red-600 mr-4"
        >
          {wishlist?.some((item) => item?.id === data?.id) ? (
            <FaHeart />
          ) : (
            <FaRegHeart />
          )}
        </button>
        <button
          onClick={() => handleAddToCart(data)}
          className="bg-green-600 text-white py-2 px-6 rounded hover:bg-green-700 flex items-center"
        >
          <IoCartOutline className="mr-2" /> Add to Cart
        </button>
        <div className="mt-8 text-sm text-gray-500">
          <p>
            <strong>Wax:</strong> Top-grade soy wax for a consistent burn.
          </p>
          <p>
            <strong>Fragrance:</strong> Premium essential oils for a natural
            scent.
          </p>
          <p>
            <strong>Burning Time:</strong> 70-75 hours
          </p>
          <p>
            <strong>Dimensions:</strong> 10cm x 5cm
          </p>
          <p>
            <strong>Weight:</strong> 400g
          </p>
        </div>
      </div>
    </div>
  );
};

export default Detail;
