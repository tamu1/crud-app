
import React, { useState,useContext,useEffect } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// import AuthContext from "../contexts/AuthContext";
import { AuthContext } from '../contexts/AuthContext';

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { isLoggedIn,setIsLoggedIn } = useContext(AuthContext);

  
  const navigate = useNavigate();

  const handleClickShowPassword = () => {
    setShowPassword((show) => !show);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  useEffect(() => {
    if (isLoggedIn) {
      navigate('/home');
    }
  }, [isLoggedIn, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {

      toast.error('Email and password are required');
      return;
    }
    

    if (!validateEmail(email)) {
      toast.error('Invalid email');
      return;
    }

    fetch('http://localhost:3000/users', {
      method: 'GET',
    })

      .then((response) => response.json())
      .then((users) => {
        const user = users.find((user) => user.email === email && user.password === password);


        if (user) {
          sessionStorage.setItem("name", JSON.stringify(user))
          setIsLoggedIn(true);
          navigate('/home')
        } else {
          alert('invalid email or password');
        }
      })
    };

  return (
    <Box className="signup">
      <Typography className="signup-heading" variant="h4" gutterBottom>
        Login Form
      </Typography>
      <Box
        className="form"
        component="form"
        onSubmit={handleSubmit}
        sx={{
          '& .MuiTextField-root': { m: 1 },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="email"
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="off"
          name="email"
          error={email.trim() && !validateEmail(email)}
          helperText={email.trim() && !validateEmail(email) ? 'Invalid email' : ''}
        />
        <FormControl sx={{ m: 1 }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="off"
            error={password.trim() !== '' && password.trim().length < 8}
            helperText={password.trim() !== '' && password.trim().length < 8 ? 'Password must be at least 8 characters' : ''}
            endAdornment={
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
            }
            label="Password"
          />
        </FormControl>
        <div className="login-btn">
          <Button className="btn" type="submit" variant="contained">
            Submit
          </Button>

          <Link className="links btn mt-20" to={'/'}>
            Signup
          </Link>
        </div>

      </Box>
    </Box>
  )
}

export default Login
