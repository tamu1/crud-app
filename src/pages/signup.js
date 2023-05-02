import { Box, Button, Input, TextField, Typography } from '@mui/material'
import React from 'react'
import IconButton from '@mui/material/IconButton';

import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {toast,ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Signup() {
    const [showPassword, setShowPassword] = React.useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    }
    const [id,idchange] = useState("");
    const [name, setName] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    function Register() {
        let item = { id,name, lastname, email, password };
        // console.warn(item);

        fetch("http://localhost:3000/users", {
            method: "POST",
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(item)
        }).then((res) => {
            toast.success('Registered successfully')
            navigate('/login')

        }).catch((err) => {
            toast.error('Failed:'+err.message);
        });
    }

    return (
        <Box className="signup">
            <Typography className='signup-heading' variant="h4" gutterBottom>
                Signup Form
            </Typography>
            {/* <Input required  value={id} onChange={e => idchange(e.target.value)} name='username' placeholder='User Name' /> */}
          
            <Box className='form' component="form"
                sx={{
                    '& .MuiTextField-root': { m: 1, },
                }}
                noValidate
            >
                      <TextField
                    required
                    id="outlined-required"
                    label="id"
                    defaultValue="id"
                    onChange={(e) =>idchange(e.target.value)}
                    value={id}
                    autoComplete="off"
                />
                <TextField
                    required
                    id="outlined-required"
                    label="Name"
                    defaultValue="Name"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                />
                <TextField id="outlined-basic" label="Lastname" variant="outlined"
                    onChange={(e) => setLastname(e.target.value)}
                    value={lastname}
                />
                <TextField
                    required
                    id="outlined-required"
                    label="Email"
                    defaultValue="Email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                />
                <FormControl sx={{ m: 1, }} variant="outlined"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
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
                <Button onClick={Register} variant="contained">Submit</Button>
            </Box>
        </Box>
    )
}

export default Signup