import React, { useContext } from 'react'
import ClientSettings from "./ClientSettings"
import TalentSettings from './TalentSettings'
import "./Settings.css"
import UserContext from '../../context/Usercontext'

function Settings() {
  const {user} = useContext(UserContext)
  return (
    <div>
      {user.isCompany ? <ClientSettings /> : <TalentSettings />}
    </div>
  )
}

export default Settings