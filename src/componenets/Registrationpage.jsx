import { useState } from "react";
import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function Registrationpage(){
    const navigate = useNavigate();
    const api= import.meta.env.VITE_API_URL;
    const [newuser,setnewuser] = useState({
        username:"",
        useremail:"",
        userpassword:""
       });

    function handlechange(event){
        const {name,value} = event.target;
        setnewuser(prev=>{
          return{...prev,[name]:value};
        })
        
    };
    async function createuser(event) {
         event.preventDefault();
         console.log("this create user funtion works");
           try{
            const result = await axios.post(`${api}/register`,newuser);
            console.log(result);
            if(result.status==200){
                navigate("/login");
            }
           }
           catch(error){
            console.error(error);
           }
     
    };

      return (
        <>
        <div className="logindiv">
        <div className="logincontain">
            <div className="weblogo">MyNvl</div>
            <h5>Register in MyNvl to read exciting novels</h5>
            <form onSubmit={createuser} className = "loginform">
                <input type="text" name="username" value={newuser.username} placeholder="username" onChange={handlechange}></input>
                <input type= "email" name="useremail" value = {newuser.useremail} placeholder="email" onChange={handlechange}></input>
                <input type= "password" name="userpassword" value = {newuser.userpassword} placeholder="password" onChange={handlechange} ></input>
                <button type="submit">Register</button>
            </form>
            </div>
        </div>
        </>

    );

};
export default Registrationpage;