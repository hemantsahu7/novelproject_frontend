import React, { useState,useEffect } from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import '../css/Addchapter.css';
import axios from "axios";

function Editchapter(){
    const navigate = useNavigate();
  const {novelId,chapterId} = useParams();
  const [chapterTitle, setChapterTitle] = useState('');
  const [chapterText, setChapterText] = useState('');
  const api= import.meta.env.VITE_API_URL;

  useEffect(() => {
   
    async function apidata() {
        try {
            const response = await axios.get(`${api}/novel/${novelId}`);
            const novelData = response.data;
            const chapterData = novelData.chapters.find((chapter)=>chapter._id == chapterId);
            setChapterTitle(chapterData.title);
            setChapterText(chapterData.content);
            
           
        } catch (error) {
            console.error("Error fetching chapter data:", error);
        }
    }

    apidata();
}, []);

  async function handleSubmit(e){
    e.preventDefault();
    // Handle form submission logic here
   
    try {
        const response = await axios.post(`${api}/editchapter`, {novelId,chapterId,content:chapterText,title:chapterTitle}, {
          withCredentials: true,
        });
        navigate(`/novel/${novelId}/particularchapter/${chapterId}`);
         
      }catch (error) {
        console.log('Error during editing of chapter', error);
      }


    console.log(novelId);
    console.log(chapterId);
    console.log('Chapter Title:', chapterTitle);
    console.log('Chapter Text:', chapterText);
    
  };

  return (
    <div className="add-chapter-container">
      <div className="form-container">
        <h1 className="form-title">Edit Chapter</h1>
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
          <button type="submit" className="submit-button">Edit</button>
        </form>
      </div>
    </div>
  );
};

export default Editchapter;