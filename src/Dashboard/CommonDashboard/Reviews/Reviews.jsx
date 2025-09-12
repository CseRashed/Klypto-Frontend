import React, { useState } from "react";
import { FaStar } from "react-icons/fa";

// Sample static review data
const reviewsData = [
  {
    id: 1,
    name: "John Doe",
    rating: 5,
    comment: "Amazing product! Highly recommend.",
    image: "https://i.pravatar.cc/100?img=1",
  },
  {
    id: 2,
    name: "Jane Smith",
    rating: 4,
    comment: "Good quality and fast delivery.",
    image: "https://i.pravatar.cc/100?img=2",
  },
  {
    id: 3,
    name: "Alice Johnson",
    rating: 3,
    comment: "Product was okay, could be better.",
    image: "https://i.pravatar.cc/100?img=3",
  },
  {
    id: 4,
    name: "Bob Williams",
    rating: 5,
    comment: "Excellent service and product quality!",
    image: "https://i.pravatar.cc/100?img=4",
  },
];

export default function Reviews() {
  const [reviews, setReviews] = useState(reviewsData);

  return (
    <div className="p-6 bg-gray-50 min-h-screen space-y-8">
      {/* Header */}
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Customer Reviews</h2>
        <p className="text-gray-500 mt-1">See what our customers are saying about us.</p>
      </div>

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-shadow p-5 flex flex-col gap-4"
          >
            <div className="flex items-center gap-4">
              <img
                src={review.image}
                alt={review.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <h3 className="text-lg font-semibold text-gray-800">{review.name}</h3>
                <div className="flex items-center gap-1 text-yellow-500 mt-1">
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      className={i < review.rating ? "text-yellow-400" : "text-gray-300"}
                    />
                  ))}
                </div>
              </div>
            </div>
            <p className="text-gray-600 mt-2">{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
