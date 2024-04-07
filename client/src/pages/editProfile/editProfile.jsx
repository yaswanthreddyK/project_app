import React from "react";
import "./editProfile.scss";
function EditProfile() {
  return (
    <div className="edit-container">
      <div className="info">
        <div className="input-search">
          <p>Full Name</p>
          <input className="search-box" type="text"  />
        </div>
        <div className="input-search">
          <p>Summary</p>
          <textarea
            rows="7"
            className="search-box"
            type="text"
          ></textarea>
        </div>
        <div className="flex">
          <div className="input-search">
            <p>Full Name</p>
            <input className="search-box" type="text"  />
          </div>
          <div className="input-search">
            <p>Full Name</p>
            <input className="search-box" type="text" />
          </div>
        </div>
        <div className="input-search">
          <p>Description</p>
          <textarea
            rows="4"
            className="search-box"
            type="text"
          ></textarea>
        </div>
        <div className="upload-image">
          <p>Upload Profile Image</p>
          <div className="uploader">
            <input type="file" className="file-uploader" />
            <p className="upload-txt">Choose Your Image </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditProfile;
