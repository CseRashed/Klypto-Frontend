import React, { useRef, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import useProducts from "../../Hooks/useProducts";

export default function LatestProducts() {
  const sliderRef = useRef(null);
  const navigate = useNavigate();
  const [category] = useState("Latest");

  // Fetch all products using custom hook with React Query
  const { products: allProducts, isLoading, isError, error } = useProducts();

  // Filter products marked as Latest
  const products = allProducts.filter((p) => p.position === category);

  // Scroll functionality for carousel
  const scroll = (dir) => {
    const slider = sliderRef.current;
    if (slider) {
      const scrollAmount = window.innerWidth < 768 ? 240 : 300;
      slider.scrollBy({
        left: dir === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };



  return (
    <div className="container mx-auto mt-7 lg:mt-16 md:mt-10">
      <h3 className="text-2xl font-medium mb-4">Latest Products</h3>

      <div className="relative">
        {/* Left Arrow */}
        <button
          onClick={() => scroll("left")}
          className="absolute left-1 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md p-2 md:p-3 rounded-full hover:bg-gray-200"
        >
          <FaArrowLeft size={window.innerWidth < 768 ? 14 : 18} />
        </button>

        {/* Right Arrow */}
        <button
          onClick={() => scroll("right")}
          className="absolute right-1 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md p-2 md:p-3 rounded-full hover:bg-gray-200"
        >
          <FaArrowRight size={window.innerWidth < 768 ? 14 : 18} />
        </button>

        {/* Product Slider */}
        <div
          ref={sliderRef}
          className="flex space-x-4 overflow-x-auto scrollbar-hide px-6 snap-x scroll-smooth"
        >
          {isLoading && (
            <p className="text-gray-500">Loading products...</p>
          )}
          {isError && (
            <p className="text-red-500">Error: {error?.message || "Failed to load products."}</p>
          )}
          {!isLoading &&
            !isError &&
            products.length === 0 && (
              <p className="text-gray-400">No products found.</p>
            )}
          {!isLoading &&
            !isError &&
            products.map((product) => (
              <div
                key={product._id}
                className="snap-start flex-shrink-0 w-52 sm:w-56 md:w-60 lg:w-64"
              >
                <Link
                  to={`/products/${product._id}`} 
                  className="card bg-white shadow-md rounded-lg cursor-pointer hover:shadow-xl transition"
                >
                  <figure className="bg-gray-100 h-28 flex items-center justify-center">
                    {product.photo ? (
                      <img
                        src={product.photo}
                        alt={product.name}
                        className="w-[100px]"
                      />
                    ) : (
                      <span className="text-gray-400 text-sm">Image</span>
                    )}
                  </figure>
                  <div className="card-body p-4 space-y-1">
                    <h2 className="card-title text-base">{product.name}</h2>
                    <p className="text-sm text-gray-500">{product.brand}</p>
                    <p className="text-yellow-500 text-sm">★★★★☆</p>
                    <p className="text-green-600 font-bold">${product.price}</p>
                  </div>
                </Link>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
