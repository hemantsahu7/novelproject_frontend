import React from 'react';
import '../css/Novelcatlog.css';
import { Link } from 'react-router-dom';
import Star from "./Star.jsx";
const novel = {
  imageurl: 'http://localhost:3000/profileimages/hemantpic.jpg',
  title: 'Reverend Insanity: story of fang yuan ldjfkdjklflj',
  description: 'Description of the novel...',
  author: 'Gu Zhen Ren',
  rank: 3,
  rating: 4.9,
  chapters: 2334,
  views: '33.3M',
  bookmarked: '30.5K',
  status: 'Completed',
  updated: '7 hours ago',
  categories: ['Action', 'Adventure', 'Fantasy', 'Martial Arts', 'Mature', 'Psychological', 'Xianxia'],
};

function Novelcatlog({filterednovel}) {
  const api= import.meta.env.VITE_API_URL;
  return (
    <div className="novel-catlog">
      <Link to={`/novel/${filterednovel._id}`} style={{textDecoration:'none',color:'white'}}><img src={`${api}${filterednovel.coverImage}`} alt="Novel Cover" className="catlog-image" /></Link>
      <div className="catlog-details">
        <h2 className="catlog-title" title={filterednovel.title}><Link to={`/novel/${filterednovel._id}`} style={{textDecoration:'none',color:'black'}}>{filterednovel.title}</Link></h2>
        <div className="catlog-rating">
          {/*<span className="star-rating">★★★★☆</span>*/}
          <Star stars={novel.rating}/>
        </div>
        
        {/* Grid layout for rank, bookmarks, views, and update time */}
        <div className="catlog-info-grid">
          <div><span>Rank:</span> {novel.rank}</div>
          <div><span>Bookmarks:</span> {filterednovel.bookmarks}</div>
          <div><span>Views:</span> {filterednovel.totalviews}</div>
          <div><span>Updated:</span> {novel.updated}</div>
        </div>

        <div className="catlog-status">
          Status: <span className={novel.status === 'Ongoing' ? 'status-ongoing' : 'status-completed'}>{novel.status}</span>
        </div>
      </div>
    </div>
  );
}

export default Novelcatlog;
