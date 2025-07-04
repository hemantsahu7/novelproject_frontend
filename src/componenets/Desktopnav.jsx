import React, { useContext } from "react";
import { searchcontext } from "./context";
import Searchbar from './Searchbar'
import Profile from "./profile";
import {Link} from "react-router-dom";

function Desktopnav(){
  
     const {isexpand, setisexpand,appear,setappear} = useContext(searchcontext);
    return (

        <div className= {`ham ${appear? '':'hidden'}`}>
        <div className="navbtns">
          <div className="rankingbtn"><Link to ="/ranking" style={{textDecoration:"none" , color:"black"}}><i className="fa-solid fa-ranking-star" id = "iconsize" ></i><span>Ranking</span></Link></div>
          <div className="filterbtn"><Link to ="/filter" style={{textDecoration:"none" , color:"black"}}><i className="fa-solid fa-filter" id = "iconsize"></i><span>Filter</span></Link></div>
          <div className="updatebtn"><Link to ="/updates" style={{textDecoration:"none" , color:"black"}}><i className="fa-solid fa-pen-nib" id = "iconsize"></i><span>updates</span></Link></div>
          {isexpand == false? <div  className="searchtag" onClick={()=>{return setisexpand(true)}}><i className="fa-solid fa-magnifying-glass" id = "iconsize"></i>Search</div>:<Searchbar val={isexpand}></Searchbar>}
        </div>
        <Profile></Profile>
        </div>
    )
}
export default Desktopnav;