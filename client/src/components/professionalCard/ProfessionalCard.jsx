import React from 'react';
import {
  Card,
  CardMedia,
  Typography,
  Divider,
  Chip,
  Box
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import "./ProfessionalCard.css"

function ProfessionalCard({ professional }) {
  const { fullName, profileImage, jobRole, hourlyRate, location, skills } = professional;
  
  return (
    <div classfullName='professional-card'>

    <Card sx={{ display: 'flex', flexDirection: 'column', padding: "1em", backgroundColor: "white", margin: "1em", width: "100%"  }}>
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'column' } }}>
        <CardMedia
          component="img"
          sx={{ width: 70, height: 70, borderRadius: '50%', objectFit: 'cover', marginRight: "0.5em"}}
          image={profileImage}
          alt={professional.fullName}
          />
        <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1, ml: { xs: 0, md: 1 } }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <Typography variant="h5">{fullName}</Typography>
              <Typography variant="subtitle1">{jobRole}</Typography>
            </div>
            <Typography variant="subtitle1">{`$${hourlyRate || 5}/hr`}</Typography>
          </Box>
          <Divider sx={{ my: 1 }} />
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {skills.map(skill => (
              <Chip key={skill} label={skill} sx={{color: "#2b2b2b", backgroundColor: "#9fe4d636"}}/>
              ))}
          </Box>
        </Box>
      </Box>
      <Divider sx={{ my: 1 }} />
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: 2, pb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <LocationOnIcon sx={{ mr: 1 , color: "#4cae9b"}} />
          <Typography variant="subtitle2">{location}</Typography>
        </Box>
      </Box>
    </Card>
              </div>
  );
}

export default ProfessionalCard;




