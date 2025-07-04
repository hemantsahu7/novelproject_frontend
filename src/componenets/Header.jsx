import React, { createContext, useState } from 'react';
import { searchcontext } from './context';
import Desktopnav from './Desktopnav';
import { Link } from 'react-router-dom';
function Header(){
  const[isexpand, setisexpand] = useState(false);
  const[appear,setappear] = useState(false);
 return (
  
    <header className="navbar">
      <div className="navbar-options">
        <div className="weblogo"><Link to="/" style = {{textDecoration:'none'}}>MyNvl</Link></div>
        <div className="hambtn" onClick={()=>{setappear(!appear)}}>
          {appear?<i class="fa-solid fa-xmark"></i>:<i class="fa-solid fa-bars"></i> }
        </div>
        <searchcontext.Provider value = {{isexpand,setisexpand,appear,setappear}}>
          <Desktopnav></Desktopnav>
        </searchcontext.Provider>
      </div>
    </header>
 );   

}

export default Header;