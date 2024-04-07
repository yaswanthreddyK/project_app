import React, { Suspense, useEffect, useState } from "react";
import SearchInput from "../../components/searchInput/SearchInput";
import {
    Await,
  NavLink,
  Outlet,
  defer,
  useLoaderData,
  useLocation,
  useNavigate,
} from "react-router-dom";
import "./SearchAll.css";
import { getUser } from "../../utils";
import Error from "../../components/Error/Error";
import Spinner from "../../components/Spinner/Spinner";

export async function loader() {
  return defer({ userData: getUser() });
}

function SearchAll() {
  const userPromise = useLoaderData();
  const Location = useLocation();
  const navigate = useNavigate();
  const [jobType, setJobType] = useState("");
  const [location, setLocation] = useState("");
  const [searchCredentials, setSearchCredentials] = useState({jobType, location})
  const handleJobTypeChange = (event) => {
    setJobType(event.target.value);
  };

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };

  const handleSearch = () => { 
    setSearchCredentials({jobType, location})
  };

  useEffect(()=>{
    if(Location.state?.jobType){
      setSearchCredentials(prev =>({
        ...prev,
        jobType: Location.state.jobType
      }))
    }
    if(Location.state?.location){
      setSearchCredentials(prev => ({
        ...prev,
        location: Location.state.location
      }))
    }
  },[])

  function renderPages(userData) {
    if (userData === null) {
      navigate("/login", { state: { redirectUrl: `${Location.pathname}` } });
    }
    return <Outlet context={[searchCredentials, setSearchCredentials]}/>
  }

  const searchProps = {
    jobType,
    location,
    handleJobTypeChange,
    handleLocationChange,
    handleSearch
  }


  return (
    <div className="search-all-container">
      <div>
        <div>
          <div className="search-form">
            <SearchInput {...searchProps}/>
          </div>
        </div>
        <div className="search-all-content">
          <div className="search-nav">
            <ul>
             
              <li>
                <NavLink
                  to="projects"
                  className={({ isActive }) => (isActive ? "isactive" : "")}
                >
                  Projects
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="companies"
                  className={({ isActive }) => (isActive ? "isactive" : "")}
                >
                  Climate Tech
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="professionals"
                  className={({ isActive }) => (isActive ? "isactive" : "")}
                >
                  Green Giggers
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="jobs"
                  className={({ isActive }) => (isActive ? "isactive" : "")}
                >
                  Jobs
                </NavLink>
              </li>
            </ul>
          </div>
          <div className="outlet-container">
            <Suspense fallback={<Spinner />}>
              <Await resolve={userPromise.userData} errorElement={<Error />}>
                {renderPages}
              </Await>
            </Suspense>
            
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchAll;
