import React from 'react';
import '../css/Comment.css';
import image from "../assets/default-pic.png";

const Comment = ({ userprofileimage, username, userrole, rating, relativeTime, reviewText }) => {
    const stars = Array(5).fill(0).map((_, index) => (
        /*<i class="fa-solid fa-star star-color" key={index} color={index < rating ? "#FFAA00" : "#d3d3d3"}></i>*/
        <i 
            className={`fa-solid fa-star ${index < rating ? "star-color" : "star-grey"}`} 
            key={index}
        ></i>
    ));
    const api= import.meta.env.VITE_API_URL;

    return (
        <div className="review-comment">
            <div className="comment-user-info">
                {userprofileimage?<img src={`${api}${userprofileimage}`} alt="Profile" className="comment-profile-pic" />:<img className="comment-profile-pic" src={image}/>}
                <div className="username-role">
                    <h4>{username}</h4>
                    <span className="user-role">{userrole}</span>
                </div>
            </div>
            <div className="comment-rating">
                {stars} <span className="comment-rating-value">({rating})</span>
            </div>
            <div className="chapter-time">
                <span className="time-ago">{relativeTime}</span>
            </div>
            <div className="review-text">
                {reviewText.split('\n').map((para)=>{return(<><p>{para}</p><br/></>)})}
            </div>
        </div>
    );
};

export default Comment;
