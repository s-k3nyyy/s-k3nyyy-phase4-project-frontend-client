import React, { useState, useEffect } from 'react';
import './Reviews.css'; // Import CSS file for styling

function Reviews() {
    const [reviewText, setReviewText] = useState('');
    const [rating, setRating] = useState(0);
    const [reviews, setReviews] = useState([]);
    const [darkMode, setDarkMode] = useState(() => {
        const savedMode = localStorage.getItem('darkMode');
        return savedMode ? JSON.parse(savedMode) : false;
    });

    useEffect(() => {
        // Placeholder reviews for an event management and ticketing website
        const placeholderReviews = [
            { text: "Amazing event! Had a great time.", rating: 5, username: 'anonymous', date: '2024-07-01' },
            { text: "Well organized and fun!", rating: 4, username: 'anonymous', date: '2024-07-02' },
            { text: "Loved it! Will attend again.", rating: 5, username: 'anonymous', date: '2024-07-03' },
            { text: "Great experience, highly recommended.", rating: 4, username: 'anonymous', date: '2024-07-04' },
            { text: "Top-notch event management.", rating: 5, username: 'anonymus', date: '2024-07-05' },
            { text: "A memorable event with excellent arrangements.", rating: 4, username: 'dudley', date: '2024-07-06' },
            { text: "Fantastic! Everything was perfect.", rating: 5, username: 'anonymous', date: '2024-07-07' },
            { text: "Had a wonderful time, thanks!", rating: 4, username: 'anonymous', date: '2024-07-08' },
            { text: "Superb event, well done!", rating: 5, username: 'anonymous', date: '2024-07-09' },
            { text: "Enjoyed every moment of it.", rating: 4, username: 'anonymous', date: '2024-07-10' }
        ];

        setReviews(placeholderReviews);
    }, []);

    useEffect(() => {
        if (darkMode) {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }
        localStorage.setItem('darkMode', JSON.stringify(darkMode));
    }, [darkMode]);

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
                username: 'you are anonymous', // Replace with actual username from authentication
                date: new Date().toISOString().split('T')[0]
            };
            setReviews([...reviews, newReview]);
            setReviewText('');
            setRating(0);
        }
    };

    return (
        <div className={`reviews-container ${darkMode ? 'dark-mode' : ''}`}>
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
                                <span className="review-date">{review.date}</span>
                            </div>
                            <p className="review-body">{review.text}</p>
                            <p>Rating: {review.rating}</p>
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
