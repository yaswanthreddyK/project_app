import React from "react";
import "./gigsList.scss";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { experimentalStyled as styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function GigsList() {
  return (
    <div className="gigsList">
      <div className="filter-section">
        <div className="search-con">
          <input type="text" placeholder="Search..." className=" input-field" />
        </div>
        <div className="breadcrum-con">
          Related <span className="breadcrum-txt">Social Media Manager,</span>
          <span className="breadcrum-txt">instagram Manager,</span>
        </div>
        <div className="filter-con">
          <div className="select-field">
            <select className="select-box">
              <option value="selected">Category</option>
              <option value="A">Development</option>
              <option value="B">Design</option>
              <option value="C">SCO</option>
            </select>
          </div>
          <div className="select-field">
            <select className="select-box">
              <option value="selected">Price</option>
              <option value="A">$10 to $50</option>
              <option value="B">$50 to $100</option>
              <option value="C">$100 to $500</option>
            </select>
          </div>
          <div className="select-field">
            <select className="select-box">
              <option value="selected">Delivery Time</option>
              <option value="A">1 Day</option>
              <option value="B">1 Week</option>
              <option value="C">1 Month</option>
            </select>
          </div>
          <div className="select-field">
            <select className="select-box">
              <option value="selected">Talent Details</option>
              <option value="A">Talent 1</option>
              <option value="B">Talent 2</option>
              <option value="C">Talent 3</option>
            </select>
          </div>
        </div>
      </div>
      <Box sx={{ flexGrow: 1 }}>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {Array.from(Array(6)).map((_, index) => (
            <Grid item xs={6} sm={4} md={3} lg={3} key={index}>
              {/* <Item> */}
              <div className="gig-card">
                <img src="./img/01.jpg" className="gigs-list-img" />
                <div className="gig-details">
                  <div className="padding">
                    <p className="gigs-title">
                      Submitted UK Annual Accounts/CT600,SA,Strike-off..
                    </p>
                    <div className="deliver-details">
                      <p className="amount-txt">From $120</p>
                      <p className="timer-txt">
                        <img src="./img/clock.png" className="clock-img" />
                        <p className="amount-txt">14 day delivery</p>
                      </p>
                    </div>
                    <hr />
                    <div className="seller-details">
                      <div className="user-details">
                        <img src="./img/user.png" className="user-img" />
                        <div className="user-con">
                          <p className="user-name">Wolter</p>
                          <p className="level">TOP RATED</p>
                        </div>
                      </div>
                      <div className="review-con">
                        <img src="./img/review.png" className="review-img" />
                        <p className="review-txt">4.7(12)</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* </Item> */}
            </Grid>
          ))}
        </Grid>
      </Box>
    </div>
  );
}

export default GigsList;
