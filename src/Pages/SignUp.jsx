import { useNavigate } from "react-router-dom";
import Typography from '@mui/material/Typography';
import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import Alert from '@mui/material/Alert';
import axios from "axios";
import { Bottom } from "../Components/bottom";

export function SignUp() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");  // New state to hold error message

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            navigate("/dashboard");
        }
    }, [navigate]);

    const handleSubmit = async () => {
        if (name === "" || email === "" || password === "") {
            setError("Please fill all the credentials.");
            return;
        }
    
        setLoading(true);
    
        try {
            const response = await axios.post("http://localhost:8787/signup", {
                email,
                name,
                password
            });
    
            localStorage.setItem("token", response.data.token);
            navigate('/dashboard');
    
        } catch (err) {
            console.error("Error during signup:", err);
    
            // Check if error response exists and contains the expected message
            if (err.response && err.response.status === 400 && err.response.data.message) {
                setError(err.response.data.message);
            } else {
                setError("An error occurred during signup.");
            }
    
        } finally {
            setLoading(false);
        }
    };
    

    return (
        <>
            <div>
                {/* signup */}
                <Typography
                    component="h1"
                    variant="h4"
                    sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
                >
                    Sign Up
                </Typography>
                <br />
                {/* username email password */}
                <Box sx={{ display: 'flex', alignItems: 'flex-end', mb: 2 }}>
                    <MailIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                    <TextField
                        id="email"
                        label="Email"
                        variant="standard"
                        fullWidth
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'flex-end', mb: 2 }}>
                    <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                    <TextField
                        id="username"
                        label="Username"
                        variant="standard"
                        fullWidth
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </Box>

                <FormControl sx={{ m: 1, width: '100%' }} variant="standard">
                    <InputLabel htmlFor="password">Password</InputLabel>
                    <Input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </FormControl>

                {/* error alert */}
                {error && (
                    <Alert severity="error">{error}</Alert>
                )}

                {/* submit button */}
                {loading ? (
                    <LoadingButton loading variant="outlined">
                        Submit
                    </LoadingButton>
                ) : (
                    <Button
                        variant="contained"
                        onClick={handleSubmit}
                    >
                        Sign Up
                    </Button>
                )}
            </div>
            <div>
                <Bottom warning={"Already have an account?"} buttonText={"Sign in"} to={"/signin"} />
            </div>
        </>
    );
}
