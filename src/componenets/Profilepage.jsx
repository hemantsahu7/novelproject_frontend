import {React, useContext, useEffect, useState } from 'react'
import Header from './Header';
import image from '../assets/default-pic.png';
import axios from "axios";
import { NavLink ,Outlet} from 'react-router-dom';
import { profilecontext } from './context';
import Footer from './Footercomponent';

function Profilepage() {
  const {imageurl,setcurrimage,setimageurl,currimage,authstatus,setauthstatus} = useContext(profilecontext);
  const api= import.meta.env.VITE_API_URL;
  useEffect(()=>{
    getimg();
    updateuserinfo();
  },[])

  async function updateuserinfo(){
    try{
        const response = await axios.get(`${api}/updated_user_info/${authstatus.user._id}`);
        setauthstatus(response.data);
    }
    catch(error){
        console.log("updating the user info");
    }
 };

  async function uploadimg(e){
    e.preventDefault();
    
    if(currimage == null){
      return;
    }

    const formData = new FormData();
    formData.append('profile-image', currimage);
    console.log(formData);
    try {
      const response = await axios.post(`${api}/upload`, formData, {
        withCredentials: true,
      });
      console.log(response.data); // Handle response, e.g., save the image URL or path
    }catch (error) {
      console.log('Error uploading image:', error);
    }
    getimg();
  }
  async function getimg(){
    try {
      const result = await axios.get(`${api}/profilepic`,{withCredentials:true});
      const p = `${api}${result.data.imagepath}`;
      console.log(result.data.imagepath);
      if(result.data.imagepath != null){
        console.log("this set image url");
        setimageurl(p);
      }
      else{
        setimageurl(image);
      }
      
    }
    catch(error){
      console.log("error during geting image");
    }

  }
  return (
    <>
    <Header/>
    <div className="body">
    <div className="container">
        <div className='profileandnav'>
         <div className="profileinfo">
            <div className='imageuplode'>
                <div className="bigprofilepic"><img src={imageurl}/></div>
            </div>
            <div className="userid">
              <p>Name: {authstatus.user? authstatus.user.name:"loading"}</p>
               <p>Email: {authstatus.user? authstatus.user.email:"loading"}</p>
               <p>Novel Read:{authstatus.user?authstatus.user.novelRead.length:"loading"}</p>
               <p>Bookmarks:{authstatus.user?authstatus.user.bookmark.length:"loading"}</p>
               <p>Creations:{authstatus.user?authstatus.user.posted.length:"loading"}</p>
               <form className = "uploadbox" onSubmit={uploadimg}>
                <div className='inputfile'>
                  <label>{currimage? `${currimage.name}`:"enter file"}</label>
                  <input type='file' name = "profile-image" onChange={(e)=>{setcurrimage(e.target.files[0]); }} ></input>
                </div>
                <button type="submit">upload</button>
               </form>
            </div>
          </div>
          <ul className="profileoptions">
              <NavLink to ="/profilepage/bookmark" className={({ isActive }) => (isActive ? 'active-link' : undefined)}  style = {{textDecoration:'none'}}><li>Bookmark</li></NavLink>
              <NavLink to ="/profilepage/creatework" className={({ isActive }) => (isActive ? 'active-link' : undefined)} style = {{textDecoration:'none'}}><li>create work</li></NavLink>
              <NavLink to = "/profilepage/yourworks" className={({ isActive }) => (isActive ? 'active-link' : undefined)} style = {{textDecoration:'none'}}><li>your works</li></NavLink>
          </ul>
        </div>
      
        <div className="profileadv">
          <Outlet/>
        </div>

    </div>
    </div>
    </>
  )
}

export default Profilepage;