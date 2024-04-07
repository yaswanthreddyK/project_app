import { BrowserRouter, NavLink, Route, useLocation, useNavigate } from 'react-router-dom';
import "./Navbar.css"
import { Fragment, useContext, useEffect, useState } from 'react';
import UserContext from '../../context/Usercontext';
import DropdownMenu from '../dropdownMenu/DropdownMenu';
import DropdownMenuLogin from '../dropdownMenu/DropdownMenuLogin';
import DropdownMenuLogout from '../dropdownMenu/DropdownLogout';

export default function Navbar () {
  const [showNavbar, setShowNavbar] = useState(false)
  const location = useLocation()
  const staticNav = location.pathname !== "/" ? true : false;
 const {user} = useContext(UserContext);
 
 useEffect(()=>{
      setShowNavbar(false)
 },[location.pathname])
  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar);
  };

  return (
    <div className={`${staticNav && " fixed-navbar"}`}>

    <nav className={`navbar  ${staticNav && " static"} `}>
      <div className="container">
        <div className="logo">
          <a href="/">
          <div className='logo'>
            <div className='brand-name'>
              <div className='clima'>Clima
              <span className='champion'>Champion</span>
              </div>
            </div>
            <div className='brand-logo'>
             <div className='by'>By</div>
             <div className='ecostart-img'>
            <img  src="../../../img/logo.svg" alt="" />
             </div>
            </div>
          </div>
          </a>
        </div>
        <div className="menu-icon" onClick={handleShowNavbar}>
          <Hamburger />
        </div>
        <div className={`nav-elements ${showNavbar && ' active'}`}>
          <ul>
      
            <li className='dropdown-li'>
             <DropdownMenu />
            </li>

            <li className='disappear'>
              <NavLink to="/search-all/professionals">Find Green Giggers</NavLink>
            </li>
            <li className='disappear'>
              <NavLink to="/search-all/jobs">Find Project Use cases</NavLink>
            </li>
            <li className='disappear'>
              <NavLink to="/search-all/companies">Find Climate Technologies</NavLink>
            </li>
          

            <li>
              <NavLink to="/carbon-monetization">Carbon Monetization</NavLink>
            </li>
            <li>
              {!user 
              ? ( 
              <div>
              <div className='dropdown-login'>
                  <DropdownMenuLogin/>
              </div> 
              <div className='dropdown-login-inside'>
                <NavLink to="/login">Login</NavLink>
                <NavLink to="/signup">Signup</NavLink>
                <NavLink to="/">Early access</NavLink>
              </div>
              </div>
              ) 
              : 
              (<div className='profile-logout'>
                <DropdownMenuLogout />
              </div>)}
             
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
  );
};


const Hamburger = () => (
  <svg
  className={`hamburger`}
    xmlns="http://www.w3.org/2000/svg"
    width="42"
    height="24"
    viewBox="0 0 52 24"
  >
    <g id="Group_9" data-name="Group 9" transform="translate(-294 -47)">
      <rect
        id="Rectangle_3"
        data-name="Rectangle 3"
        width="42"
        height="4"
        rx="2"
        transform="translate(304 47)"
        fill="#574c4c"
      />
      <rect
        id="Rectangle_5"
        data-name="Rectangle 5"
        width="42"
        height="4"
        rx="2"
        transform="translate(304 67)"
        fill="#574c4c"
      />
      <rect
        id="Rectangle_4"
        data-name="Rectangle 4"
        width="42"
        height="4"
        rx="2"
        transform="translate(304 57)"
        fill="#574c4c"
      />
    </g>
  </svg>
);

