import { useNavigate } from "react-router-dom";
import Typography from '@mui/material/Typography';
import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
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

export function SignIn() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");  

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
        if (email === "" || password === "") {
            setError("Please fill all the credentials.");
        } else {
            setLoading(true);
            try {
                const response = await axios.post("http://127.0.0.1:8787/signin", {
                    email,
                    password
                });
                if(response.data.message === "No user found"){
                    setError("This email is not registered."),
                    setLoading(false);
                    return;
                }

                if(response.data.token){
                    localStorage.setItem("token",response.data.token);
                    localStorage.setItem("user", JSON.stringify(response.data.data));
                    navigate('/dashboard');
                }else{
                    setError("Failed to sign in. Please try again.");
                }
            } catch (err) {
                console.error("Error during signin", err);
                setError("An error occurred during signin.");
                setLoading(false);
            }
        }
    };

    return (
        <>
            <div>
                {/* Sign In Header */}
                <Typography
                    component="h1"
                    variant="h4"
                    sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
                >
                    Sign In
                </Typography>
                <br />

                {/* Email input */}
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

                {/* Password input */}
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

                {/* Error alert */}
                {error && (
                    <Alert severity="error">{error}</Alert>
                )}

                {/* Submit button */}
                {loading ? (
                    <LoadingButton loading variant="outlined">
                        Submit
                    </LoadingButton>
                ) : (
                    <Button
                        variant="contained"
                        onClick={handleSubmit}
                    >
                        Sign In
                    </Button>
                )}
            </div>

            {/* Bottom section */}
            <div>
                <Bottom warning={"Don't have an account?"} buttonText={"Sign Up"} to={"/signup"} />
            </div>
        </>
    );
}
