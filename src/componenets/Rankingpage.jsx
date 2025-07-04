import React, { useState, useEffect } from "react";
import Rankingcatlog from "./Rankingcatlog";
import axios from "axios";
import '../css/Rankingpage.css';
import Header from "./Header";
import Footercomponent from "./Footercomponent";

function Rankingpage() {
  const [ranknovels, setranknovels] = useState([]);
  const [option, setoption] = useState('rank');
  const api= import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchRankedNovels = async () => {
      try {
        const response = await axios.get(`${api}/ranking?option=${option}`);
        setranknovels(response.data);
      } catch (error) {
        console.log("Error during fetching ranked novels:", error);
      }
    };

    fetchRankedNovels();
  }, [option]);

  return (
    <>
    <Header/>
    <div className="ranking-page">
      <ul className="ranking-option-div">
        <li onClick={() => setoption('rank')} >Overall rank</li>
        <li onClick={() => setoption('totalviews')}>Views</li>
        <li onClick={() => setoption('dailyviews')}>Daily views</li>
        <li onClick={() => setoption('monthlyviews')}>Monthly views</li>
        <li onClick={() => setoption('rating')}>Rating</li>
        <li onClick={() => setoption('bookmarks')}>Bookmarks</li>
      </ul>
      <div className="ranking-list">
        {ranknovels.map((novel,index) => (
          <Rankingcatlog key={novel._id} order={index} novel={novel} />
        ))}
      </div>
    </div>
    <Footercomponent/>
    </>
  );
}

export default Rankingpage;



