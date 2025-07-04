import React from 'react';
import '../css/Rankingcatlog.css';


  
  const Rankingcatlog = ({novel,order}) => {
    const { title, coverImage, genre, status } = novel;
    const rank = order+1;
    const api= import.meta.env.VITE_API_URL;
  
    return (
      <>
      <div className="ranking-card">
        <div className="ranking-cover-image-container">
          <img src={`${api}${coverImage}`} alt={title} className="ranking-cover-image" />
          <div className="gradient-overlay"></div>
        </div>
        <div className="ranking-novel-details">
          <div className="ranking-status">
            <span className="ranking">{rank}</span>
            <span className="rank-novel-status">{status}</span>
          </div>
          <h3 className="ranking-novel-title">{title}</h3>
          <div className="ranking-genre-tags">
            {genre.map((tag, index) => (
              <span key={index} className="ranking-genre-tag">{tag}</span>
            ))}
          </div>
        </div>
      </div>
      </>
    );
  };
  
  export default Rankingcatlog;
  
