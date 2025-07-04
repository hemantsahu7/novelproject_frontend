
import '../css/Bookmarkpage.css';
import React, { useContext, useEffect, useState } from "react";
import { profilecontext } from "./context";
import axios from "axios";
import { Link } from 'react-router-dom';

function Bookmarkpage() {
  const { authstatus,setauthstatus } = useContext(profilecontext);
  const [bookmarks, setbookmarks] = useState([]);
  const api= import.meta.env.VITE_API_URL;

  async function fetchbookmarks() {
    if (authstatus.authenticated) {
      try {
        const response = await axios.get(`${api}/bookmarks/${authstatus.user._id}`);
        setbookmarks(response.data);
      } catch (error) {
        console.log("error fetching bookmarked novels", error);
      }
    }
  }
 async function updateuserinfo(){
    try{
        const response = await axios.get(`${api}/updated_user_info/${authstatus.user._id}`);
        setauthstatus(response.data);
    }
    catch(error){
        console.log("updating the user info");
    }
 };

   function readchapters(novelid) {
    if (authstatus.authenticated) {
        
      const novel = authstatus.user.novelRead.find((nvl) => nvl.novelId === novelid);
      if (novel) {
        return novel.chaptersRead.length;
      }
      return 0;
    }
    return 0;
  }

  useEffect(() => {
    fetchbookmarks();
    updateuserinfo();
  }, []); // Note the dependency array here

  return (
    <ul className="bookmark-div">
      {bookmarks.map((novel) => (
        <Link to={`/novel/${novel._id}`} style={{textDecoration:'none' ,color:'black'}}><li key={novel._id} className="bookmarked-novel">
          <img src={`${api}${novel.coverImage}`} alt={`${novel.title} cover`} />
          <div>{novel.title}</div>
          <p>Complete: {novel.chapters.length !== 0 ? ((readchapters(novel._id) / novel.chapters.length) * 100).toFixed(2) : 0}%</p>
        </li></Link>
      ))}
    </ul>
  );
}

export default Bookmarkpage;
