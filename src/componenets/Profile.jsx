
import {React,useEffect, useContext} from "react";
import axios from "axios";
import{Link,useNavigate} from "react-router-dom";
import { profilecontext } from "./context";
import image from "../assets/default-pic.png";


function Profile(){
  const{imageurl,setimageurl,authstatus,setauthstatus} = useContext(profilecontext);
  const navigate = useNavigate();
  const api= import.meta.env.VITE_API_URL;

  useEffect(()=>{
    async function checkauth(){
      try{
       const result = await axios.get(`${api}/profile`,{ 
         withCredentials: true 
       });
       setauthstatus(result.data);
      }
      catch(error){
        console.error("error during checking authstatus");
      }
   }
  
   checkauth();
   getimg();
  },[]);

   async function handlelogout(){

    try{
      await axios.get(`${api}/logout`,{ 
        withCredentials: true 
      });
      navigate("/");
      setauthstatus({authenticated:false,user:null});
    }
    catch(error){
       console.error("error occur during log out process");
    }
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
    {authstatus.authenticated? 

    <div className="profilecontainer">
       <div className="userbox">
           <Link to="/profilepage"><div className="userpic">
              <img src={imageurl} />
           </div></Link>
           <p className="username">{authstatus.user.name}</p>
       </div>
       <div className="logout btnborder" onClick={handlelogout}><i class="fa-solid fa-arrow-right-from-bracket"></i></div>
    </div>:

    <Link to={"/login"} style = {{textDecoration:'none'}}><div className="signin btnborder">Signin</div></Link>
    }
    </>
  )
}
export default Profile;