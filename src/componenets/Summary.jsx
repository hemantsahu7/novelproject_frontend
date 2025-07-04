import { useState } from "react";
import React from "react";
import '../css/Summary.css'

function Summary({ summary, maxLength = 100 }){
    const [isExpanded, setIsExpanded] = useState(false);

    const handleToggle = () => {
    setIsExpanded(!isExpanded);
    };

    const small = summary.length < maxLength;

 return (
    <div className="summary-container">
    <div className='summary' id="summary">
      <h2>Summary</h2>
     {isExpanded?summary.split('\n').map(para=>{return (<p>{para}</p>);}):summary.substring(0,maxLength).split('\n').map(para=>{return (<p>{para}</p>);})}
    <div className={`${(isExpanded || small)?'':'blureffect'}`}></div> 
    </div>
    <button onClick={handleToggle} className= {`view-more ${small?'invisible':''}`}>
      {(isExpanded)? 'View Less' : 'View More'}
    </button>
    </div>
    
 );
 


 
}
export default Summary;
