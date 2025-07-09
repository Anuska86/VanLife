import React from "react";
import "../styles/Reviews.css";
import { BsStarFill } from "react-icons/bs";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function Reviews() {
  const reviewsData = [
    {
      rating: 5,
      name: "Elliot",
      date: "January 3, 2025",
      text: "The beach bum is such an awesome van! Such a comfortable trip. We had it for 2 weeks and there was not a single issue. Super clean when we picked it up and the host is very comfortable and understanding. Highly recommend!",
      id: "1",
    },
    {
      rating: 5,
      name: "Sandy",
      date: "December 12, 2024",
      text: "This is our third time using the Modest Explorer for our travels and we love it! No complaints, absolutely perfect!",
      id: "2",
    },
    {
      rating: 4,
      name: "Miguel",
      date: "October 8, 2024",
      text: "We had a great time with the van. One small issue with the fridge, but overall really enjoyed the experience.",
      id: "3",
    },
    {
      rating: 5,
      name: "Zoë",
      date: "August 21, 2024",
      text: "Such a stylish and reliable ride. Drove through the Pyrenees and it didn’t flinch. Can’t wait for the next trip!",
      id: "4",
    },
    {
      rating: 3,
      name: "Leo",
      date: "June 15, 2024",
      text: "The van worked fine, but it wasn't quite what we expected based on the listing photos. Would rent again if updated.",
      id: "5",
    },
    {
      rating: 5,
      name: "Anna",
      date: "April 9, 2024",
      text: "What an amazing getaway vehicle! Everything was spotless and ran like a dream. Highly recommend the host.",
      id: "6",
    },
    {
      rating: 4,
      name: "Max",
      date: "December 18, 2023",
      text: "Solid van, good condition. The pickup was smooth, and the host was flexible with our return time.",
      id: "7",
    },
    {
      rating: 5,
      name: "Jules",
      date: "September 2, 2023",
      text: "Took this van along the coast and felt like a surfer god. Great vibes. Totally booking again!",
      id: "8",
    },
  ];

  const ratingSummary = [1, 2, 3, 4, 5].map((r) => ({
    rating: r,
    count: reviewsData.filter((review) => review.rating === r).length,
  }));

  return (
    <section className="host-reviews">
      <div className="top-text">
        <h2>Your reviews</h2>
        <p>
          Last <span>30 days</span>
        </p>
      </div>
      <div className="reviews-graph">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={ratingSummary}>
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="rating" tickFormatter={(value) => `${value}⭐`} />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="count" fill="#ff8c38" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <h3>Reviews({reviewsData.length})</h3>
      {reviewsData.map((review) => (
        <div key={review.id}>
          <div className="review">
            {[...Array(review.rating)].map((_, i) => (
              <BsStarFill className="review-star" key={i} />
            ))}
            <div className="info">
              <p className="name">{review.name}</p>
              <p className="date">{review.date}</p>
            </div>
            <p>{review.text}</p>
          </div>
          <hr />
        </div>
      ))}
    </section>
  );
}
