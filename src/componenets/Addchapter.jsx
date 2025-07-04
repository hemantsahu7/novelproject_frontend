import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../css/Addchapter.css';
import axios from "axios";

function Addchapter(){
  const navigate = useNavigate();
  const {novelId} = useParams();
  const [chapterTitle, setChapterTitle] = useState('');
  const [chapterText, setChapterText] = useState('');
  const api = import.meta.env.VITE_API_URL;

  async function handleSubmit(e){
    e.preventDefault();
    // Handle form submission logic here
   
    try {
        const response = await axios.post(`${api}/addchapter`, {novelId,chapterTitle,chapterText}, {
          withCredentials: true,
        });
        navigate(`/novel/${novelId}/particularchapter/${chapterId}`);
      }catch (error) {
        console.log('Error during addition of chapter', error);
      }


    console.log(novelId);
    console.log('Chapter Title:', chapterTitle);
    console.log('Chapter Text:', chapterText);
    
  };

  return (
    <div className="add-chapter-container">
      <div className="form-container">
        <h1 className="form-title">Add New Chapter</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="chapterTitle" className="form-label">Chapter Title</label>
            <input
              type="text"
              id="chapterTitle"
              className="form-input"
              value={chapterTitle}
              onChange={(e) => setChapterTitle(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="chapterText" className="form-label">Chapter Text</label>
            <textarea
              id="chapterText"
              className="form-textarea"
              rows="10"
              value={chapterText}
              onChange={(e) => setChapterText(e.target.value)}
              required
            ></textarea>
          </div>
          <button type="submit" className="submit-button">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Addchapter;
