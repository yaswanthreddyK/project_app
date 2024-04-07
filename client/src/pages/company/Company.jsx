import { Await, defer, useLoaderData, useLocation } from "react-router-dom";
import { Suspense, useEffect } from "react";
import "./Company.css";
import CompanyRecommendations from "../../components/recommendations/CompanyRecommendations";
import { fetchSingleUser } from "../../utils";
import Spinner from "../../components/Spinner/Spinner";
import { Box, Chip } from "@mui/material";
import { LocationCity } from "@mui/icons-material";

export function loader({ params }) {
  const userId = params.id;
  return defer({ userData: fetchSingleUser(userId) });
}

function Company() {
  const loaderPromise = useLoaderData();

  function renderCompanyProfile(userData) {
    return (
      <>
        <div className="company-profile-width">
          <div className="company-profile-details">
            <div className="company-profile-img">
              <img src={userData.profileImage} alt="" />
            </div>
            <div className="company-profile-info">
              <h2 className="bold">{userData.companyName}</h2>
              <p className="company-profile-description light">
                {userData.shortDescription}
              </p>
            </div>
          </div>
          <div className="company-profile-locations-section">
           
            <Box sx={{display: "flex", gap: "0.5em", padding: "1em 0em" }}>
                <LocationCity sx={{ color: "#4cae9b" }} />
              <div className="job-location medium">{userData.location}</div>
            </Box>
            <div>
              <h3 className="medium">Sectors</h3>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                {userData.organisationType.map((skill) => (
                  <Chip
                    key={skill}
                    label={skill}
                    sx={{ backgroundColor: "#9fe4d636" }}
                  />
                ))}
              </Box>
            </div>
          </div>
          <div className="company-profile-description-section">
            <h3 className="medium">About Us</h3>
            <p className="company-profile-description-text light">
              {userData.longDescription}
            </p>
          </div>
          <div className="company-profile-description-section">
            <h3 className="medium">Projects</h3>
            <div className="projects">
                {userData.projects.map((project, index) => {
                    return <div key={index}>
                        <h4>{project.title}</h4>
                        <p>{project.description}</p>
                        <a href={project.link}>{project.link && 'Link'}</a>
                    </div>
                })}
            </div>
          </div>
          <div className="company-profile-description-section">
            <h3 className="medium">Other activities</h3>
            <div className="projects">
                {userData.activities.map((activity, index) => {
                    return <div key={index}>
                        <h4>{activity.title}</h4>
                        <p>{activity.description}</p>
                    </div>
                })}
            </div>
          </div>
        </div>
          <div className="company-recommendations-list">
            <h3>Similar Companies</h3>
                <CompanyRecommendations organisationType={userData.organisationType} companyId={userData._id}/>
          </div>
      </>
    );
  }

  const pathname = useLocation;
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <div className="company-profile-container">
        <Suspense fallback={<Spinner />}>
          <Await resolve={loaderPromise.userData} errorElement={<Error />}>
            {renderCompanyProfile}
          </Await>
        </Suspense>
      </div>
    </>
  );
}

export default Company;
