import "./App.css"
import { createBrowserRouter, createRoutesFromElements, Outlet, RouterProvider, Route, useLocation } from "react-router-dom";
import React from "react";
import Navbar from "./components/navbar/Navbar";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import Add from "./pages/add/Add";
import Join from "./pages/join/Join";
import Profile from "./pages/profile/Profile";
import {loader as profileLoader} from "./pages/profile/Profile"
import {loader as searchAllLoader} from "./pages/searchAll/SearchAll"
import {loader as professionalsLoader} from "./pages/professionals/Professionals"
import {loader as companiesLoader} from "./pages/companies/Companies"
import {loader as jobsLoader} from "./pages/jobs/Jobs"
import {loader as formsLoader} from "./pages/Forms/Forms"
import {loader as jobLoader} from "./pages/Job/Job"
import {loader as jobsPostedLoader} from "./pages/jobsPosted/JobsPosted"
import {loader as professionalLoader} from "./pages/professional/Professional"
import {loader as companyLoader} from "./pages/company/Company"
import {loader as applicantsLoader} from "./pages/applications/Applications"
import {loader as proposalLoader} from "./pages/proposals/Proposals"
import {loader as invitesLoader} from "./pages/invites/Invites"
import {loader as dashboardLoader} from "./pages/dashboard/Dashboard"
import {loader as projectsLoader} from './pages/projects/Projects'
import {loader as searchLoader} from "./pages/searchSummary/SearchSummary"
import Gigs from "./pages/gigs/Gigs";
import GigsList from "./pages/gigsList/gigsList";
import EditProfile from "./pages/editProfile/editProfile";
import Jobs from "./pages/jobs/Jobs";
import Professionals from "./pages/professionals/Professionals";
import Companies from "./pages/companies/Companies";
import Professional from "./pages/professional/Professional";
import Job from "./pages/Job/Job";
import Dashboard from "./pages/dashboard/Dashboard";
import Applications from "./pages/applications/Applications";
import JobsPosted from "./pages/jobsPosted/JobsPosted";
import MyProfile from "./pages/myProfile/MyProfile";
import Settings from "./pages/settings/Settings"
import Company from "./pages/company/Company";
import FAQ from "./pages/faq/FAQ";
import PageNotFound from "./pages/pageNotFound/PageNotFound";
import Proposals from "./pages/proposals/Proposals";
import Invites from "./pages/invites/Invites";
import SearchAll from "./pages/searchAll/SearchAll";
import Messages from "./pages/messages/Messages";
import Projects from "./pages/projects/Projects";
import Spinner from "./components/Spinner/Spinner";
import NewJob from "./pages/newJob/NewJob";
import Forms from "./pages/Forms/Forms";
import NewContract from "./pages/newContract/NewContract";
import Error from "./components/Error/Error";
import Banner from "./components/banner/Banner";
import Payments from "./pages/payments/Payments";
import SearchSummary from "./pages/searchSummary/SearchSummary";


function App() {

  const Layout = () => {
    const location = useLocation()
    const showNavBar = !['/login', '/signup'].includes(location.pathname)
    const showBanner = ['/'].includes(location.pathname)

    return (
      <div className="app">
        {showBanner && <Banner />}
        {showNavBar && <Navbar />}
       <Outlet /> 
      </div>
    );
  };

  

  const router = createBrowserRouter(createRoutesFromElements(

    
    <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup"   element={<Signup />}/>
          <Route path="/searchSummary" loader={searchLoader} element={<SearchSummary />}/>
          <Route path="/search-all" loader={searchAllLoader}  element={<SearchAll />}>
          <Route path="jobs" loader={jobsLoader} element={<Jobs />} />
          <Route path="professionals" loader={professionalsLoader} element={<Professionals />} />
          <Route path="companies" loader={companiesLoader} element={<Companies />} />
          <Route path="projects" loader={projectsLoader} element={<Projects />} />
          </Route>
          <Route path="jobs/:id/:companyId" loader={jobLoader}  element={<Job />} />
          <Route path="professionals/:id" loader={professionalLoader} element={<Professional />} errorElement={<Error />}/>
          <Route path="/companies/:id" loader={companyLoader} element={<Company />} />
          <Route path="/add" element={<Add />} />
          <Route path="/join" element={<Join />} />
          <Route path="/profile" exact  loader={profileLoader}  element={<Profile />}> 
              <Route index  element={<MyProfile />}/>
              <Route path="dashboard" loader={dashboardLoader} element={<Dashboard />} />
              <Route path="applications" loader={applicantsLoader} element={<Applications />}/>
              <Route path="posted-jobs" loader={jobsPostedLoader} element={<JobsPosted />}/>
              <Route path="settings" element={<Settings />}/>
              <Route path="proposals" loader={proposalLoader} element={<Proposals />}/>
              <Route path="invites" loader={invitesLoader} element={<Invites />}/>
              <Route path="messages" element={<Messages />}/>
              <Route path="payments" element={<Payments />}/>
          </Route>
          <Route path="/forms" loader={formsLoader} element={<Forms />}>
          <Route path="newJob"  element={<NewJob />}/>
          <Route path="newContract" errorElement={<></>} element={<NewContract />}/>
          </Route>
          <Route path="/gigs" element={<Gigs />} />
          <Route path="/gigsList" element={<GigsList />} />
          <Route path="/edit" element={<EditProfile />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>
        

))
  return <RouterProvider router={router} fallbackElement={<Spinner />}/>;
}

export default App;
