import React, { useContext, useState } from 'react';
import { 
    Button, 
    Container, 
    CssBaseline, 
    Grid, 
    IconButton, 
    InputAdornment, 
    Link, 
    TextField, 
    Typography,
    Box
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { CircularProgress } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import "./Login.css";
import UserContext from '../../context/Usercontext';
import { useLocation, useNavigate } from 'react-router-dom';




const defaultTheme = createTheme();

const validateEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export default function SignIn() {
  const  location = useLocation()
  const  navigate = useNavigate();
 const [errorMessage, setErrorMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const {setUser} = useContext(UserContext);
  const handleSubmit = (event) => {
    event.preventDefault();
    setErrorMessage("")
    setIsSubmitting(true)
    const formData = new FormData(event.currentTarget);
    const email = formData.get('email')
    const password = formData.get('password')
    try {
      if(!email || !password){   
        throw new Error("All mandatory fields are required!")
      }
      const validEmail = validateEmail(email)
      if(!validEmail) {
        throw new Error("Invalid email address!")
      }
  
  
      fetch("http://localhost:8800/api/login",
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password
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
          setUser(data.data)
         
          navigate(`${location.state?.redirectUrl || "/"}`)
        }
      })

      

    } catch (error) {
      setErrorMessage(error.message)
      setIsSubmitting(false)
    }
  }

  const [showPassword, setShowPassword] = useState(false);

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
          <h4>Welcome Back</h4>
          
          <div className='text-caption'>Login to continue and explore new jobs.</div>
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
              <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
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
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2, backgroundColor: "#25ae81", color: 'white', "&:hover": {backgroundColor: "#25ae81"} }}
                >
                {isSubmitting ? <CircularProgress size={24} sx={{color: "white"}} /> : "SIGN IN" } 
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link href="#" variant="body2" sx={{ textDecoration: 'none' }}>
                      Forgot password?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link href="/signup" variant="body2" sx={{ textDecoration: 'none' }}>
                      {"Don't have an account? Sign Up"}
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