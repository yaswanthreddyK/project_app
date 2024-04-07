import React, { useContext } from 'react'
import MyProfileTalent from './MyProfileTalent'
import MyProfileClient from './MyProfileClient'
import "./MyProfile.css";
import UserContext from '../../context/Usercontext.js'

function MyProfile() {
  const {user} = useContext(UserContext)
   return (
    <div>
      {user.isCompany ? <MyProfileClient /> : <MyProfileTalent />}
    </div>
  )
}

export default MyProfile