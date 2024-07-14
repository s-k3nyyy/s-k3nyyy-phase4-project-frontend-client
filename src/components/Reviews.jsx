import React, { useState, useEffect } from "react";
import "./Reviews.css";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState("");
  const [newRating, setNewRating] = useState(0);
  const [editReviewId, setEditReviewId] = useState(null);
  const [editReviewText, setEditReviewText] = useState("");
  const [editReviewRating, setEditReviewRating] = useState(0);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5555/reviews");
      if (!response.ok) {
        throw new Error("Failed to fetch reviews");
      }
      const data = await response.json();
      setReviews(data);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  const addReview = async () => {
    try {
      if (!newReview.trim()) {
        console.error("Review text cannot be empty");
        return;
      }

      const response = await fetch("http://127.0.0.1:5555/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: newReview,
          rating: newRating,
          user_id: 1,
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to add review");
      }
      const data = await response.json();
      setReviews([...reviews, data]);
      setNewReview("");
      setNewRating(0);
    } catch (error) {
      console.error("Error adding review:", error);
    }
  };

  const updateReview = async (id) => {
    try {
      if (!editReviewText.trim()) {
        console.error("Review text cannot be empty");
        return;
      }

      const response = await fetch(`http://127.0.0.1:5555/reviews/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: editReviewText,
          rating: editReviewRating,
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to update review");
      }
      const data = await response.json();
      setReviews(reviews.map((review) => (review.id === id ? data : review)));
      setEditReviewId(null);
      setEditReviewText("");
      setEditReviewRating(0);
    } catch (error) {
      console.error("Error updating review:", error);
    }
  };

  const deleteReview = async (id) => {
    try {
      const response = await fetch(`http://127.0.0.1:5555/reviews/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete review");
      }
      setReviews(reviews.filter((review) => review.id !== id));
    } catch (error) {
      console.error("Error deleting review:", error);
    }
  };

  return (
    <div>
      <h3 style={{ color: "yellow" }}>Reviews</h3>
      <div className="div-element">
        <label
          htmlFor="review"
          style={{ color: "white", fontSize: "16px", margin: "10px" }}
        >
          Review:
        </label>
        <input
          type="text"
          value={newReview}
          onChange={(e) => setNewReview(e.target.value)}
          placeholder="Write a review"
        />{" "}
        <br />
        <label
          htmlFor="Rating"
          style={{ color: "black", fontSize: "16px", margin: "15px" }}
        >
          Rating:
        </label>
        <input
          type="number"
          min="0"
          max="5"
          value={newRating}
          onChange={(e) => setNewRating(parseInt(e.target.value))}
          placeholder="Rating (0-5)"
        />{" "}
        <br />
        <button onClick={addReview} className="review-btn">
          Add Review
        </button>
      </div>
      <ul>
        {reviews.map((review) => (
          <li className="list-review" key={review.id}>
            {editReviewId === review.id ? (
              <>
                <input
                  type="text"
                  value={editReviewText}
                  onChange={(e) => setEditReviewText(e.target.value)}
                />{" "}
                <br />
                <input
                  type="number"
                  min="0"
                  max="5"
                  value={editReviewRating}
                  onChange={(e) =>
                    setEditReviewRating(parseInt(e.target.value))
                  }
                  placeholder="Rating (0-5)"
                />{" "}
                <br />
                <button onClick={() => updateReview(review.id)}>Save</button>
                <button onClick={() => setEditReviewId(null)}>Cancel</button>
              </>
            ) : (
              <>
                <span>Review: {review.text}</span> <br />
                <span>Rating: {review.rating}</span>
                <button
                  className="review-edit-btn"
                  onClick={() => {
                    setEditReviewId(review.id);
                    setEditReviewText(review.text);
                    setEditReviewRating(review.rating);
                  }}
                >
                  Edit
                </button>
                <button
                  className="delete-review-btn"
                  onClick={() => deleteReview(review.id)}
                >
                  Delete
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Reviews;
