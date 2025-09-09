import React from 'react'
import Banner from '../../Layout/Header/Banner'
import BannerCategory from '../../Layout/Header/BannerCategory'
import Shipping from '../../Components/Shipping/Shipping'
import PopularProducts from '../../Components/PopularProducts/PopularProducts'
import OfferBanner from '../../Components/OfferBanner/OfferBanner'
import LatestProducts from '../../Components/LatestProducts/LatestProducts'
import Discount from '../../Components/Discount/Discount'
import FeaturedProducts from '../../Components/FeaturedProducts/FeaturedProducts'

export default function Home() {
  return (
   <>
   <Banner></Banner>
    <BannerCategory></BannerCategory>
    <Shipping></Shipping>
    <PopularProducts></PopularProducts>
    <OfferBanner></OfferBanner>
    <LatestProducts></LatestProducts>
    <Discount></Discount>
    <FeaturedProducts></FeaturedProducts>
   </>
  )
}
