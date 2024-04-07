import React, { useEffect, useRef } from 'react'
import Sidebar from '../../components/sidebar/Sidebar'
import { Outlet, useLocation } from 'react-router-dom'
import SidebarClient from '../../components/sidebar/SidebarClient'


function ClientProfile({user}) {
  const sideBarRef = useRef()
  const location = useLocation()
  const handleSideBarClick = (event) => {
   sideBarRef.current.classList.toggle("appear")
  }

 useEffect(()=>{
  sideBarRef.current.classList.remove("appear")
},[location.pathname])
  return (
    <div>
      <div>
        <div className='profile-container'>
          <div className='side-bar'>
              <SidebarClient />
          </div>
          
          <div className='main-page'>
              <Outlet user={user}/>
          </div>
          <div className='toggle-sidebar' ref={sideBarRef}> 
          <SidebarClient />
          </div>
          <div className='side-bar-button'>
              <button onClick={handleSideBarClick}>Side Bar</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ClientProfile