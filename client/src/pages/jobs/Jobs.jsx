import React, { Suspense, useEffect, useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Slider,
  FormControlLabel,
  Checkbox,
  FormGroup,
  Button,
  CircularProgress,
} from "@mui/material";
import "./Jobs.css";
import JobCard from "../../components/jobCard/JobCard";
import {
  Await,
  Link,
  defer,
  useLoaderData,
  useOutletContext,
} from "react-router-dom";
import { Search, ViewModule } from "@mui/icons-material";
import JobDetailedCard from "../../components/jobDetailedCard/JobDetailedCard";
import { getSearchResult } from "../../utils";
import Spinner from "../../components/Spinner/Spinner";

export function loader() {
  return defer({ jobsList: getSearchResult() });
}

function Jobs() {
  const loaderPromise = useLoaderData();
  const [searchCredentials, setSearchCredentials] = useOutletContext();
  const [jobsList, setJobsList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [emptyRecords, setEmptyRecords] = useState(false);

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      const result = await getSearchResult(searchCredentials);
      setJobsList(result.jobs);
      if (result.jobs.length === 0) {
        setEmptyRecords(true);
      } else {
        setEmptyRecords(false);
      }
      setLoading(false);
    };
    fetchResults();
  }, [searchCredentials]);

  const [filters, setFilters] = useState({
    hourlyRate: {
      min: 5,
      max: 20,
    },
    experience: {
      Entry: false,
      Intermediate: false,
      Expert: false,
    },
    fixedPrice: {
      min: 100,
      max: 500,
    },
    jobType: {
      "Full Time": false,
      Contract: false,
      "Part Time": false,
      "Paid Fellowship": false,
      Internship: false,
      Volunteer: false,
    },
    includeHourlyRateFilter: false,
    includeFixedPriceFilter: false
  });


  const [toggleView, setToggleView] = useState(true);

  const handleViewChange = () => {
    setToggleView(!toggleView);
  };

  const handleFilterResults = (event) => {
    setSearchCredentials((prevCredentials) => ({
      ...prevCredentials,
      jobFilters: filters,
    }));
  };

  const handleIncldeHourlyRateFilterChange  = (event) => {
    setFilters(prevFilters => (
      {
        ...prevFilters,
        includeHourlyRateFilter: event.target.checked
      }
    ))
  }

  const handleIncldeFixedPriceFilterChange  = (event) => {
    setFilters(prevFilters => (
      {
        ...prevFilters,
        includeFixedPriceFilter: event.target.checked
      }
    ))
  }

  const handleJobTypeChange = (event) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      jobType: {
        ...prevFilters.jobType,
        [event.target.name]: event.target.checked,
      },
    }));
  };

  const handleExperienceLevelChange = (event) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      experience: {
        ...prevFilters.experience,
        [event.target.name]: event.target.checked,
      },
    }));
  };

  const handleFixedPriceChange = (event, newValue) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      fixedPrice: {
        min: newValue[0],
        max: newValue[1],
      },
    }));
  };

  const handleHourlyRateChange = (event, newValue) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      hourlyRate: {
        min: newValue[0],
        max: newValue[1],
      },
    }));
  };

  function renderJobsList() {
    return (
      <>
        <div className="utilities">
          <div className="advanced-search">
            <Search className="icon" />
            <div>29 results found.</div>
          </div>
          <div className="change-view">
            <ViewModule className="icon" />
            <div>
              <button onClick={handleViewChange}>View</button>
            </div>
          </div>
        </div>
        {!toggleView ? (
          <div className="detailed-view">
            {loading && <Spinner />}
            {jobsList.map((job, index) => {
              return (
                <Link to={`/jobs/${job._id}/${job.author}`} key={`${job._id}`} state={{job: job}}>
                  <JobDetailedCard job={job} />
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="summary-view">
            {jobsList.map((job, index) => {
              console.log(job._id)
              return (
                <Link  to={`/jobs/${job._id}/${job.author}`} key={`${job._id}`}  state={{job: job}}>
                  <JobCard job={job} />
                </Link>
              );
            })}
          </div>
        )}
        {emptyRecords && <h2>No records found.</h2>}
      </>
    );
  }

  return (
    <div className="job-container">
      <div className="job-content">
        <div className="left-side">
          <Accordion expanded={true}>
            <AccordionSummary
              aria-controls="panel4a-content"
              id="panel4a-header"
            >
              <Typography variant="subtitle1" className="heading">
                Hourly rate
              </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ flexDirection: "column" }}>
              <Slider
                value={[filters.hourlyRate.min, filters.hourlyRate.max]}
                onChange={handleHourlyRateChange}
                aria-labelledby="range-slider"
                getAriaValueText={(value) => `${value}$`}
                valueLabelDisplay="auto"
                min={0}
                max={100}
                step={1}
                sx={{ width: "90%", color: "#4cae9b" }}
                marks={[
                  { value: 0, label: "$0" },
                  { value: 20, label: "$20" },
                  { value: 40, label: "$40" },
                  { value: 60, label: "$60" },
                  { value: 80, label: "$80" },
                  { value: 100, label: "$100" },
                ]}
              />
            </AccordionDetails>
            <FormControlLabel
                  control={
                    <Checkbox
                      checked={filters.includeHourlyRateFilter}
                      name="includeHourlyRateFilter"
                      onChange={handleIncldeHourlyRateFilterChange}
                    />
                  }
                  label="Include hourly rate"
                />
          </Accordion>
          <Accordion expanded={true}>
            <AccordionSummary
              aria-controls="panel7a-content"
              id="panel7a-header"
            >
              <Typography variant="subtitle1" className="heading">
                Fixed Price
              </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ flexDirection: "column" }}>
              <Slider
                value={[filters.fixedPrice.min, filters.fixedPrice.max]}
                onChange={handleFixedPriceChange}
                valueLabelDisplay="auto"
                aria-labelledby="range-slider"
                getAriaValueText={(value) => `${value}$`}
                min={0}
                max={1000}
                step={10}
                sx={{ width: "90%", color: "#4cae9b" }} 
                marks={[
                  { value: 0, label: "$0" },
                  { value: 250, label: "$250" },
                  { value: 500, label: "$500" },
                  { value: 750, label: "$750" },
                  { value: 1000, label: "$1000+" },
                ]}
              />
            </AccordionDetails>
            <FormControlLabel
                  control={
                    <Checkbox
                      checked={filters.includeFixedPriceFilter}
                      name="includeHourlyRateFilter"
                      onChange={handleIncldeFixedPriceFilterChange}
                    />
                  }
                  label="Include fixed price"
                />
          </Accordion>
          <Accordion expanded={true}>
            <AccordionSummary
              aria-controls="panel5a-content"
              id="panel5a-header"
            >
              <Typography variant="subtitle1" className="heading">
                Experience Level
              </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ flexDirection: "column" }}>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={filters.experience["Entry"]}
                      name="Entry"
                      onChange={handleExperienceLevelChange}
                    />
                  }
                  label="Entry"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={filters.experience["Intermediate"]}
                      name="Intermediate"
                      onChange={handleExperienceLevelChange}
                    />
                  }
                  label="Intermediate"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={filters.experience["Expert"]}
                      name="Expert"
                      onChange={handleExperienceLevelChange}
                    />
                  }
                  label="Expert"
                />
              </FormGroup>
            </AccordionDetails>
          </Accordion>
          <Accordion expanded={true}>
            <AccordionSummary
              aria-controls="panel5a-content"
              id="panel5a-header"
            >
              <Typography variant="subtitle1" className="heading">
                Job Type
              </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ flexDirection: "column" }}>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={filters.jobType["contract"]}
                      name="Contract"
                      onChange={handleJobTypeChange}
                    />
                  }
                  label="Contract"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={filters.jobType["Full time"]}
                      name="Full Time"
                      onChange={handleJobTypeChange}
                    />
                  }
                  label="Full time"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={filters.jobType["part time"]}
                      name="Part Time"
                      onChange={handleJobTypeChange}
                    />
                  }
                  label="Part time"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={filters.jobType["paid fellowship"]}
                      name="Paid Fellowship"
                      onChange={handleJobTypeChange}
                    />
                  }
                  label="Paid fellowship"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={filters.jobType["internship"]}
                      name="Internship"
                      onChange={handleJobTypeChange}
                    />
                  }
                  label="Internship"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={filters.jobType["volunteer"]}
                      name="Volunteer"
                      onChange={handleJobTypeChange}
                    />
                  }
                  label="Volunteer"
                />
              </FormGroup>
            </AccordionDetails>
          </Accordion>
          <div>
            <Button
              variant="contained"
              sx={{
                marginTop: "1em",
                backgroundColor: "#4cae9b",
                "&:hover": { backgroundColor: "#4cae9b" },
              }}
              onClick={handleFilterResults}
            >
              {
                loading ? <CircularProgress size={30}  sx={{color: "White"}}/> : "FILTER"
              }
            </Button>
          </div>
        </div>
        <div className="right-side">
          <Suspense fallback={<Spinner />}>
            <Await resolve={loaderPromise.jobsList}>{renderJobsList}</Await>
          </Suspense>
        </div>
      </div>
    </div>
  );
}

export default Jobs;
