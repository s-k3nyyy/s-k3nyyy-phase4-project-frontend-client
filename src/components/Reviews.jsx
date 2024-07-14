import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Reviews.css";

function Reviews() {
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(0);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:5555/reviews");
      setReviews(response.data);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  const handleReviewTextChange = (event) => {
    setReviewText(event.target.value);
  };

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (reviewText && rating) {
      try {
        const response = await axios.post("http://127.0.0.1:5555/reviews", {
          text: reviewText,
          rating: rating,
          user_id: 1,
        });
        setReviews([...reviews, response.data]);
        setReviewText("");
        setRating(0);
      } catch (error) {
        console.error("Error adding review:", error);
      }
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:5555/reviews/${id}`);
      const filteredReviews = reviews.filter((review) => review.id !== id);
      setReviews(filteredReviews);
    } catch (error) {
      console.error("Error deleting review:", error);
    }
  };

  return (
    <div className="reviews-container">
      <h2>Reviews</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="reviewText"></label>
          <textarea
            id="reviewText"
            value={reviewText}
            onChange={handleReviewTextChange}
            placeholder="Enter some review"
            required
          ></textarea>
        </div>
        <div>
          <label>Rating:</label>
          <div className="star-rating">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className={star <= rating ? "star selected" : "star"}
                onClick={() => handleRatingChange(star)}
              >
                ★
              </span>
            ))}
          </div>
        </div>
        <button type="submit">Submit Review</button>
      </form>
      <div>
        {reviews.length > 0 ? (
          reviews.map((review, index) => (
            <div key={index} className="review-item">
              <div className="review-header">
                <span className="reviewer-name">{review.username}</span>
                <span className="review-date">{review.date}</span>
              </div>
              <p className="review-body">{review.text}</p>
              <p>Rating: {review.rating}</p>
              <div>
                <button onClick={() => handleDelete(review.id)}>Delete</button>
              </div>
            </div>
          ))
        ) : (
          <p style={{ color: "gold", textAlign: "center" }}>No reviews yet</p>
        )}
      </div>
    </div>
  );
}

export default Reviews;
