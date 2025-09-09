import React from 'react'
import offerBanner from './../../assets/offer-banner.jpg'
export default function OfferBanner() {
  return (
    <div className="relative container mx-auto w-full ">
  {/* Full-width Image */}
  <img
    src={offerBanner}
    alt="Offer Banner"
    className="w-full rounded-xs md:rounded-md lg:rounded-xl h-auto object-cover"
  />

  {/* Text Overlay */}
  <div className="absolute -top-1.5 inset-0 flex sm:flex-col md:flex-row items-center justify-center  px-4 py-6 text-center space-y-2 md:space-y-0 md:space-x-6">
    <p className="text-white text-xl md:text-5xl font-extrabold tracking-wide">
      Watch
    </p>
    <p className="text-white text-xs md:text-xl font-medium  max-w-xl">
      M6 Smart Band 2.3 – Fitness Band <br />
      Men’s and Women’s Health Tracking, Red Strap
    </p>
  </div>
</div>



  )
}