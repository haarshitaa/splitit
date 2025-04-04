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
import Typography from '@mui/material/Typography';
import { Bottom } from "../Components/bottom";
import { Paper, Divider } from '@mui/material';
import { useState, useEffect } from "react";

export function SignUpBox({  
    email,
    setEmail,
    name,
    setName,
    password,
    setPassword,
    showPassword,
    setShowPassword,
    handleClickShowPassword,
    handleMouseDownPassword,
    handleSubmit,
    loading,
    error}) { 
   

    return (
       
           <Paper elevation={6} sx={{
              p: 4,
              borderRadius: 4,
              width: { xs: '90vw', sm: '400px' },
              backdropFilter: 'blur(8px)',
              backgroundColor: 'rgba(255, 255, 255, 0.85)',
              boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
              border: '1px solid rgba(255, 255, 255, 0.18)',
              position: 'relative',
              overflow: 'hidden',
              '&:before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '4px',
                background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`
              }
            }}>
              <Typography
                component="h1"
                variant="h4"
                sx={{ 
                  width: '100%', 
                  fontSize: 'clamp(2rem, 10vw, 2.15rem)',
                  fontWeight: 700,
                  textAlign: 'center',
                  mb: 3,
                  color: theme.palette.primary.main,
                  background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}
              >
                Join SplitIt
              </Typography>
              <Typography variant="body2" color="text.secondary" textAlign="center" mb={3}>
                Start splitting expenses with friends effortlessly
              </Typography>
              
              <Divider sx={{ mb: 3 }} />

              {/* error alert */}
              {error && (
                  <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>
              )}

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

              {/* submit button */}
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                {loading ? (
                    <LoadingButton 
                      loading 
                      variant="contained" 
                      size="large"
                      sx={{
                        width: '100%',
                        borderRadius: 2,
                        py: 1.5,
                        background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                        '&:hover': {
                          transform: 'translateY(-2px)',
                          boxShadow: `0 4px 20px 0 ${theme.palette.primary.main}40`
                        },
                        transition: 'all 0.3s ease'
                      }}
                    >
                      Creating Account...
                    </LoadingButton>
                ) : (
                    <Button
                        variant="contained"
                        onClick={handleSubmit}
                        size="large"
                        sx={{
                          width: '100%',
                          borderRadius: 2,
                          py: 1.5,
                          background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                          '&:hover': {
                            transform: 'translateY(-2px)',
                            boxShadow: `0 4px 20px 0 ${theme.palette.primary.main}40`
                          },
                          transition: 'all 0.3s ease'
                        }}
                    >
                      Sign Up
                    </Button>
                )}
              </Box>

              <Box sx={{ mt: 3 }}>
                <Bottom warning={"Already have an account?"} buttonText={"Sign in"} to={"/signin"} />
              </Box>
            </Paper>


    );
}



