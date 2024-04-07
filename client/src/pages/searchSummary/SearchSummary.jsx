import React, { Suspense } from "react";
import { Await, Link, defer, useLoaderData, useLocation } from "react-router-dom";
import { getSearchSummary } from "../../utils";
import Spinner from "../../components/Spinner/Spinner";
import "./SearchSummary.css"
import CompanyCard from "../../components/companyCard/CompanyCard";
import ProfessionalCard from "../../components/professionalCard/ProfessionalCard";

export function loader({request}) {
  const searchParams = new URL(request.url).searchParams;
  const query = searchParams.get("query");
  const location = searchParams.get("location");
  return defer({ searchResults: getSearchSummary(query, location) });
}

export default function SearchSummary() {
  const loaderPromise = useLoaderData();

  function renderPage(searchResults) {
    const location = useLocation()

    if(searchResults.message){
      return <div>No internet connection</div>
    }
    return (
      <>
        <div className="projects-summary">
          <div className="section-heading">Projects</div>
            {
              searchResults.projectsList.map((project, index) => {
                return (
                  <div key={index} className="projectCard">
                    <div className="project-title">{project.title}</div>
                    <div className="project-description">{project.description}</div>
                    <div className="project-link">
                      <a href={project.link}>Link</a>
                    </div>
                  </div>
                )
              })
            }
            {
              searchResults.projectsList.length === 0 ? "No projects found!" : (null)
            }
        </div>
        <div className="companies-summary">
            <div className="section-heading">Climate Tech</div>
            {
              searchResults.companiesList.map((company, index) => {
               return (
                <Link key={index} to={`/companies/${company._id}`}>
                <CompanyCard company={company}/>
                </Link>
               )
              })
            }  
               {
                searchResults.companiesList.length === 0 ? "No Companies found!" : (null)
              }
            
        </div>
        <div className="professionals-summary">
        <div className="section-heading">Green Giggers</div>
              {
                searchResults.professionalsList.map((professional, index) => {
                  return (
                    <Link key={index} to={`/professionals/${professional._id}`} className="professionals-link">
                      <ProfessionalCard professional={professional}/>
                    </Link>
                  )
                })
              }
              {
                searchResults.professionalsList.length === 0 ? "No professionals found!" : (null)
              }
        </div>
      </>
    );
  }
  return (
    <>
    <div className="more-results">
      <Link to={"/search-all/projects"} state={{location:  new URLSearchParams(location.search).get('location'), jobType:  new URLSearchParams(location.search).get('query')}}>
      More results
      </Link>
    </div>
    <div className="search-summary-container">
      <Suspense fallback={<Spinner classes={"center"}/>}>
        <Await resolve={loaderPromise.searchResults} errorElement={<Error />}>{renderPage}</Await>
      </Suspense>
    </div>
    </>
  );
}
