
import React, { useState, useContext, useEffect } from "react";
import { profilecontext } from "./context";
import axios from "axios";
import { Link } from "react-router-dom";

function Yourworks() {
  const [creatednovels, setcreatednovels] = useState([]);
  const [novelToDelete, setNovelToDelete] = useState(null);
  const { authstatus, setauthstatus } = useContext(profilecontext);
  const api= import.meta.env.VITE_API_URL;

  async function fetchcreation() {
    if (authstatus.authenticated) {
      try {
        const response = await axios.get(`${api}/creatednovels/${authstatus.user._id}`);
        setcreatednovels(response.data);
        console.log("this is created novels ", response.data);
      } catch (error) {
        console.log("error during fetching created novels");
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

  useEffect(() => {
    fetchcreation();
    updateuserinfo();
  }, []);

  const handleDelete = async () => {
    setNovelToDelete(null);
    if (novelToDelete) {
      try {
        // Call the deleteNovel function to handle deletion on the backend
        await axios.delete(`${api}/deletenovel/${novelToDelete}/${authstatus.user._id}`);
        setcreatednovels(creatednovels.filter(novel => novel._id !== novelToDelete));
         // Close the popup
        updateuserinfo();
      } catch (error) {
        console.log("error during deleting novel");
      }
    }
  };

  return (
    <>
      <ul className="bookmark-div">
        {creatednovels.map((novel) => (
          <li key={novel._id} className="bookmarked-novel">
            <Link to={`/novel/${novel._id}`} style={{ textDecoration: 'none', color: 'black' }}>
              <img src={`${api}${novel.coverImage}`} alt={`${novel.title} cover`} />
            </Link>
            <div>
              <Link to={`/novel/${novel._id}`} style={{ textDecoration: 'none', color: 'black' }}>
                {novel.title}
              </Link>
            </div>
            <i onClick={() => setNovelToDelete(novel._id)} className="fa-solid fa-trash" style={{cursor:'pointer'}}></i>
          </li>
        ))}
      </ul>

      {novelToDelete && (
        <div className="confirmation-popup-bg">
        <div className="confirmation-popup">
          <p>Are you sure you want to delete this novel?</p>
          <button onClick={handleDelete}>Delete</button>
          <button onClick={() => setNovelToDelete(null)}>Cancel</button>
        </div>
        </div>
      )}
    </>
  );
}

export default Yourworks;

