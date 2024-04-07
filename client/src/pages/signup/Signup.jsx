import React, { useEffect, useState } from 'react';
import {
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
  Box,
  Typography,
  Container,
  IconButton,
  InputAdornment,
  CircularProgress,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import './Signup.css';
import {useLocation, useNavigate } from 'react-router-dom';


  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  const defaultTheme = createTheme();


  export default function Signup() {
    const [errorMessage, setErrorMessage] = useState("")
    const [termsNconditions, setTermsNconditions] = useState(false)
    const [showPassword, setShowPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isCompany, setIsCompany] = useState(false)
    const location = useLocation()
    const navigate = useNavigate()
    useEffect(()=>{
      if(!location.state?.activeTab){
        navigate("/join")
     }
      if(location.state?.activeTab === 1){
        setIsCompany(true)
      }else{
        setIsCompany(false)
      }
     
    })

    const handleFormSubmit = async (event) => {
      setIsSubmitting(true)
      event.preventDefault();
      setErrorMessage("")
      const data = new FormData(event.currentTarget);
      const email = data.get("email").trim()
      const password = data.get("password")
      const confirmPassword = data.get('confirmPassword')
      
      try {
        if(!email || !password || !confirmPassword){   
          throw new Error("All mandatory fields are required!")
        }
        const validEmail = validateEmail(email)
        if(!validEmail) {
          throw new Error("Invalid email address!")
        }
    
        if(password !== confirmPassword){
          throw new Error("Both passwords should match!") 
        }
        
        if(!termsNconditions){
          throw new Error('Accept Terms & Conditions')
        }

        fetch("http://localhost:8800/api/signup",
        { 
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email,
            password,
            isCompany
          }),
          credentials: 'include'
        })
        .then(res => res.json())
        .then(data => {
        setIsSubmitting(false)
          if(!data.success){
            setErrorMessage(data.message)
          }else{
            setErrorMessage("")
            navigate("/login")
          }
        })

        

      } catch (error) {
        setErrorMessage(error.message)
        setIsSubmitting(false)
      }
    }


    const handleClickShowPassword = () => {
      setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };

    return (
      <div className='login-container'>
        <div className="text-container">
          <div className='text-heading'>
            <h4>Create a free account today</h4>
            
            <div className='text-caption'>Create your account to continue and explore new jobs.</div>
          </div>
          <Typography variant="body1" >
            
          </Typography>
            <div className='stats'>
              <div className='stat-1'>
              <div className='new-jobs-count'>295</div>
              <div className='type'>New jobs posted today</div>
              </div>
              <div className='stat-2'>
              <div className='new-companies-count'>14</div>
              <div className='type'>New companies registered</div>
              </div>
            </div>
        </div>
        <div className="form-container">
          <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
              <CssBaseline />
              
              <Box
                sx={{
                  marginTop: 8,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <span className='error-message'>{errorMessage}</span>
              
                <Box component="form" onSubmit={handleFormSubmit} noValidate sx={{ mt: 1 }}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    type='email'
                    label="E-mail"
                    name="email"
                    autoComplete="email"
                    autoFocus
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    autoComplete="current-password"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="confirmPassword"
                    label="Confirm Password"
                    type={showPassword ? 'text' : 'password'}
                    id="confirmPassword"
                    autoComplete="current-password"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                  <FormControlLabel
                    control={<Checkbox value="remember" color="primary" required checked={termsNconditions} onChange={() => setTermsNconditions(!termsNconditions)}/>}
                    label={
                      <span>Agree to <a href='#' className='termsNconditions'>Terms & Conditions</a></span>
                    }
                    
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2, backgroundColor: "#25ae81", color: 'white', "&:hover": {backgroundColor: "#25ae81"} }}
                  >
              {isSubmitting ? <CircularProgress size={24} sx={{color: "white"}} /> : "SIGN UP" } 
                  </Button>
                  <Grid container>
                    
                    <Grid item>
                      <Link href="/login" variant="body2" sx={{ textDecoration: 'none' }}>
                        {"Already have an account? Sign In"}
                      </Link>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            </Container>
          </ThemeProvider>
        </div>
      </div>
    );
  }