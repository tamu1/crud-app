import { Box, Typography } from '@mui/material';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import { Link } from "react-router-dom";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

function Signup() {
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  }
  const [name, setName] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formErrors, setFormErrors] = useState(false);
  const navigate = useNavigate();

  const handleNameChange = (e) => {
    setName(e.target.value);
    setFormErrors(false);
  };

  const handleLastnameChange = (e) => {
    setLastname(e.target.value);
    setFormErrors(false);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setFormErrors(false);

  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setFormErrors(false);
  };

  const validateForm = () => {
    const errors = {
      name: name.trim() ? '' : 'Name is required',
      lastname: lastname.trim() ? '' : 'Last name is required',
      email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? '' : 'Invalid email address',
      password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(password)
        ? ''
        : 'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number',
    };

    setFormErrors(errors);

    return Object.values(errors).every((error) => error === '');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {

      const item = {
        name,
        lastname,
        email,
        password,
      };

      console.log('Form data:', item);

      fetch(`${process.env.REACT_APP_BASE_URL}/users`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(item),
      })
        .then((res) => {
          toast.success('Registered successfully');
          navigate('/login');
        })
        .catch((err) => {
          toast.error('Failed:' + err.message);
        });
      toast.success('Registered successfully');
      navigate('/login');
    }

  };

  return (
    <Box className="signup">
      <Typography className="signup-heading" variant="h4" gutterBottom>
        Signup Form
      </Typography>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={handleNameChange}
          />
          {formErrors.name && <span className="error">{formErrors.name}</span>}
        </label>
        <label>
          Last Name:
          <input
            type="text"
            value={lastname}
            onChange={handleLastnameChange}
          />
          {formErrors.lastname && <span className="error">{formErrors.lastname}</span>}
        </label>
        <label>
          Email:
          <input
            type="text"
            value={email}
            onChange={handleEmailChange}
          />
          {formErrors.email && <span className="error">{formErrors.email}</span>}
        </label>

        <label>Password:
          <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined"
            value={password}
            onChange={handlePasswordChange}
          >

            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
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
          {formErrors.password && <span className="error">{formErrors.password}</span>}
        </label>
        <div className='login-btn'>
          <button className='btn mt-20 mr-10' type="submit">sign up</button>
          <Link className="links btn mt-20" to={'/login'}>login</Link>
        </div>
      </form>
    </Box>
  );
}

export default Signup;


// ---------------------------------Login -------------------------

// import React, { useState } from 'react';
// import { Box, Button, TextField, Typography } from '@mui/material';
// import IconButton from '@mui/material/IconButton';
// import OutlinedInput from '@mui/material/OutlinedInput';
// import InputLabel from '@mui/material/InputLabel';
// import InputAdornment from '@mui/material/InputAdornment';
// import FormControl from '@mui/material/FormControl';
// import Visibility from '@mui/icons-material/Visibility';
// import VisibilityOff from '@mui/icons-material/VisibilityOff';
// import { useNavigate, Link } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// function Login() {
//   const [showPassword, setShowPassword] = useState(false);
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const navigate = useNavigate();

//   const handleClickShowPassword = () => {
//     setShowPassword((show) => !show);
//   };

//   const handleMouseDownPassword = (event) => {
//     event.preventDefault();
//   };

//   const validateEmail = (email) => {
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return emailRegex.test(email);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!email.trim() || !password.trim()) {
//       toast.error('Email and password are required');
//       return;
//     }

//     if (!validateEmail(email)) {
//       toast.error('Invalid email');
//       return;
//     }

//     try {
//       const response = await fetch(`${process.env.REACT_APP_BASE_URL}/users`, {
//         method: 'GET',
//       })

//       const users = await response.json()

//       const user = users.find((user) => user.email === email && user.password === password);

//       if (user) {
//         sessionStorage.setItem("name", JSON.stringify(user))
//         navigate('/home')
//       } else {
//         alert('invalid email or password');
//       }
//     } catch (err) {
//       console.log("We got an error", err)
//     }

//     // .then((response) => response.json())
//     //   .then((users) => {
//     //   })

//   };

//   return (
//     <Box className="signup">
//       <Typography className="signup-heading" variant="h4" gutterBottom>
//         Login Form
//       </Typography>
//       <Box
//         className="form"
//         component="form"
//         onSubmit={handleSubmit}
//         sx={{
//           '& .MuiTextField-root': { m: 1 },
//         }}
//         noValidate
//         autoComplete="off"
//       >
//         <TextField
//           id="email"
//           label="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           autoComplete="off"
//           name="email"
//           error={email.trim() && !validateEmail(email)}
//           helperText={email.trim() && !validateEmail(email) ? 'Invalid email' : ''}
//         />
//         <FormControl sx={{ m: 1 }} variant="outlined">
//           <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
//           <OutlinedInput
//             id="outlined-adornment-password"
//             type={showPassword ? 'text' : 'password'}
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             autoComplete="off"
//             error={password.trim() !== '' && password.trim().length < 8}
//             helperText={password.trim() !== '' && password.trim().length < 8 ? 'Password must be at least 8 characters' : ''}
//             endAdornment={
//               <InputAdornment position="end">
//                 <IconButton
//                   aria-label="toggle password visibility"
//                   onClick={handleClickShowPassword}
//                   onMouseDown={handleMouseDownPassword}
//                   edge="end"
//                 >
//                   {showPassword ? <VisibilityOff /> : <Visibility />}
//                 </IconButton>
//               </InputAdornment>
//             }
//             label="Password"
//           />
//         </FormControl>
//         <div className="login-btn">
//           <Button className="btn" type="submit" variant="contained">
//             Submit
//           </Button>

//           <Link className="links btn mt-20" to={'/'}>
//             Signup
//           </Link>
//         </div>

//       </Box>
//     </Box>
//   )
// }

// export default Login
