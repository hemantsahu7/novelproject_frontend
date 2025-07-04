import React from "react";
import "../css/Footercomponent.css";
import {Link} from "react-router-dom";

function Footercomponent(){
      const year = new Date().getFullYear();
    return (
        <footer>
        <div className='footerdiv'>
            <Link to = "/" style={{textDecoration:'none'}}><h2>MyNvl</h2></Link>
            <p>copyright © {year}</p>
        </div>
        </footer>
    );
}

export default Footercomponent;