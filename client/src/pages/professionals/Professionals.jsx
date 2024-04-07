import React, { Suspense, useEffect, useState } from "react";
import { Await, useOutletContext } from "react-router-dom";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Slider,
  FormControlLabel,
  Checkbox,
  FormGroup,
  Button
} from "@mui/material";
import ProfessionalCard from "../../components/professionalCard/ProfessionalCard";
import { Link, defer, useLoaderData } from "react-router-dom";
import "./Professionals.css";
import { getSearchResult } from "../../utils";
import Spinner from "../../components/Spinner/Spinner";
import Error from "../../components/Error/Error";

export async function loader() {
  return defer({ searchResult: getSearchResult() });
}

function Professionals() {
  const [searchCredentials, setSearchCredentials] = useOutletContext();
  const loaderPromise = useLoaderData();
  const [profiles, setProfiles] = useState([]);
  const [emptyRecords, setEmptyRecords] = useState(false);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    hourlyRate: { min: 5, max: 20 },
    experience: {
      "Entry": false,
      "Intermediate": false,
      "Expert": false,
    },
    includeHourlyRateFilter: false
  });

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      const result = await getSearchResult(searchCredentials);
      setProfiles(result.professionals);
      if (result.professionals.length === 0) {
        setEmptyRecords(true);
      } else {
        setEmptyRecords(false);
      }
      setLoading(false);
    };
    fetchResults();
  }, [searchCredentials]);



  const handleHourlyRateChange = (event, newValue) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      hourlyRate: { min: newValue[0], max: newValue[1] },
    }));
  };

  const handleExperienceLevelChange = (event) => {
    console.log(event.target.name);
    setFilters(prevFilters => (
      {
        ...prevFilters,
        experience: {
          ...prevFilters.experience,
          [event.target.name]: event.target.checked
        }
      }
    ))
    };

    const handleIncldeHourlyRateFilterChange  = (event) => {
      setFilters(prevFilters => (
        {
          ...prevFilters,
          includeHourlyRateFilter: event.target.checked
        }
      ))
    }

  const handleFilterResults = (event) => {
    setSearchCredentials(prevCredentials => (
      {
        ...prevCredentials,
        professionalFilters:
        filters
      }
    ))
  }
  


  function renderProfiles(searchResult) {
    return (
      <div className="flex-professionals">
        {loading && <Spinner />}
        {profiles.map((profile, index) => {
          return (
            <Link key={index} to={`/professionals/${profile._id}`}>
              <ProfessionalCard professional={profile} />
            </Link>
          );
        })}
        {emptyRecords && <h2>No records found</h2>}
      </div>
    );
  }


  return (
    <div className="professional-container">
      <div className="professional-content">
        <div className="left-side">
          <Accordion expanded={true} sx={{ backgroundColor: "transparent" }}>
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
                onChange={handleHourlyRateChange}
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

          <Accordion expanded={true} sx={{ backgroundColor: "transparent" }}>
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
          <div>
          <Button variant="contained" sx={{backgroundColor: "#4cae9b", "&:hover": {backgroundColor: "#4cae9b"}}} onClick={handleFilterResults}>Filter</Button>
          </div>
        </div>
        <div className="right-side">
          <Suspense fallback={Spinner}>
            <Await
              resolve={loaderPromise.searchResult}
              errorElement={<Error />}
            >
              {renderProfiles}
            </Await>
          </Suspense>
        </div>
      </div>
    </div>
  );
}

export default Professionals;
