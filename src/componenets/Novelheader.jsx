import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../css/novelheader.css";
import { profilecontext } from "./context";
import axios from "axios";
import Star from "./Star";

function Novelheader({ novel }) {
  const { authstatus, setauthstatus } = useContext(profilecontext);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [countbookmarks, setCountbookmarks] = useState(novel.bookmarks || 0);
  const api= import.meta.env.VITE_API_URL;
  

  useEffect(() => {
    async function checkBookmark() {
      if (authstatus.authenticated) {
        try {
          const response = await axios.post(`${api}/checkbookmark`, { userid: authstatus.user._id, novelid: novel._id });
          setIsBookmarked(response.data);
        } catch (error) {
          console.log("error during checking bookmark status", error);
        }
      }
    }
    checkBookmark();
  }, [authstatus, novel._id]);

  async function addBookmark() {
    if (authstatus.authenticated && !isBookmarked) {
      try {
        const response = await axios.post(`${api}/addbookmark`, { userid: authstatus.user._id, novelid: novel._id });
        setauthstatus({ authenticated: true, user: response.data });
        setIsBookmarked(true);
        setCountbookmarks(prevCount => prevCount + 1);
      } catch (error) {
        console.log("error during bookmarking a novel", error);
      }
    } else if (authstatus.authenticated && isBookmarked) {
      console.log("this is already bookmarked so no need to click");
      try {
        const response = await axios.post(`${api}/deletebookmark`, { userid: authstatus.user._id, novelid: novel._id });
        setauthstatus({ authenticated: true, user: response.data });
        setIsBookmarked(false);
        setCountbookmarks(prevCount => prevCount - 1);
      } catch (error) {
        console.log("error during unbookmarking a novel", error);
      }
    }
  }

  return (
    <div className="novel-container" style={{ background: `url(${api}${novel.coverImage}) center center/cover` }}>
      <div className='glass'>
        <div className='novel-detail'>
          <div className="novel-cover">
            <img src={`${api}${novel.coverImage}`} alt={novel.title} />
          </div>
          <div className="novel-info">
            <h1>{novel.title}</h1>
            <p><strong>Author:</strong> {novel.author}</p>
            <Star stars={novel.rating} />
            <div className="novel-rank-rating">
              <span className="rank"><i className="fa-solid fa-crown"></i> RANK : {novel.rank ? novel.rank : '1'}</span>
            </div>
            <div className="novel-stats">
              <span>Chapters: {novel.chapters.length}</span>
              <span>Views: {novel.totalviews ? novel.totalviews : '666k'}</span>
              <span>Bookmarked: {countbookmarks}</span>
              <span>Status: {novel.status ? novel.status : 'completed'}</span>
            </div>
            <div className="novel-categories">
              {novel.genre.map((category, index) => (
                <Link key={index} style={{ textDecoration: 'none', color: 'white' }} to={`/filter?tags=${encodeURIComponent(category)}`}>
                  <span className="category">{category}</span>
                </Link>
              ))}
            </div>
            <div className="novel-buttons">
              <button className="read-button">READ CHAPTER 1</button>
              <button className="library-button" disabled={!authstatus.authenticated} onClick={addBookmark}>
                {isBookmarked ? "Unbookmark" : "Bookmark"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Novelheader;

