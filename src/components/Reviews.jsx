import React, { useState } from 'react';
import './Reviews.css'; // Import CSS file for styling

function Reviews() {
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(0);
  const [reviews, setReviews] = useState([]);

  const handleReviewTextChange = (event) => {
    setReviewText(event.target.value);
  };

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (reviewText && rating) {
      const newReview = {
        text: reviewText,
        rating: rating,
        username: 'collo', // Replace with actual username from authentication
      };
      setReviews([...reviews, newReview]);
      setReviewText('');
      setRating(0);
    }
  };

  return (
    <div className="reviews-container">
      <h2>Reviews</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="reviewText">Review:</label>
          <textarea
            id="reviewText"
            value={reviewText}
            onChange={handleReviewTextChange}
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
        <h3>All Reviews</h3>
        {reviews.length > 0 ? (
          reviews.map((review, index) => (
            <div key={index} className="review-item">
              <div className="review-header">
                <span className="reviewer-name">{review.username}</span>
                <span className="review-date">{/* Include date here */}</span>
              </div>
              <p className="review-body">{review.text}</p>
              <p>Rating: {review.rating}</p>
              {/* Add delete button here if needed */}
            </div>
          ))
        ) : (
          <p>No reviews yet</p>
        )}
      </div>
    </div>
  );
}

export default Reviews;
