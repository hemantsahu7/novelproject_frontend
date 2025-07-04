import React from 'react';
import '../css/Glasscard.css';
import Star from './Star';

const GlassCard = ({ novel,url,effect }) => {
  function compress(val) {
    if (val >= 1000000000) {
      val = (val / 1000000000).toFixed(1);
      return val + 'B';
    } else if (val >= 1000000) {
      val = (val / 1000000).toFixed(1);
      return val + 'M';
    } else if (val >= 1000) {
      val = (val / 1000).toFixed(1);
      return val + 'k';
    } else {
      return val.toString();
    }
  }
  return (
    <div className={`below-bg ${effect?'effect':''}`} style={{background :`url(${url}) center center/cover`}}>
    <div className="glass-card">
      <div className="gcontent">
        <h2 className="gtitle">{novel.title}</h2>
        <p className="gauthor">Author: {novel.author}</p>
        <Star stars={novel.rating} />
        <div className='glassdiv1'>
        <p className="grank"><i class="fa-solid fa-crown"></i> Rank: {novel.rank}</p>
        </div>
        <div className='glassdiv2'>
        <div><p>chapters:</p><p className="gchapters"><i class="fa-solid fa-book"></i> {novel.chapters.length}</p></div>
        <div className='vertical-line'></div>
        <div><p>Views:</p><p className="gviews"> <i class="fa-solid fa-eye"></i>{compress(novel.totalviews)}</p></div>
        <div className='vertical-line'></div>
        <div><p>Bookmarked:</p><p className="gbookmarked"> <i class="fa-solid fa-bookmark"></i>{compress(novel.bookmarks)}</p></div>
        <div className='vertical-line'></div>
        <div><p>Status: </p><p className="gstatus">{novel.status}</p></div>
        </div>
        <div className="gcategories">
          <p>Categories: </p>
          <ul>
            {novel.genre.map((category, index) => (
              <li key={index}>{category}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
    </div>
  );
};

export default GlassCard;