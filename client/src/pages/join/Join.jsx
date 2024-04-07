import React, { useState } from "react";
import "./Join.css";
import { Link, useNavigate } from "react-router-dom";

function Join() {
  const [activeTab, setActiveTab] = useState(1);
  const navigate = useNavigate()
  const handleTabClick = (tabNumber) => {
    setActiveTab(tabNumber);
  };

  const handleCreateAccount = async function(){
    navigate("/signup", {state: {activeTab}})
  }
  return (
    <div className="join-container">
      <p className="heading">Join as a Hirer or Skilled Professional</p>
      <div className="flex-card">
        <div
          className={`card ${activeTab === 1 ? "active" : ""}`}
          onClick={() => handleTabClick(1)}
        >
          <img src="./img/Talent.png" className="join-img" />
          <p className="join-txt">I’m Seeking Talent</p>
        </div>
        <div
          className={`card ${activeTab === 2 ? "active" : ""}`}
          onClick={() => handleTabClick(2)}
        >
          <img src="./img/Jobs.png" className="join-img" />
          <p className="join-txt">I’m Seeking Jobs</p>
        </div>
      </div>
      <div className="center-content">
          <button className="create-btn" onClick={handleCreateAccount}>Create Account</button>
        <p className="login-txt">
          Alredy have an account?
          <a href="/login" className="green-login-txt">Log In</a>
        </p>
      </div>
    </div>
  );
}

export default Join;
