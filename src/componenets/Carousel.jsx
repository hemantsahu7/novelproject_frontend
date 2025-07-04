

import React, { useState, useEffect, useRef } from 'react';
import '../css/Carousel.css';
import GlassCard from './Glasscard';
import axios from "axios";


const Carousel = () => {
  const [novel, setNovel] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const cardContainerRef = useRef(null);
  const [effect, setEffect] = useState(false);
  const [loading, setLoading] = useState(true); // New loading state
  const api= import.meta.env.VITE_API_URL;

  const handleMouseEnter = () => {
    setEffect(true);
  };

  const handleMouseLeave = () => {
    setEffect(false);
  };

  const handleFocus = () => {
    setEffect(true);
  };

  const handleBlur = () => {
    setEffect(false);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + novel.length) % novel.length);
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % novel.length);
  };

  const handleCardClick = (index) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    const fetchNovels = async () => {
      try {
        const response = await axios.post(`${api}/filter`);
        console.log(response.data.novels);
        setNovel(response.data.novels);
      } catch (error) {
        console.error('Error fetching carousel novels:', error);
      } finally {
        setLoading(false); // Set loading to false after fetching data
      }
    };

    fetchNovels();
  }, []);

  useEffect(() => {
    if (!loading && novel.length > 0) {
      const cardContainer = cardContainerRef.current;
      const activeCard = cardContainer.children[currentIndex];

      // Calculate the scroll position to center the active card
      const cardWidth = activeCard.offsetWidth;
      const containerWidth = cardContainer.offsetWidth;
      const scrollLeft = cardContainer.scrollLeft;
      const cardOffsetLeft = activeCard.offsetLeft;

      const scrollTo = cardOffsetLeft - (containerWidth / 2) + (cardWidth / 2);

      // Scroll the card container to the calculated position
      cardContainer.scrollTo({
        left: scrollTo,
        behavior: 'smooth'
      });
    }
  }, [currentIndex, loading, novel.length]);

  if (loading) {
    return <div>Loading...</div>; // Display a loading message while data is being fetched
  }

  if (novel.length === 0) {
    return <div>No novels available</div>; // Display a message if no novels are available
  }

  return (
    <div className='carousel-top-container'>
      <div className="carousel-container">
        <div className="carousel">
          <button onClick={handlePrev} className="nav-button">‹</button>
          <GlassCard novel={novel[currentIndex]} url={`${api}${novel[currentIndex].coverImage}`} effect={effect}></GlassCard>
          <div className='carousel-image-div'>
            <img src={`${api}${novel[currentIndex].coverImage}`} className="carousel-image" onFocus={handleFocus} onBlur={handleBlur} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} />
          </div>
          <button onClick={handleNext} className="nav-button">›</button>
        </div>
      </div>
      <div className="card-container" ref={cardContainerRef}>
        {novel.map((novel, index) => (
          <div
            key={index}
            className={`card ${currentIndex === index ? 'active' : ''}`}
            onClick={() => handleCardClick(index)}
          >
            <img src={`${api}${novel.coverImage}`} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;


