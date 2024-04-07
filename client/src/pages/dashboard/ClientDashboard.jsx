import React from "react";
import {
  Grid,
  Paper,
  Typography,

} from "@mui/material";
import "./Dashboard.css"

import { PeopleAlt, AttachMoney, Work, HowToReg } from "@mui/icons-material";
import OnHireList from "../../components/onHireList/OnHireList";

const Meter = ({ icon, count, name }) => {
  return (
    <Paper
      style={{
        padding: "0.8em",
        textAlign: "center",
        minWidth: "250px",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
        borderRadius: "10px",
      }}
    >
      <div>{icon}</div>
      <div>
        <Typography variant="h4" style={{ margin: "10px 0", fontWeight: "600", color: "#2b2b2b"}}>
          {count}
        </Typography>
        <Typography variant="subtitle1" className="font-Neue-roman">{name}</Typography>
      </div>
    </Paper>
  );
};

const ClientDashboard = ({contractList,stats}) => {
  const jobPostedCount = 50;
  const totalApplicantsCount = 100;
  const totalPeopleOnHireCount = 2;
  
  const meters = [
    { icon: <Work fontSize="large" style={{color: "#4681d2", backgroundColor: "#ececfc", fontSize: "3rem", padding: "0.15em", borderRadius: "50%"}}/>, count: stats.noOfJobsPosted, name: "Jobs Posted" },
    {
      icon: <PeopleAlt fontSize="large" style={{color: "#fc4980", backgroundColor: "#ffecf2", fontSize: "3rem", padding: "0.15em", borderRadius: "50%"}}/>,
      count: stats.totalApplicants[0].count,
      name: "Total Applicants",
    },
    {
      icon: <HowToReg fontSize="large" style={{color: "#fa6927", backgroundColor: "#ffefe7", fontSize: "3rem", padding: "0.1em", borderRadius: "50%"}}/>,
      count: stats.noOfemployeesHired,
      name: "On Hire",
    },
    {
      icon: <AttachMoney fontSize="large" style={{color: "#02bfd5", backgroundColor: "#e5f9fb", fontSize: "3rem", padding: "0.15em", borderRadius: "50%"}}/>,
      count: 540,
      name: 'Money Spent'
    }
  ];

  

  return (
    <div className="dashboard">
      <Grid
        container
        sx={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          marginBottom: "2em",
          gap: "0.5em",
          "@media (max-width: 750px)": {}
        }}
      >
        {meters.map((meter, index) => (
          <Grid  item  key={index} >
            <Meter {...meter} />
          </Grid>
        ))}
      </Grid>
          <h3 className="list-heading">On Hire</h3>
          <div className="scroll-function">
            <OnHireList contractList={contractList}/>
          </div>
    </div>
  );
};

export default ClientDashboard;
