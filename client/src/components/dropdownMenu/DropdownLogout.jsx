import React from "react";
import "./DropdownLogout.css";
import { Link, useNavigate } from "react-router-dom";

const DropdownMenuLogout = () => {
const navigate = useNavigate()
function handleMouseEnter(e){
   document.getElementById('Finds').style.display = "block"
}

function handleMouseLeave(e){
    document.getElementById('Finds').style.display = "none"
}

async function handleLogout(e){
 const response = await fetch('http://localhost:8800/api/users/logout',{
  method: "GET",
  credentials: "include"
 })

 const result = await response.json()
 if(result.success){
   return navigate('/login')
 }else{
  
 }
}
  return (
    <>
      <label htmlFor="Finds" className="dropdown-menu logout-menu" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        Profile
        <ul id="Finds">
            <div className="special-div">
                
            <Link to="/profile/">
          <li>
            My Profile
            </li>
            </Link>
            <button className="logout" onClick={handleLogout}>
          <li >
                Logout
            </li>
            </button>
          
            </div>
        </ul>
      </label>
    </>
  );
};

export default DropdownMenuLogout;
