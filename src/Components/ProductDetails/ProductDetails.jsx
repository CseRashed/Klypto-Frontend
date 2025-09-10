import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, EffectFade, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import { motion } from "framer-motion";
import { FaArrowLeft } from "react-icons/fa";
import FeaturedProducts from "../FeaturedProducts/FeaturedProducts";

export default function ProductDetails() {
  // Static product data
  const product = {
    name: "Wireless Headphones",
    brand: "Sony",
    rating: 4,
    photos: [
      "https://via.placeholder.com/450",
      "https://via.placeholder.com/450/0000FF",
      "https://via.placeholder.com/450/FF0000",
    ],
    reviews: [
      {
        _id: 1,
        name: "John Doe",
        rating: 5,
        comment: "Amazing product! Highly recommend.",
        image: "https://i.pravatar.cc/100?img=1",
      },
      {
        _id: 2,
        name: "Jane Smith",
        rating: 4,
        comment: "Good quality, worth the price.",
        image: "https://i.pravatar.cc/100?img=2",
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back Button */}
     <div className="px-3 sm:px-4 mt-6 sm:mt-10 flex items-center gap-2 sm:gap-3 cursor-pointer w-max rounded-full bg-green-500 text-white py-1.5 sm:py-2 shadow-lg hover:bg-green-600 transition">
  <FaArrowLeft className="text-base sm:text-lg" />
  <span className="font-semibold text-sm sm:text-lg">Back</span>
</div>


      {/* Product Details */}
      <div className="container mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
        {/* Image Carousel */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <Swiper
            modules={[Navigation, EffectFade, Autoplay]}
            navigation
            autoplay={{ delay: 3000 }}
            effect="fade"
            spaceBetween={20}
            className="rounded-2xl shadow-2xl overflow-hidden"
          >
            {product.photos.map((img, i) => (
              <SwiperSlide key={i}>
                <img
                  src={img}
                  alt={`${product.name} Image`}
                  className="w-full h-[400px] sm:h-[450px] md:h-[500px] object-contain bg-white rounded-2xl"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>

        {/* Product Info */}
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="space-y-6 bg-white p-6 sm:p-8 rounded-2xl shadow-xl"
        >
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-800">
            {product.name}
          </h1>
          <p className="text-md sm:text-lg text-gray-600 font-medium">
            Brand: {product.brand}
          </p>
          <div className="text-yellow-500 text-lg">
            {"★".repeat(product.rating)}{"☆".repeat(5 - product.rating)}
          </div>
          <motion.button
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.05 }}
            className="mt-4 sm:mt-6 bg-blue-900 text-white w-full sm:w-auto px-6 py-3 rounded-xl shadow-lg hover:bg-blue-700 transition"
          >
            Add to Cart
          </motion.button>
        </motion.div>
      </div>

      {/* Customer Reviews */}
      <div className="container mx-auto px-4 py-10">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800">
          Customer Reviews
        </h2>

        <div className="space-y-6">
          {product.reviews.map((review) => (
            <div
              key={review._id}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-5 border rounded-2xl bg-white shadow-md transition hover:shadow-lg"
            >
              <img
                src={review.image}
                alt={review.name}
                className="w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover border-2 border-blue-500"
              />
              <div className="flex-1">
                <h3 className="text-md sm:text-lg font-semibold text-gray-800">
                  {review.name}
                </h3>
                <div className="text-yellow-500 text-sm mb-1">
                  {"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}
                </div>
                <p className="text-gray-600 text-sm sm:text-md">{review.comment}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Featured Products */}
      <FeaturedProducts />
    </div>
  );
}
