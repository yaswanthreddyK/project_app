import React, { useContext, useState } from 'react';
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
  Link
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmailIcon from '@mui/icons-material/Email';
import "./MyProfile.css"
import UserContext from '../../context/Usercontext';

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
  card: {
    marginBottom: '16px',
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
 
const MyProfileClient = () => {
  const classes = useStyles();

  // Dummy data for the profile
  const {user} = useContext(UserContext) 
  const profile = user
  return (
      <div className='white-background'>
    <div className='professional-view-my-profile'>
      <Grid container spacing={2} sx={{backgroundColor: "white"}}>
        <Grid item xs={12} md={4} sx={{borderRight: "1px solid #e5e5e5", minWidth: "200px"}} className='profile-card'>
          <Card className={classes.card}>
            <CardHeader
              avatar={<Avatar className="profile-image" alt="Profile" src={profile.profileImage} />}
              title={profile.companyName}
              subheader={profile.fullName}
              titleTypographyProps={{ variant: 'h6', sx: { fontSize: '1.2rem' } }} 
                subheaderTypographyProps={{ variant: 'body1', sx: { fontSize: '1rem' } }}
            />
            <CardContent>
              <Typography variant="subtitle1" gutterBottom>
                <LocationOnIcon fontSize="small" sx={{color: "#4cae9b", marginRight: "0.3em"}} /> {profile.location}
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                <EmailIcon fontSize="small" sx={{color: "#4cae9b", marginRight: "0.3em"}}  /> {profile.email}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={8}>
          {/* About Me section */}
          <div className={classes.aboutMeSection}>
            <Typography variant="h5" gutterBottom className='style-heading' sx={{marginTop: "0.5em"}}>
              About Us
            </Typography>
            <Typography variant="body1" paragraph sx={{paddingRight: "1em"}} className='font-Neue-roman'>
              {profile.shortDescription}
            </Typography>
            
          </div>
          <div className={classes.aboutMeSection}>
            <Typography variant="h5" gutterBottom className='style-heading' sx={{marginTop: "0.5em"}}>
              Description
            </Typography>
            <Typography variant="body1" paragraph sx={{paddingRight: "1em"}} className='font-Neue-roman'>
              {profile.longDescription}
            </Typography>
        
          </div>

          {/* Portfolio Projects section */}
          <div>
            <Typography variant="h5"  sx={{margin: "1em 0 0 0"}} className='style-heading'>
              Projects
            </Typography>
            {profile.projects.map((project, index) => (
              <Card key={index}>
                <CardContent>
                  <Typography variant="h6">{project.title}</Typography>
                  <Typography variant="body1"  className='font-Neue-roman'>{project.description}</Typography>
                  <Link href={`https://`+project.link} target='_blank' sx={{color: '#4cae9b'}}>
                    Link
                  </Link>
                </CardContent>
              </Card>
            ))}

          </div>
          {/* Work Experience section */}
          <div>
            <Typography variant="h5" gutterBottom className='style-heading'>
              Other Activities
            </Typography>
            {profile.activities.map((activity, index) => (
              <Card key={index} className={classes.card}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>{activity.title}</Typography>
                  <Typography variant="subtitle1" className='font-Neue-roman'>{activity.description}</Typography>
                    <Typography variant="body2"  className='font-Neue-roman'>{activity.startDate?.split('T')[0]}</Typography>
                    <Typography variant=""  className='font-Neue-roman'>
          
                    </Typography>
                </CardContent>
              </Card>
            ))}
          </div>
        </Grid>
      </Grid>
</div>
    </div>
  );
};

export default MyProfileClient;
