import React from "react";
import "./Gigs.scss";

function Gigs() {
  return (
    <div className="gigs-container">
      <div className="card-gigs">
        <div className="left-side">
          <div className="breadcam">
            <p>home -</p>
            <p>Development -</p>
            <p>Development IT </p>
          </div>
          <h1 className="gigs-heading">
            You Will Get Web App Using Mean | Mean Developer | MEAN
          </h1>
          <div className="user-details">
            <p className="user-name">
              <img src="./img/user.png" className="User-icon" />
              <p className="name-txt">Jhon show</p>
            </p>
            <p className="user-name">
              <img src="./img/review.png" className="User-icon" />
              <p className="name-txt">4.9 (234 Review)</p>
            </p>
            <p className="user-name">
              <img src="./img/top-rated.png" className="User-icon" />
              <p className="name-txt">TOP RATED PLUS</p>
            </p>
          </div>
          <img src="./img/thumbnail.webp" className="thumbnail-img" />
          <p className="description">
            Need people with German language specialists with an education
            background in Environmental Studies, Social and Social Governance.
            Need to write in the German language Need to be from an
            Environmental Studies background Can speak and write in German
            Language.
          </p>
          <p className="type-heading">Type</p>
          <p className="type-txt">UI/UX Designer</p>
          <div className="table">
            <table>
              <thead>
                <tr>
                  <th>Gigs</th>
                  <th>Starter</th>
                  <th>Standard</th>
                  <th>Advanced</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Rate</td>
                  <td>Delivery days</td>
                  <td>Paramter 2</td>
                  <td>Paramter 2</td>
                </tr>
                <tr className="colored">
                  <td>$50</td>
                  <td>3</td>
                  <td>Demo...</td>
                  <td>Demo...</td>
                </tr>
                <tr>
                  <td>$100</td>
                  <td>5</td>
                  <td>Demo...</td>
                  <td>Demo...</td>
                </tr>
                <tr className="colored">
                  <td>$100</td>
                  <td>5</td>
                  <td>Demo...</td>
                  <td>Demo...</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="review-section">
            <div className="review-part">
              <img src="./img/user.png" className="user-img" />
              <div className="name-con">
                <p className="buger-name">Sourav</p>
                <p className="country-txt">India</p>
              </div>
            </div>
            <img src="./img/5-star.png" alt="" className="five-star" />

            <div className="review-part">
              <img src="./img/user.png" className="user-img" />
              <div className="name-con">
                <p className="buger-name">Ecgar</p>
                <p className="country-txt">US</p>
              </div>
            </div>
            <img src="./img/5-star.png" alt="" className="five-star" />
          </div>
        </div>
        <div className="right-side">
          <div className="padding">
            <p className="select-txt">Select Gigs</p>
            <div className="select-package">
              <div className="package">
                <input type="checkbox" className="checkbox" />
                <p className="para-txt">Starter</p>
                <p className="para-txt">$50</p>
              </div>
              <div className="package">
                <input type="checkbox" className="checkbox" />
                <p className="para-txt">Starter</p>
                <p className="para-txt">$50</p>
              </div>
              <div className="package">
                <input type="checkbox" className="checkbox" />
                <p className="para-txt">Starter</p>
                <p className="para-txt">$50</p>
              </div>
            </div>
            <hr />
            <p className="package-selected">Starter</p>
            <p className="package-heading">
              One Landing Page with Prototype...
            </p>
            <div className="more-content">
              <div className="more-details">
                <p className="details-heading">Pages :</p>
                <p className="details-heading">One Screen</p>
              </div>
              <div className="more-details">
                <p className="details-heading">Delivery Time :</p>
                <p className="details-heading">3 Days</p>
              </div>
              <div className="more-details">
                <p className="details-heading">Revision :</p>
                <p className="details-heading">4 Times</p>
              </div>
            </div>

            <div className="delivery">
              <img src="./img/clock.png" className="clock-img" />
              <p className="delivery-txt">1 Day Delivery - Dec 20, 2023</p>
            </div>

            <button className="countine-btn">Continue ($50)</button>
            <button className="msg-btn">Message jhon</button>
          </div>
        </div>
      </div>
      <div className="review-section-moblie">
        <div className="review-part">
          <img src="./img/user.png" className="user-img" />
          <div className="name-con">
            <p className="buger-name">Sourav</p>
            <p className="country-txt">India</p>
          </div>
        </div>
        <img src="./img/5-star.png" alt="" className="five-star" />

        <div className="review-part">
          <img src="./img/user.png" className="user-img" />
          <div className="name-con">
            <p className="buger-name">Ecgar</p>
            <p className="country-txt">US</p>
          </div>
        </div>
        <img src="./img/5-star.png" alt="" className="five-star" />
      </div>
    </div>
  );
}

export default Gigs;
