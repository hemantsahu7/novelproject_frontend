import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import React from 'react';
import '../css/Novelpage.css';
import Novelheader from './Novelheader';
import Summary from './summary.jsx';
import Header from './Header.jsx';
import Chaptertable from './Chaptertable.jsx';
import axios from "axios";
import Footercomponent from './Footercomponent.jsx';
import Postreview from './Postreview.jsx';
import Comment from "./comment.jsx";
import image from "../assets/default-pic.png";
import { profilecontext } from './context.jsx';

const Novelpage = () => {
  const { authstatus } = useContext(profilecontext);
  const { _id } = useParams(); // Get the novel ID from the URL
  
  const [currnovel, setcurrnovel] = useState(null); // State to store the novel details
  const [loading, setLoading] = useState(true); // State to handle loading
  const [showPostReview, setShowPostReview] = useState(false); // State to toggle PostReview component
  const [reviews, setReviews] = useState([]);
  const api= import.meta.env.VITE_API_URL;

  function closeFunction() {
    setShowPostReview(false);
  }

  async function fetchComments() {
    try {
      const response = await axios.get(`${api}/allreviews/${_id}`);
      setReviews(response.data);
      console.log("This is all review =", response.data);
    } catch (error) {
      console.log("Error fetching the comments");
    }
  }

  async function fetchNovelDetails() {
    try {
      console.log(`${_id}`);
      const apilink = `${api}/novel/${_id}`;
      console.log(apilink);
      const response = await axios.get(apilink);
      setcurrnovel(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching novel details:', error);
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchComments();
  }, [showPostReview]);

  useEffect(() => {
    fetchNovelDetails();
  }, [_id, showPostReview]);

  if (loading) {
    return <div>Loading...</div>; // Show a loading message while data is being fetched
  }

  if (!currnovel) {
    return <div>Novel not found</div>; // Show a message if the novel is not found
  }

  return (
    <>
      <Header />
      <div className='novelpagecontainer'>
        <Novelheader novel={currnovel} />
        <Summary summary={currnovel.description} />
        <Chaptertable novelId={_id} postedBy={currnovel.postedby}/>
        <div className='review-section'>
          {authstatus.authenticated ? (
            !showPostReview ? (
              <div className='show-post-review'>
                <button onClick={() => setShowPostReview(true)}>Rate this Novel</button>
              </div>
            ) : (
              <Postreview _id={_id} closeFunction={closeFunction} />
            )
          ) : (
            <div className='show-post-review'><h2>User's Reviews</h2></div>
          )}

          {reviews.map((review) => (
            <Comment key={review._id} {...review} />
          ))}
        </div>
      </div>
      <Footercomponent />
    </>
  );
};

export default Novelpage;

