import React, { useState } from "react";
import "./Add.scss";
// import 'bootstrap/dist/css/bootstrap.min.css';
import { MuiChipsInput } from "mui-chips-input";
const Add = () => {
  const itemList = ["Item 1", "Item 2", "Item 3", "Item 4"];
  const [chips, setChips] = React.useState([]);

  const handleChange = (newChips) => {
    setChips(newChips);
  };
  const checkboxStyles = {
    outline: "none", // Remove the default outline
    // You can add additional styles here as needed
  };
  return (
    <div className="add-container">
      <div className="info">
        <div className="input-search">
          <p>Job Title</p>
          <input className="search-box" type="text" placeholder="Job Title" />
        </div>
        <div className="input-search">
          <p>Job Description</p>
          <textarea
            rows="7"
            className="search-box"
            type="text"
            placeholder="Job Description"
          ></textarea>
        </div>

        <div className="upload-image">
          <p>Upload Images</p>
          <div className="uploader">
            <input type="file" className="file-uploader" />
            <img src="./img/upload-icon.png" className="upload-img" />
            <p className="upload-txt">Choose Your Image For Upload </p>
          </div>
        </div>

        <div className="input-search">
          <p className="skill-label">Required Skills</p>
          <div className="skills">
            <MuiChipsInput
              className="search-box"
              value={chips}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="input-search">
          <p>Location</p>
          <input className="search-box" type="text" placeholder="Location" />
        </div>

        <div className="row">
          <div className="input-search">
            <p>Job Type</p>
            <input className="search-box" type="text" placeholder="Job Type" />
          </div>
          <div className="input-search">
            <p>Hourly</p>
            <input className="search-box" type="text" placeholder="Hourly" />
          </div>
          <div className="input-search">
            <p>Fixed Budget</p>
            <input
              className="search-box"
              type="text"
              placeholder="Fixed Budget"
            />
          </div>
        </div>
        <div className="input-search">
          <p>Project Duration</p>
          <input
            className="search-box"
            type="text"
            placeholder="Project Duration"
          />
        </div>
      </div>
      <div className="details">
        <div className="web-btn">
          <button className="post-job-btn">Post Job</button>
          <button className="update-job-btn">Update Job</button>
        </div>
        <div className="questions-content">
          <p className="question">What level of experience will it need?</p>
          <div className="options">
            <input type="checkbox" className="checkbox" />
            <span className="answer">Entry</span>
          </div>
          <div className="options">
            <input type="checkbox" className="checkbox" />
            <span className="answer">Intermediate</span>
          </div>
          <div className="options">
            <input type="checkbox" className="checkbox" />
            <span className="answer">Expert</span>
          </div>
        </div>
        <div className="questions-content">
          <p className="question">How long will your work take ?</p>
          <div className="options">
            <input type="checkbox" className="checkbox" />
            <span className="answer">More than 6 months</span>
          </div>
          <div className="options">
            <input type="checkbox" className="checkbox" />
            <span className="answer">1 to 3 Months</span>
          </div>
          <div className="options">
            <input type="checkbox" className="checkbox" />
            <span className="answer">3 to 6 Months</span>
          </div>
        </div>
        <div className="mobile-btn">
          <button className="post-job-btn">Post Job</button>
          <button className="update-job-btn">Update Job</button>
        </div>
      </div>
    </div>
  );
};

export default Add;
