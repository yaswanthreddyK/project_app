import React from 'react';
import { Card, CardContent, CardMedia, Typography, Grid, Chip } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import "./CompanyCard.css"

function CompanyCard({ company }) {
  return (
    <div className='company-card-container'>

    <Card sx={{ display: 'flex', padding:"1em",width: "100%", flexDirection: "column"}}>
      {/* Left side: Image */}
      <CardMedia
        component="img"
        sx={{ width: 70, height: 70, objectFit: 'cover' ,marginTop: "1.5em"}} // Adjust image size as needed
        image={company.profileImage}
        alt={company.companyName}
      />
      {/* Right side: Name, Location, Tags */}
      <CardContent sx={{ flex: '1 0 auto', border:"0" }}>
        <Typography variant="h6" component="div" gutterBottom>
          {company.companyName}
        </Typography>
        <Grid container spacing={1} alignItems="center">
          <Grid item>
            <LocationOnIcon className='icon'/>
          </Grid>
          <Grid item>
            <Typography variant="body2" color="textSecondary">
              {company.location}
            </Typography>
          </Grid>
        </Grid>
        <Grid container spacing={1}>
          {company.organisationType?.map((tag, index) => (
            <Grid item key={index}>
              <Chip label={tag} sx={{backgroundColor: "#9fe4d636"}}/>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
        </div>
  );
}

export default CompanyCard;
