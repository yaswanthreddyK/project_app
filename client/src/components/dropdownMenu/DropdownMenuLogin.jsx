import React from "react";
import "./DropdownMenu.css";
import { Link } from "react-router-dom";

const DropdownMenuLogin = () => {

function handleMouseEnter(e){
   document.getElementById('Login-Menu').style.display = "block"
}

function handleMouseLeave(e){
    document.getElementById('Login-Menu').style.display = "none"
}
  return (
    <>
      <label htmlFor="Find" className="dropdown-menu" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        Login
        <ul id="Login-Menu">
            <div className="special-div">
                
            <Link to="/login">
          <li>
            Login
            </li>
            </Link>
            <Link to="/signup">
          <li>
                Signup
            </li>
            </Link>
            <Link to="/">
          <li>
                Early access
            </li>
            </Link>
          
            </div>
        </ul>
      </label>
    </>
  );
};

export default DropdownMenuLogin;
