import React, { useContext, useState } from "react";
import Footer from "../../components/footer/Footer";
import "./Home.css";
import SearchInput from "../../components/searchInput/SearchInput";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../../context/Usercontext.js";

function Home() {
  const {user} = useContext(UserContext)
  const [searchParams, setSearchParams] = useState({jobType: "", location: ""})
  const navigate = useNavigate()
  function handleJobTypeChange(event){
    setSearchParams(prev => {
      return {
        ...prev,
        jobType: event.target.value
      }
    })
  }

  function handleLocationChange(event){
    setSearchParams(prev => {
      return {
        ...prev,
        location: event.target.value
      }
    })
  }

  function handleSearch(event){
    navigate(`/searchSummary?query=${searchParams.jobType}&location=${searchParams.location}`)
  }

  return (
    <main>
      <div className="home-1">
        <div className="hero">
          <div className="hero-content">
            <h2 className="green">Embed Sustainability into your business </h2>
            <p>
              Engage climate technologies, professionals and use cases data at
              scale
            </p>
          </div>
        </div>
        <div className="search">
          <div className="search-div">
            <SearchInput
              labels={{
                label1:
                  "Search by Industry/LOB use case, project, skill or climate technology",
                label2: "",
              }}
             handleJobTypeChange={handleJobTypeChange}
             handleLocationChange={handleLocationChange}
             handleSearch={handleSearch}
             jobType={searchParams.jobType}
             location={searchParams.location}
            />
            <div className="new-feature">
              <span className="new">New:</span><span>Generate your own sustainability project
              template</span>
            </div>
          </div>
        </div>
      </div>

      <div className="homecoming">
        <div className="sentence">
          Build Projects, engage Skills and Climate tech adoption to supercharge
          your sustainability transformation
        </div>
        <div>
          {[
            "Sales",
            "Software Engineering",
            "Marketing",
            "Data Analyst",
            "Design",
            "Finance",
            "Operations",
          ].map((tag, index) => {
            return <button className="btn-tags" key={index}>{tag}</button>;
          })}
        </div>
      </div>
      <div className="explore">
        <div className="explore-heading">
          Explore Projects and Use cases by climate sectors{" "}
        </div>
        <div className="explore-style">

        <div className="explore-services">
          <div>
            <Link to="/search-all/projects">Projects</Link>
          </div>
          <div>
            <Link to="/search-all/companies">Climate Technologies</Link>
          </div>
          <div>
            <Link to="/search-all/professionals">Green Giggers</Link>
          </div>
        </div>
        <div className="explore-link">
          <Link to="/">Connect with EcoFit Consulting</Link>
        </div>
        </div>
      </div>
      <div className="sector">
        <div className="sector-grid">
          <div className="grid-box">
            <div className="grid-img">
              <img src="../../../img/agriculture.jpg" alt="" loading="lazy" />
            </div>
            <div className="grid-title">Agriculture and Food Supply</div>
          </div>
          <div className="grid-box">
            <div className="grid-img">
              <img src="../../../img/air-quality.jpg" alt="" loading="lazy" />
            </div>
            <div className="grid-title">Air Quality</div>
          </div>
          <div className="grid-box">
            <div className="grid-img">
              <img src="../../../img/coasts.jpg" alt="" loading="lazy" />
            </div>
            <div className="grid-title">Coasts</div>
          </div>
          <div className="grid-box">
            <div className="grid-img">
              <img src="../../../img/ecosystem.jpg" alt="" loading="lazy" />
            </div>
            <div className="grid-title">Ecosystems</div>
          </div>
          <div className="grid-box">
            <div className="grid-img">
              <img src="../../../img/energy.jpg" alt="" loading="lazy" />
            </div>
            <div className="grid-title">Energy</div>
          </div>
          <div className="grid-box">
            <div className="grid-img">
              <img src="../../../img/forests.jpg" alt="" loading="lazy" />
            </div>
            <div className="grid-title">Forests</div>
          </div>
          <div className="grid-box">
            <div className="grid-img">
              <img src="../../../img/freshwater.jpg" alt="" loading="lazy" />
            </div>
            <div className="grid-title">Freshwater Resources</div>
          </div>
          <div className="grid-box">
            <div className="grid-img">
              <img src="../../../img/greencity.jpg" alt="" loading="lazy" />
            </div>
            <div className="grid-title">Green Industrial Cities</div>
          </div>
          <div className="grid-box">
            <div className="grid-img">
              <img src="../../../img/health.jpg" alt="" loading="lazy" />
            </div>
            <div className="grid-title">Health</div>
          </div>
          <div className="grid-box">
            <div className="grid-img">
              <img src="../../../img/mobility.jpg" alt="" loading="lazy" />
            </div>
            <div className="grid-title">Mobility</div>
          </div>
          <div className="grid-box">
            <div className="grid-img">
              <img
                src="../../../img/oceanresources.jpg"
                alt=""
                loading="lazy"
              />
            </div>
            <div className="grid-title">Ocean and Marine Resources</div>
          </div>
          <div className="grid-box">
            <div className="grid-img">
              <img src="../../../img/waste.jpg" alt="" loading="lazy" />
            </div>
            <div className="grid-title">Waste</div>
          </div>
        </div>
      </div>

      <div className="discover">
        <div className="discover-card">
          <div>
            Engage with our Priority Climate Tech Partners for EcoOffers
          </div>
          <p>
            Explore Private and Platform exclusive climate tech offers and
            complimentary consulting for your business.{" "}
          </p>
        </div>
        <div className="company-cards">
          <Link>
            <div className="company-card">
              <div>
                <img src="../../../img/company1.png" alt="" />
              </div>
              <div className="company-name">Atoms</div>
              <div className="company-description">
                We transform your bank deposits into low-cost loans for solar
                and electrification. High-yields, easy to use apps, 100%
                climate-positive impact — modern banking as it should.
              </div>
            </div>
          </Link>
          <Link>
            <div className="company-card">
              <div>
                <img src="../../../img/company1.png" alt="" />
              </div>
              <div className="company-name">Atoms</div>
              <div className="company-description">
                We transform your bank deposits into low-cost loans for solar
                and electrification. High-yields, easy to use apps, 100%
                climate-positive impact — modern banking as it should.
              </div>
            </div>
          </Link>
          <Link>
            <div className="company-card">
              <div>
                <img src="../../../img/company1.png" alt="" />
              </div>
              <div className="company-name">Atoms</div>
              <div className="company-description">
                We transform your bank deposits into low-cost loans for solar
                and electrification. High-yields, easy to use apps, 100%
                climate-positive impact — modern banking as it should.
              </div>
            </div>
          </Link>
        </div>
      </div>

      <div className="browse">
        <div className="browse-companies">
          <div className="heading">Browse Climate Tech by Categories</div>
          <div className="list">
            {[
              "Agrigulture and Food supply",
              "Energy",
              "Forests",
              "Ecosystem",
              "Air Quality",
              "Coastst",
              "Ecosystems",
              "Green Industrial Cities",
              "Health",
              "Mobility",
              "Ocean and Marine Resources",
              "Waste",
            ].map((tag, index) => {
              return <div key={index} className="tag">{tag}</div>;
            })}
          </div>
        </div>
        <div className="skills">
          <div className="heading">Browse Green Giggers by Skill Sets</div>
          <div className="list">
            {[
              "Data Analysis",
              "Policy and Advocacy",
              "Networking",
              "System Engineer",
              "Architect",
              "Manager",
              "Finance",
              "Development",
              "Consulting",
              "Services",
              "Touring",
              "Recycling",
            ].map((tag, index) => {
              return <div key={index} className="tag">{tag}</div>;
            })}
          </div>
        </div>
      </div>

      <div className="join">
        <div className="join-heading">
          Join our EcoAI driven ClimaChampion platform for discovering your
          industry use cases, build climate tech partnerships and connect with
          sustainability professionals.
        </div>

      <div className="boxes">
        <div className="box">
          <div className="box-heading">Connect with your customers</div>
          <p className="box-description">
            Create your Climate Tech Profile and share private platform only
            offers with your target customers within a few minutes
          </p>
          {
            !user ? 
            <button className="login-btn">
            <Link to="/login">
            Create your profile
            </Link>
            </button>
            : 
            null
          }
         
        </div>
        <div className="box">
        <div className="box-heading">Register your Organisation for supercharging sustainability transformation</div>
          <p className="box-description">
          Leverage our EcoAI engine to research use cases relevant to your business/Industry/LOB and build your own project with details on climate techs, skilled professionals and monetisation possibilities. 
          </p>
          {
            !user ?
            <button className="login-btn">
          <Link to="/login">
            Login
            </Link>
          </button>
          :
          null
          }
          
        </div>
      </div>
      </div>
      <Footer />
    </main>
  );
}

export default Home;
