import React from 'react'
import ProductReviews from './ProductReviews'
const ReviewsSection = () => {
  return (
    <div className='w-[80%] m-auto px-10 py-7 bg-gray-50 rounded-lg shadow-sm shadow-black flex flex-col items-center justify-center gap-10'>
        <ProductReviews/>
        <ProductReviews/>
        <ProductReviews/>
        <ProductReviews/>
        <ProductReviews/>
    </div>
  )
}

export default ReviewsSection