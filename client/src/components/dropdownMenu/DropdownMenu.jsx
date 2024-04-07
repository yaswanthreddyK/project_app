import React from "react";
import "./DropdownMenu.css";
import { Link } from "react-router-dom";

const DropdownMenu = () => {

function handleMouseEnter(e){
   document.getElementById('Find').style.display = "block"
}

function handleMouseLeave(e){
    document.getElementById('Find').style.display = "none"
}
  return (
    <>
      <label htmlFor="Find" className="dropdown-menu" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        Find
        <ul id="Find">
            <div className="special-div">
                
            <Link to="/search-all/professionals">
          <li>
            Green Giggers
            </li>
            </Link>
            <Link to="/search-all/jobs">
          <li>
                Project Use Cases
            </li>
            </Link>
            <Link to="/search-all/companies">
          <li>
            Climate Technologies
            </li>
            </Link>
          
            </div>
        </ul>
      </label>
    </>
  );
};

export default DropdownMenu;
