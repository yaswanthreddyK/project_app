import "./Job.css";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import WorkIcon from "@mui/icons-material/Work";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Suspense, useEffect, useState } from "react";
import ProposalForm from "../../components/proposalForm/ProposalForm";
import { Await, defer, useLoaderData, useLocation } from "react-router-dom";
import { fetchSingleUser, fetchSingleJob } from "../../utils";
import Spinner from "../../components/Spinner/Spinner";
import Error from "../../components/Error/Error";
import { Box, Chip } from "@mui/material";

export function loader({ params }) {
  const id = params.id;
  const companyId = params.companyId
  return defer({ userData: fetchSingleUser(companyId), jobDetails: fetchSingleJob(id) });
}

function Job() {
  const location = useLocation();
  const [openApplication, setOpenApplication] = useState(false);
  const [error, setError] = useState("");
  const { userData, jobDetails } = useLoaderData();

  const handleApply = (event) => {
    setOpenApplication(true);
    document
    .getElementsByClassName("proposal-container")[0]
    ?.scrollIntoView({ behavior: "smooth" });
  };


  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  function renderJobDetails([userData, jobDetails]) {
    return (
      <>
        <div className="top">
          {error && <h3>{error}</h3>}
          <div className="top-positioning">
            <div className="top-left">
              <div className="company-img">
                <img src={userData.profileImage} alt="" />
              </div>
              <div className="company-details">
                <h2 className="bold">{jobDetails.jobRole}</h2>
                <p className="light">{userData.companyName}</p>
              </div>
            </div>
            <div className="top-right medium">
              {new Date(jobDetails.deadline).toISOString().split("T")[0]}
            </div>
          </div>
          <div className="top-button">
            <button onClick={handleApply}>APPLY TO THIS JOB</button>
          </div>
        </div>
        <div className="middle">
          <div className="job-type">
            <div>
              <div>
                <MonetizationOnIcon sx={{ color: "#4cae9b" }} />
              </div>
              <div className="medium-black">{`$${jobDetails.budget?.min} - $${jobDetails.budget?.max}`}</div>
            </div>

            <div>
              <div>
                <WorkIcon sx={{ color: "#4cae9b" }} />
              </div>
              <div className="medium-black">{jobDetails?.jobType}</div>
            </div>

            <div>
              <div>
                <LocationOnIcon sx={{ color: "#4cae9b" }} />
              </div>
              <div className="job-location medium">{jobDetails?.location}</div>
            </div>
          </div>

          <div className="skills-required">
            <div className="medium">
              <div>Experience Level</div>
              <div className="career-level-value bold">
                {jobDetails.experienceRequired}
              </div>
            </div>
            <div>
              <div className="medium">Skills Required</div>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                {jobDetails.skillsRequired.map((skill) => (
                  <Chip
                    key={skill}
                    label={skill}
                    sx={{ backgroundColor: "#9fe4d636" }}
                  />
                ))}
              </Box>
            </div>

            <div className="medium"></div>
          </div>
        </div>
        <div className="bottom">
          <h3 className=" medium">Job Description</h3>
          <p className="job-description light">
           {jobDetails.description}
          </p>
          <h3 className="medium-black">Responsibilities</h3>
          <p className="role light">
            {jobDetails.responsibilities}
          </p>
         

          <div className="bottom-button">
            <button onClick={handleApply}>APPLY TO THIS JOB</button>
          </div>
        </div>
        
        <div className="proposal-container">
        {openApplication && (
          <div >
            <div className="proposal-positioning">
              <h3 className="bold">Proposal Form</h3>
              <ProposalForm jobId={jobDetails._id} />
            </div>
          </div>
      )}
        </div>
      </>
    );
  }
  return (
    <>
      <div className="job-detail-container">
        <div className="job-width">
          <div className="job-positioning">
            <Suspense fallback={<Spinner />}>
              <Await
                resolve={Promise.all([userData, jobDetails])}
                errorElement={<Error />}
              >
                {renderJobDetails}
              </Await>
            </Suspense>
          </div>
        </div>
      </div>

      
    </>
  );
}

export default Job;
