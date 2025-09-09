import React from 'react';
import discount_1 from './../../assets/discount-1.jpg';
import discount_2 from './../../assets/discount-2.jpg';

export default function Discount() {
  return (
    <div className="container mx-auto px-4 mt-7 md:mt-10 lg:mt-16  grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Card 1 */}
      <div className="relative w-full rounded-lg overflow-hidden">
        <img
          src={discount_1}
          alt="Discount Banner"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 px-4 sm:px-6 pt-6 sm:pt-10 md:pt-14 text-left bg-gradient-to-b from-black/50 via-black/30 to-transparent text-white">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2">
            Save Up To 20% Off
          </h1>
          <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-4">
            Santa Lucias Three <br className="hidden sm:block" /> Seater Sofa
          </h2>
          <button className="bg-blue-900 hover:bg-blue-500 text-white font-semibold px-4 py-2 rounded-md  transition">
            Shop Now
          </button>
        </div>
      </div>

      {/* Card 2 */}
      <div className="relative w-full rounded-lg overflow-hidden">
        <img
          src={discount_2}
          alt="Discount Banner"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 px-4 sm:px-6 pt-6 sm:pt-10 md:pt-14 text-left bg-gradient-to-b from-black/50 via-black/30 to-transparent text-white">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2">
            Save Up To 20% Off
          </h1>
          <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-4">
            Santa Lucias Three <br className="hidden sm:block" /> Seater Sofa
          </h2>
          <button className="bg-blue-900 hover:bg-blue-500 text-white font-semibold px-4 py-2 rounded-md  transition">
            Shop Now
          </button>
        </div>
      </div>
    </div>
  );
}