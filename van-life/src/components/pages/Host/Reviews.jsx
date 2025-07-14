import React from "react";
import "../styles/Reviews.css";
import { BsStarFill } from "react-icons/bs";
import { getReviews } from "../../../apiFirebase";
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
  const [reviews, setReviews] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    async function loadReviews() {
      try {
        const data = await getReviews();
        setReviews(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    }
    loadReviews();
  }, []);

  const sortedReviews = [...reviews].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  const ratingSummary = [1, 2, 3, 4, 5].map((r) => ({
    rating: r,
    count: sortedReviews.filter((review) => review.rating === r).length,
  }));

  if (error)
    return (
      <h2 style={{ color: "red" }} aria-live="assertive">
        Ups!Error loading the reviews... {error.message}
      </h2>
    );

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

      <h3>Reviews({sortedReviews.length})</h3>
      {sortedReviews.map((review) => (
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
