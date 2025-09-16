import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import useAxios from "../../Hooks/useAxios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, EffectFade, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import { motion } from "framer-motion";
// import FeaturedProducts from "../../Componets/Body/FeaturedProducts";
import { FaArrowLeft } from "react-icons/fa";
import Swal from "sweetalert2";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import FeaturedProducts from "../FeaturedProducts/FeaturedProducts";

export default function ProductDetails() {
  const { id } = useParams();
  const { user } = useContext(AuthContext);

  const axiosSecure = useAxios();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [alreadyReviewed, setAlreadyReviewed] = useState(false);
  const [reviews, setReviews] = useState([]); // ✅ All reviews
  const [userData, setUserData] =useState([])
  
// load user data
useEffect(()=>{
 axiosSecure.get(`/users/${user?.email}`)
 .then((res)=>{
  console.log(res.data)
  setUserData(res.data)

 })
 .catch((error)=>{
  console.log(error.message)
 })
},[user])
  
// user information

const  reviewerName=userData.name;
const reviewerEmail =userData.email;
const reviewerImage= userData.image;

  // ✅ Load product
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axiosSecure.get(`/products/${id}`);
        setProduct(res.data);
        setLoading(false);
      } catch (err) {
        setError("Product not found");
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  // ✅ Check already reviewed
  useEffect(() => {
    const fetchReviewStatus = async () => {
      if (user?.email) {
        try {
          const res = await axiosSecure.get(`/reviews/check?productId=${id}&email=${user.email}`);
          setAlreadyReviewed(res.data.reviewed);
        } catch (err) {
          console.log(err);
        }
      }
    };
    fetchReviewStatus();
  }, [id, user]);

  // ✅ Load all reviews for the product
  useEffect(() => {
    const loadReviews = async () => {
      try {
        const res = await axiosSecure.get(`/reviews?productId=${id}`);
        setReviews(res.data);
      } catch (err) {
        console.error("Failed to load reviews", err);
      }
    };
    loadReviews();
  }, [id]);

  if (loading) return <p className="text-center py-10 animate-pulse">Loading...</p>;
  if (error) return <p className="text-center text-red-500 py-10">{error}</p>;

  const { name, category, stock, price, photo, brand } = product;
  const email = user?.email;

  const handleAddCart = () => {
    if (user) {
      axiosSecure.post('/carts', { name, category, stock, price, photo, email })
        .then((res) => {
          if (res.data.insertedId) {
            Swal.fire({
              position: "top",
              icon: "success",
              title: `${product.name} added successfully`,
              showConfirmButton: false,
              timer: 1500
            });
          }
        })
        .catch((err) => {
          if (err.response?.status === 409) {
            Swal.fire({
              icon: 'warning',
              title: 'Already in cart',
              text: `${product.name} is already in your cart!`
            });
          } else {
            console.log(err.message);
          }
        });
    } else {
      navigate('/login');
    }
  };

  return (
    <>
      {/* Back Button */}
      <div onClick={() => navigate(-1)} className="container cursor-pointer bg-green-500 w-[120px] rounded-full ml-5 p-2  flex items-center gap-3 mt-10 text-2xl font-bold">
        <h1><FaArrowLeft /></h1>
        <h1>Back</h1>
      </div>

      {/* Product Details */}
      <div className="container mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        {/* Image Carousel */}
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <Swiper
            modules={[Navigation, EffectFade, Autoplay]}
            navigation
            autoplay={{ delay: 3000 }}
            effect="fade"
            spaceBetween={30}
            className="rounded-lg shadow-2xl overflow-hidden"
          >
            {(
              Array.isArray(photo)
                ? photo
                : typeof photo === "string"
                  ? photo.split(",")
                  : photo
                    ? [photo]
                    : []
            ).map((img, i) => (
              <SwiperSlide key={i}>
                <img
                  src={img}
                  alt={`${name} Image`}
                  className="w-full h-[450px] object-contain bg-white"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>

        {/* Product Info */}
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="space-y-5 bg-white p-6 rounded-2xl shadow-xl"
        >
          <h1 className="text-3xl font-extrabold text-gray-800">{name}</h1>
          <p className="text-lg text-gray-600">Brand: {brand}</p>
          <p className="text-yellow-500 text-lg">★★★★☆</p>
          <div onClick={handleAddCart} className="mt-6">
            <motion.button
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.05 }}
              className="bg-blue-600 text-white w-full sm:w-auto px-8 py-3 rounded-xl shadow-lg hover:bg-blue-700 transition"
            >
              Add to Cart
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Customer Reviews */}
      <div className="container mx-auto px-4 py-10">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Customer Reviews</h2>

        <div className="space-y-6">
          {reviews.length > 0 ? (
            reviews.map((review) => (
              <div
                key={review._id}
                className="flex flex-col sm:flex-row items-start gap-4 p-5 border rounded-xl bg-white shadow-md"
              >
                <img
                 src={review?.image}
                  className="w-14 h-14 rounded-full object-cover"
                />
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">{review.name}</h3>
                  <div className="text-yellow-500 text-sm mb-1">
                    {"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}
                  </div>
                  <p className="text-gray-600">{review.comment}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No reviews yet.</p>
          )}
        </div>
      </div>

      {/* Submit Review Form */}
      {user && !alreadyReviewed && (
        <div className="container mx-auto px-4">
          <h2 className="text-xl font-bold mb-3 text-gray-800">Leave a Review</h2>
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              const form = e.target;
              const comment = form.comment.value;
              const rating = parseInt(form.rating.value);
              const productId = product._id;

              try {
                const res = await axiosSecure.post("/reviews", {
                  productId,
                  reviewerName,
                  reviewerEmail,
                  rating,
                  comment,
                  reviewerImage,
                });

                if (res.data.insertedId) {
                  Swal.fire({
                    icon: "success",
                    title: "Thanks for your review!",
                    timer: 1500,
                    showConfirmButton: false,
                  });
                  form.reset();
                  setAlreadyReviewed(true);

                  // ✅ Refresh review list
                  const newReviews = await axiosSecure.get(`/reviews?productId=${id}`);
                  setReviews(newReviews.data);
                }
              } catch (error) {
                console.error(error);
              }
            }}
            className="space-y-4 bg-white p-6 rounded-xl shadow-md"
          >
            <div>
              <label htmlFor="rating" className="block font-medium mb-1">
                Rating
              </label>
              <select
                name="rating"
                required
                className="w-full border rounded px-3 py-2"
              >
                <option value="">Choose...</option>
                {[5, 4, 3, 2, 1].map((r) => (
                  <option key={r} value={r}>
                    {r} Star{r > 1 && "s"}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="comment" className="block font-medium mb-1">
                Comment
              </label>
              <textarea
                name="comment"
                required
                rows="4"
                className="w-full border rounded px-3 py-2"
                placeholder="Write your review here..."
              />
            </div>

            <motion.button
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.05 }}
              type="submit"
              className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
            >
              Submit Review
            </motion.button>
          </form>
        </div>
      )}

      {user && alreadyReviewed && (
        <p className="text-green-600 font-medium text-center">You have already submitted a review for this product.</p>
      )}

      <FeaturedProducts/>
    </>
  );
}