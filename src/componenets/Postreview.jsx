import React, { useState, useContext, useEffect } from 'react';
import '../css/Postreview.css';
import axios from 'axios';
import { profilecontext } from './context';

const Postreview = ({ _id, closeFunction }) => {
  const [prevpost, setPrevpost] = useState([]);
  const { authstatus } = useContext(profilecontext);
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(0);
  const api= import.meta.env.VITE_API_URL;

  const handleStarClick = (value) => {
    setRating(value);
  };

  const handleReviewChange = (e) => {
    setReviewText(e.target.value);
  };

  async function fetchPrevPost() {
    if (authstatus.authenticated) {
      try {
        const response = await axios.get(`${api}/pastreviews/${_id}/${authstatus.user._id}`);
        setPrevpost(response.data);
      } catch (error) {
        console.error("Error fetching previous post of user:", error);
      }
    }
  }

  useEffect(() => {
    fetchPrevPost();
  }, []);

  useEffect(() => {
    if (prevpost.length !== 0) {
      setRating(prevpost[0].rating);
      setReviewText(prevpost[0].reviewText);
    }
  }, [prevpost]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${api}/postreview`, {
        useremail: authstatus.user.email,
        userid: authstatus.user._id,
        reviewText,
        rating,
        novelid: _id
      });
      if (response.status === 200) {
        console.log('Review Submitted:', reviewText);
        console.log('Rating:', rating);
        closeFunction();
      } else {
        console.error("Error submitting or editing the review:", response.data);
      }
    } catch (error) {
      console.error("Error submitting or editing the review:", error);
    }
  };

  return (
    <div className="review-container">
      <h2>Write a review</h2>
      <div className="review-score">
        {[1, 2, 3, 4, 5].map((value) => (
          <span
            key={value}
            className={`review-star ${rating >= value ? 'selected' : ''}`}
            onClick={() => handleStarClick(value)}
          >
            &#9733;
          </span>
        ))}
      </div>
      <form className="review-form" onSubmit={handleSubmit}>
        <textarea
          value={reviewText}
          onChange={handleReviewChange}
          placeholder="Write your review here"
          rows="4"
        />
        <div className="char-count">{`${reviewText.length} / 140`}</div>
        <button type="submit">{prevpost.length === 0 ? 'Post Review' : 'Edit Review'}</button>
      </form>
    </div>
  );
};

export default Postreview;

