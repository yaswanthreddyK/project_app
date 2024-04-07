import React, { useState, useEffect, Suspense } from 'react';
import { makeStyles } from '@mui/styles';
import {
  Avatar,
  Button,
  Card,
  CardContent,
  CardHeader,
  Chip,
  Grid,
  Typography,
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmailIcon from '@mui/icons-material/Email';
import "./Professional.css";
import { Await, defer, useLoaderData, useLocation } from 'react-router-dom';
import ProfessionalRecommendations from '../../components/recommendations/ProfessionalRecommendations';
import { fetchSingleUser } from '../../utils';
import Spinner from '../../components/Spinner/Spinner';

const useStyles = makeStyles({
  root: {
    padding: '16px',
    width: "100%",
    "@media (max-width: 450px)" : {
      padding: 0,
    }
  },
  avatar: {
    width: '80px',
    height: '80px',
  },

  aboutMeSection: {
    display: 'flex',
    flexDirection: 'column',
  },
  skillsSection: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px',
    marginTop: '8px',
  },
  skillChip: {
    marginRight: '8px',
  },
  sectionHeader: {
    marginTop: '16px',
  },
});

export function loader({params}){
  const userId = params.id
  return defer({userData: fetchSingleUser(userId)})
}

const Professional = () => {
  const classes = useStyles();
  const loaderPromise = useLoaderData()
  const profile = {
    name: 'John Doe',
    title: 'Full Stack Developer',
    location: 'New York, USA',
    email: 'yaswanthreddy1729@gmail.com',
    phone: '+1234567890',
    aboutMe:
      'As a full stack developer, I bring a diverse skill set and a passion for creating robust, user-friendly web applications. With experience in both front-end and back-end development, I excel at translating client requirements into seamless, responsive designs. My expertise spans across a range of technologies including JavaScript frameworks like React.js and Angular, as well as server-side languages like Node.js and Python. I am adept at database management using MongoDB, MySQL, and PostgreSQL, and have experience working with RESTful APIs and GraphQL. I thrive in collaborative environments, where I leverage my problem-solving skills to deliver innovative solutions that meet and exceed client expectations.',
    skills: ['React', 'Node.js', 'JavaScript', 'HTML', 'CSS', 'Stripe', 'Socket.io'],
    portfolioProjects: [
      { title: 'E-commerce Website', description: 'Developed an e-commerce website using MERN stack (MongoDB, Express.js, React.js, Node.js). Implemented user authentication, product listing, shopping cart functionality, and payment integration using Stripe.', images: ['../../../img/ecommerce1.jpeg', '../../../img/ecommerce2.jpeg', '../../../img/ecommerce3.jpeg'] },
      { title: 'Social Media Platform', description: 'Created a social media platform from scratch using MEAN stack (MongoDB, Express.js, Angular, Node.js). Implemented features such as user registration, profile management, post creation, like/comment functionality, and real-time notifications using Socket.io.', images: ['../../../img/ecommerce1.jpeg', '../../../img/ecommerce2.jpeg', '../../../img/ecommerce3.jpeg']    },
    ],
    workExperience: [
      { company: 'Google', position: 'Tech Lead', duration: '2020 - 2021' },
      { company: 'Microsoft', position: 'Senior Software Engineer', duration: '2018 - 2020' },
    ],
  };

  
  const [open, setOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const pathname = useLocation()

  const handleOpen = (project) => {
    setSelectedProject(project);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(()=>{
    window.scrollTo(0, 0)
},[pathname])

 function renderUserProfile(userData){
   return (
     <>
    <div className='flex-layout'>
      <div className='profile-container'>

     <Grid item xs={12}  sx={{borderRight: "1px solid #e5e5e5"}} className='profile-card'>
            <Card className={classes.card + " profile-card"} >
              <CardHeader
                avatar={<Avatar alt="Profile Picture" src={userData.profileImage} className={classes.avatar} />}
                title={userData.fullName}
                subheader={userData.jobRole}
                titleTypographyProps={{ variant: 'h6', sx: { fontSize: '1.2rem' } }} 
                subheaderTypographyProps={{ variant: 'body1', sx: { fontSize: '0.9rem' } }}
                />
              <CardContent>
                <Typography variant="subtitle1" gutterBottom>
                  <LocationOnIcon fontSize="small" sx={{color: "#4cae9b", marginRight: "0.3em"}} /> {userData.location}
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                  <EmailIcon fontSize="small" sx={{color: "#4cae9b", marginRight: "0.3em"}}  /> {userData.email}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={12}>
            {/* About Me section */}
            <div className={classes.aboutMeSection}>
              <Typography variant="h5" gutterBottom className='style-heading' sx={{marginTop: "0.5em"}}>
                About Me
              </Typography>
              <Typography variant="body1" paragraph sx={{paddingRight: "1em"}} className='font-Neue-roman'>
                {userData.shortDescription}
              </Typography>
              
            </div>
            {/* Skills section */}
            <div>
              <Typography variant="h5" gutterBottom className='style-heading' sx={{padding: "0.5em 0"}}>
                Skills
              </Typography>
              <div className={classes.skillsSection}>
                {userData.skills.map((skill, index) => (
                  <Chip key={index} label={skill} className={classes.skillChip} sx={{backgroundColor: "#4cae9b", color: "white"}}/>
                ))}
              </div>
            </div>
            {/* Portfolio Projects section */}
            <div>
              <Typography variant="h5"  sx={{margin: "1em 0 0 0"}} className='style-heading'>
                Portfolio Projects
              </Typography>
              {userData.projects.map((project, index) => (
                <Card key={index}>
                  <CardContent>
                    <Typography variant="h6">{project.title}</Typography>
                    <Typography variant="body1"  className='font-Neue-roman'>{project.description}</Typography>
                      <Button onClick={() => handleOpen(project)} sx={{color: "#4cae91", "&:hover": {backgroundColor: ""} }}>View Images</Button>
                  </CardContent>
                </Card>
              ))}
  {selectedProject && (
                  <ImageCarousel open={open} setOpen={setOpen} onClose={handleClose} images={selectedProject.images} />
                )}
            </div>
            <div>
              <Typography variant="h5" gutterBottom className='style-heading' >
                Work Experience
              </Typography>
              {userData.workExperience.map((experience, index) => (
                <Card key={index} className={classes.card}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>{experience.position}</Typography>
                    <Typography variant="subtitle1" className='font-Neue-roman'>{experience.company}</Typography>
                      <Typography variant="body2"  className='font-Neue-roman'>{experience.duration}</Typography>
                  </CardContent>
                </Card>
              ))}
            </div>
        </Grid>
              </div>

        <div className='professional-recommendations-list'>
          <h3>Other Experts</h3>
          <div>
            <ProfessionalRecommendations skills={userData.skills} jobRole={userData.jobRole} professionalId={userData._id}/>
          </div>
        </div>
        </div>
    </>
  )
 }

  return (
    <div className='professional-view-profile'>
      <div className='professional-detailed-view'>
      <Grid container spacing={2} sx={{backgroundColor: "white"}}>
        <Suspense fallback={<Spinner />}>
          <Await resolve={loaderPromise.userData}>
            {renderUserProfile}
          </Await>
        </Suspense>
      </Grid>
</div>
    </div>
  );
};

export default Professional;
