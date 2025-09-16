import React, { useState, useRef } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import useProducts from "../../Hooks/useProducts";

export default function PopularProducts() {
  const [category, setCategory] = useState("Mobile");
  const sliderRef = useRef(null);
  const navigate = useNavigate();

  // Fetch products using custom hook with React Query
  const { products: allProducts, isLoading, isError, refetch } = useProducts();

  // Filter products by selected category
  const products = allProducts.filter((p) => p.category === category);

  // Scroll functionality for carousel
  const scroll = (dir) => {
    const slider = sliderRef.current;
    if (slider) {
      const scrollAmount = window.innerWidth < 768 ? 240 : 300;
      slider.scrollLeft += dir === "left" ? -scrollAmount : scrollAmount;
    }
  };

  return (
    <div className="px-2 py-10 container mx-auto overflow-hidden">
      <h1 className="text-2xl font-medium mb-5">Popular Products</h1>

      {/* Category Tabs */}
      <div className="flex justify-start gap-4 mb-6">
        {["Mobile", "Electronic", "Furniture"].map((tab) => (
          <button
            key={tab}
            className={`text-lg font-semibold transition ${
              category === tab
                ? "text-red-600 border-b-2 border-red-600"
                : "text-blue-900 hover:text-blue-500"
            }`}
            onClick={() => setCategory(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Carousel */}
      <div className="relative">
        {/* Left Arrow */}
        <button
          onClick={() => scroll("left")}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md p-2 md:p-3 rounded-full hover:bg-gray-200"
        >
          <FaArrowLeft />
        </button>

        {/* Right Arrow */}
        <button
          onClick={() => scroll("right")}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md p-2 md:p-3 rounded-full hover:bg-gray-200"
        >
          <FaArrowRight />
        </button>

        {/* Product List */}
        <div
          ref={sliderRef}
          className="flex overflow-x-auto space-x-4 px-6 scroll-smooth no-scrollbar"
        >
          {isLoading && (
            <p className="text-gray-500">Loading products...</p>
          )}
          {isError && (
            <p className="text-red-500">Failed to load products.</p>
          )}
          {!isLoading &&
            !isError &&
            products.length === 0 && (
              <p className="text-gray-400 text-sm">No products found.</p>
            )}
          {!isLoading &&
            !isError &&
            products.map((product) => (
              <div
                key={product._id}
                className="flex-shrink-0 w-48 sm:w-56 md:w-60 lg:w-64 snap-start"
              >
                <Link
                  to={`/products/${product._id}`} 
                  className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-xl transition"
                >
                  <div className="bg-gray-100 h-28 flex items-center justify-center">
                    <img
                      className="w-[100px]"
                      src={product.photo}
                      alt={`${product.name} image`}
                    />
                  </div>
                  <div className="p-4 space-y-1">
                    <h2 className="text-base font-semibold">{product.name}</h2>
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
