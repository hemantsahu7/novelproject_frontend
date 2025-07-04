import React from "react";
import '../css/Star.css';
const Star = ({ stars }) => {
    const ratingStar = Array.from({ length: 5 }, (elem, index) => {
      let number = index + 0.5;
      debugger;
      return (
        <span key={index}>
          {stars >= index + 1 ? (
            <i class="fa-solid fa-star star-color"></i>
          ) : stars >= number ? (
            <i class="fa-regular fa-star-half-stroke star-color"></i>
          ) : (
            <i class="fa-regular fa-star star-color"></i>
          )}
        </span>
      );
    });

    return (
        <>
          <div className="star-div">
            {ratingStar}
            <p>  ({stars})</p>
          </div>
        </>
      );
    };
    export default Star;