import React, { useEffect } from 'react'
import { Box, Button, TextField, Typography } from '@mui/material'
import IconButton from '@mui/material/IconButton';

import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {
   
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
      event.preventDefault();
  }
  const [name, setName] = useState("");
  const [password,setPassword] = useState("");
  const navigate = useNavigate()

  useEffect(()=>{
    sessionStorage.clear();

  },[]);

 

const ProceedLogin = (e) => {
  e.preventDefault();

fetch('http://localhost:3000/users/' + name).then((res) => {
  return res.json();
}).then((resp) => {
  console.log(resp)
  if (Object.keys(resp).length === 0) { 
      toast.error('Please enter valid username');
  } else {
      if (resp.password === password) {
          toast.success('Success');
          sessionStorage.setItem('name',name)
          navigate('/home')
      } else {
          toast.error('Please enter valid credential');
      }
  }

}).catch((error) => {
  toast.error('Login Failed due to :' + error.message)

});
}
  return (
    <Box className="signup">
    <Typography className='signup-heading' variant="h4" gutterBottom>
        Login Form
    </Typography>
    <Box className='form' component="form" onSubmit={ProceedLogin}
        sx={{
            '& .MuiTextField-root': { m: 1, },
        }}
        noValidate
        autoComplete="off">
        <TextField
            required
            id="outlined-required"
            label="user Name"
            defaultValue="Name"
            onChange={(e) => setName(e.target.value)}
            value={name}
            autoComplete="off"
            name="name"
           
        />
       
      
        <FormControl sx={{ m: 1, }} variant="outlined"
        onChange={(e)=> setPassword(e.target.value)}
        value={password}
        autoComplete="off"
       
            
        >
            <InputLabel htmlFor="outlined-adornment-password"  autoComplete="off">Password</InputLabel>
            <OutlinedInput
         
                id="outlined-adornment-password"
                type={showPassword ? 'text' : 'password'}
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
        <Button type="submit"  variant="contained">Submit</Button>
    </Box>
</Box>
  )
}

export default Login