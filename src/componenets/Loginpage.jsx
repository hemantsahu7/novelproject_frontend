import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function Loginpage(){
    const navigate = useNavigate();
    const [userinfo,setuserinfo] = useState({
     useremail:"",
     userpassword:""
    });
    const api= import.meta.env.VITE_API_URL;
    function handlechange(event){
      const {name,value} = event.target;
      setuserinfo(prev=>{
        return{...prev,[name]:value};
      })
      
    };
    async function check(event){
        console.log("this login check function works");
        event.preventDefault();
        try{
      
          const result = await axios.post(`${api}/login`,userinfo, { 
            withCredentials: true 
          });
          console.log(result);
          if(result.status==200){
              navigate("/");
          }
         }
         catch(error){
          console.log(error);
         }

    }

    return (
        <>
        <div className="logindiv">
            <div className="logincontain">
            <div className="weblogo">MyNvl</div>
            <h5>Login in MyNvl to read exciting novels</h5>
            <form onSubmit={check} className = "loginform">
                <input type= "email" name="useremail" value = {userinfo.useremail} placeholder="email" onChange={handlechange}></input>
                <input type= "password" name="userpassword" value = {userinfo.userpassword} placeholder="password" onChange={handlechange} ></input>
                <button type="submit">Login</button>
                
            </form>
            <p>Don't have an account? click here to <Link to={"/register"}>Register</Link></p>
            </div>
            
        </div>
        </>

    );


}

export default Loginpage;