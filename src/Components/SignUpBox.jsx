// import TextField from '@mui/material/TextField';
// import AccountCircle from '@mui/icons-material/AccountCircle';
// import MailIcon from '@mui/icons-material/Mail';
// import IconButton from '@mui/material/IconButton';
// import Input from '@mui/material/Input';
// import InputLabel from '@mui/material/InputLabel';
// import InputAdornment from '@mui/material/InputAdornment';
// import FormControl from '@mui/material/FormControl';
// import Visibility from '@mui/icons-material/Visibility';
// import VisibilityOff from '@mui/icons-material/VisibilityOff';
// import Button from '@mui/material/Button';
// import LoadingButton from '@mui/lab/LoadingButton';
// import Alert from '@mui/material/Alert';
// import Typography from '@mui/material/Typography';
// import { Bottom } from "../Components/bottom";
// import { Paper, Divider } from '@mui/material';
// import Box from '@mui/material/Box';
// import { useState, useEffect } from "react";

// export function SignUpBox({  
//     email,
//     setEmail,
//     name,
//     setName,
//     password,
//     setPassword,
//     showPassword,
//     setShowPassword,
//     handleClickShowPassword,
//     handleMouseDownPassword,
//     handleSubmit,
//     loading,
//     error, 
//     theme,

// }) { 
   

//     return (
       
//           <>

//             {step === "form" && (
//                 <Paper elevation={6} sx={{
//                     p: 4,
//                     borderRadius: 4,
//                     width: { xs: '90vw', sm: '400px' },
//                     backdropFilter: 'blur(8px)',
//                     backgroundColor: 'rgba(255, 255, 255, 0.85)',
//                     boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
//                     border: '1px solid rgba(255, 255, 255, 0.18)',
//                     position: 'relative',
//                     overflow: 'hidden',
//                     '&:before': {
//                       content: '""',
//                       position: 'absolute',
//                       top: 0,
//                       left: 0,
//                       right: 0,
//                       height: '4px',
//                       background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`
//                     }
//                   }}>
//                     <Typography
//                       component="h1"
//                       variant="h4"
//                       sx={{ 
//                         width: '100%', 
//                         fontSize: 'clamp(2rem, 10vw, 2.15rem)',
//                         fontWeight: 700,
//                         textAlign: 'center',
//                         mb: 3,
//                         color: theme.palette.primary.main,
//                         background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
//                         WebkitBackgroundClip: 'text',
//                         WebkitTextFillColor: 'transparent'
//                       }}
//                     >
//                       Join SplitIt
//                     </Typography>
//                     <Typography variant="body2" color="text.secondary" textAlign="center" mb={3}>
//                       Start splitting expenses with friends effortlessly
//                     </Typography>
                    
//                     <Divider sx={{ mb: 3 }} />
      
//                     {/* error alert */}
//                     {error && (
//                         <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>
//                     )}
      
//                     {/* username email password */}
//                     <Box sx={{ display: 'flex', alignItems: 'flex-end', mb: 2 }}>
//                         <MailIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
//                         <TextField
//                             id="email"
//                             label="Email"
//                             variant="standard"
//                             fullWidth
//                             value={email}
//                             onChange={(e) => setEmail(e.target.value)}
//              
//                         />
//                     </Box>
      
//                     <Box sx={{ display: 'flex', alignItems: 'flex-end', mb: 2 }}>
//                         <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
//                         <TextField
//                             id="username"
//                             label="Username"
//                             variant="standard"
//                             fullWidth
//                             value={name}
//                             onChange={(e) => setName(e.target.value)}
//                      
//                         />
//                     </Box>
      
//                     <FormControl sx={{ m: 1, width: '100%' }} variant="standard">
//                         <InputLabel htmlFor="password">Password</InputLabel>
//                         <Input
//                             id="password"
//                             type={showPassword ? 'text' : 'password'}
//                             endAdornment={
//                                 <InputAdornment position="end">
//                                     <IconButton
//                                         aria-label="toggle password visibility"
//                                         onClick={handleClickShowPassword}
//                                         onMouseDown={handleMouseDownPassword}
//                                     >
//                                         {showPassword ? <VisibilityOff /> : <Visibility />}
//                                     </IconButton>
//                                 </InputAdornment>
//                             }
//                             value={password}
//                             onChange={(e) => setPassword(e.target.value)}
//                        />
//                     </FormControl>
      
//                     {/* submit button */}
//                     <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
//                       {loading ? (
//                           <LoadingButton 
//                             loading 
//                             variant="contained" 
//                             size="large"
//                             sx={{
//                               width: '100%',
//                               borderRadius: 2,
//                               py: 1.5,
//                               background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
//                               '&:hover': {
//                                 transform: 'translateY(-2px)',
//                                 boxShadow: `0 4px 20px 0 ${theme.palette.primary.main}40`
//                               },
//                               transition: 'all 0.3s ease'
//                             }}
//                           >
//                             Creating Account...
//                           </LoadingButton>
//                       ) : (
//                           <Button
//                               variant="contained"
//                               onClick={handleSubmit}
//                               size="large"
//                               sx={{
//                                 width: '100%',
//                                 borderRadius: 2,
//                                 py: 1.5,
//                                 background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
//                                 '&:hover': {
//                                   transform: 'translateY(-2px)',
//                                   boxShadow: `0 4px 20px 0 ${theme.palette.primary.main}40`
//                                 },
//                                 transition: 'all 0.3s ease'
//                               }}
//                           >
//                             Sign Up
//                           </Button>
//                       )}
//                     </Box>
      
//                     <Box sx={{ mt: 3 }}>
//                       <Bottom warning={"Already have an account?"} buttonText={"Sign in"} to={"/signin"} />
//                     </Box>
//                   </Paper>
//               )}
              
//               {step === "confirm" && (
//                 <>
//                   {/* disabled inputs */}
//                   <Box sx={{ display: 'flex', alignItems: 'flex-end', mb: 2 }}>
//                     <MailIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
//                     <TextField
//                       value={email}
//                       label="Email"
//                       variant="standard"
//                       fullWidth
//                       disabled
//                     />
//                   </Box>
//                   <Box sx={{ display: 'flex', alignItems: 'flex-end', mb: 2 }}>
//                     <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
//                     <TextField
//                       value={name}
//                       label="Username"
//                       variant="standard"
//                       fullWidth
//                       disabled
//                     />
//                   </Box>
//                   <FormControl variant="standard" fullWidth>
//                     <InputLabel>Password</InputLabel>
//                     <Input type="password" value={password} disabled />
//                   </FormControl>
              
//                   {/* navigation arrows */}
//                   <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
//                     <Button variant="outlined" onClick={() => setStep("form")}>⬅️</Button>
//                     <Button variant="contained" onClick={handleSendOtp}>➡️</Button>
//                   </Box>
//                 </>
//               )}
              
//               {step === "otp" && (
//                 <>
//                   <Typography variant="body1" mb={2}>Enter the OTP sent to <b>{email}</b></Typography>
//                   <TextField
//                     label="OTP"
//                     fullWidth
//                     variant="standard"
//                     value={otp}
//                     onChange={(e) => setOtp(e.target.value)}
//                   />
//                   <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
//                     <Button variant="outlined" onClick={handleSendOtp}>Resend OTP</Button>
//                     <Button variant="contained" onClick={() => handleVerifyOtp(otp)}>Verify</Button>
//                   </Box>
//                 </>
//               )}
//               </>
//     );
// }


import { useState } from "react";
import {
  Box, Button, TextField, Typography, IconButton,
  Input, InputLabel, InputAdornment, FormControl, Alert, Paper, Divider
} from "@mui/material";
import MailIcon from '@mui/icons-material/Mail';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import LoadingButton from '@mui/lab/LoadingButton';
import { Bottom } from "../Components/bottom";

export function SignUpBox({
    theme,
    step,
    setStep,
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
    error,
    handleSendOtp,
    handleVerifyOtp,
    otp,
    setOtp,
  }) {
//   const [step, setStep] = useState("form");
//   const [email, setEmail] = useState("");
//   const [name, setName] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [otp, setOtp] = useState("");
//   const [error, setError] = useState("");


//   const handleClickShowPassword = () => setShowPassword((show) => !show);
//   const handleMouseDownPassword = (e) => e.preventDefault();

//   const handleSubmit = () => {
//     // go to confirm page
//     if (!email || !name || !password) {
//       setError("Please fill out all fields.");
//       return;
//     }
//     setError("");
//     setStep("confirm");
//   };

//   const handleSendOtp = async () => {
//     setLoading(true);
//     try {
//       const res = await fetch("/sendcode", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email }),
//       });

//       const data = await res.json();
//       if (!res.ok) throw new Error(data.message || "Failed to send OTP");

//       setError("");
//       setStep("otp");
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleVerifyOtp = async () => {
//     if (!otp) {
//       setError("Please enter the OTP.");
//       return;
//     }

//     setLoading(true);
//     try {
//       const res = await fetch("/verify-otp", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, otp }),
//       });

//       const data = await res.json();
//       if (!res.ok) throw new Error(data.message || "OTP verification failed");

//       alert("Account created successfully!");
//       setError("");
//       // Redirect or reset state
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

  return (
    <>
      {step === "form" && (
        <Paper elevation={6} sx={{
          p: 4, borderRadius: 4, width: { xs: '90vw', sm: '400px' },
          backdropFilter: 'blur(8px)', backgroundColor: 'rgba(255, 255, 255, 0.85)',
          position: 'relative', overflow: 'hidden',
          '&:before': {
            content: '""',
            position: 'absolute', top: 0, left: 0, right: 0, height: '4px',
            background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`
          }
        }}>
          <Typography component="h1" variant="h4" sx={{
            textAlign: 'center', mb: 3,
            background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'
          }}>
            Join SplitIt
          </Typography>
          <Typography variant="body2" color="text.secondary" textAlign="center" mb={3}>
            Start splitting expenses with friends effortlessly
          </Typography>
          <Divider sx={{ mb: 3 }} />

          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

          <Box sx={{ display: 'flex', alignItems: 'flex-end', mb: 2 }}>
            <MailIcon sx={{ color: 'action.active', mr: 1 }} />
            <TextField
              label="Email" variant="standard" fullWidth value={email}
              onChange={(e) => setEmail(e.target.value)} 
            />
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'flex-end', mb: 2 }}>
            <AccountCircle sx={{ color: 'action.active', mr: 1 }} />
            <TextField
              label="Username" variant="standard" fullWidth value={name}
              onChange={(e) => setName(e.target.value)} 
            />
          </Box>

          <FormControl sx={{ m: 1, width: '100%' }} variant="standard">
            <InputLabel>Password</InputLabel>
            <Input
              type={showPassword ? 'text' : 'password'} value={password}
              onChange={(e) => setPassword(e.target.value)} 
              endAdornment={
                <InputAdornment position="end">
                  <IconButton onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>

          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <Button variant="contained" fullWidth onClick={handleSubmit}>
              Sign Up
            </Button>
          </Box>

          <Box sx={{ mt: 3 }}>
            <Bottom warning="Already have an account?" buttonText="Sign in" to="/signin" />
          </Box>
        </Paper>
      )}

      {step === "confirm" && (
        <>
          <Paper elevation={6} sx={{
          p: 4, borderRadius: 4, width: { xs: '90vw', sm: '400px' },
          backdropFilter: 'blur(8px)', backgroundColor: 'rgba(255, 255, 255, 0.85)',
          position: 'relative', overflow: 'hidden',
          '&:before': {
            content: '""',
            position: 'absolute', top: 0, left: 0, right: 0, height: '4px',
            background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`
          }
        }}>
          <TextField label="Email" fullWidth value={email} disabled variant="standard" sx={{ mb: 2 }} />
          <TextField label="Username" fullWidth value={name} disabled variant="standard" sx={{ mb: 2 }} />
          <FormControl variant="standard" fullWidth>
            <InputLabel>Password</InputLabel>
            <Input type="password" value={password} disabled />
          </FormControl>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
            <Button variant="outlined" onClick={() => setStep("form")}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" class="size-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
              </svg>
            </Button>
            <LoadingButton loading={loading} variant="contained" onClick={handleSendOtp}>
               Send OTP
            </LoadingButton>
          </Box>
          </Paper>
        </>
      )}

      {step === "otp" && (
        <>
        <Paper elevation={6} sx={{
          p: 4, borderRadius: 4, width: { xs: '90vw', sm: '400px' },
          backdropFilter: 'blur(8px)', backgroundColor: 'rgba(255, 255, 255, 0.85)',
          position: 'relative', overflow: 'hidden',
          '&:before': {
            content: '""',
            position: 'absolute', top: 0, left: 0, right: 0, height: '4px',
            background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`
          }
        }}>
          <Typography variant="body1" mb={2}>Enter the OTP sent to <b>{email}</b></Typography>
          <TextField
            label="OTP" fullWidth variant="standard"
            value={otp} onChange={(e) => setOtp(e.target.value)}
          />
          {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
            <Button variant="outlined" onClick={handleSendOtp}>Resend OTP</Button>
            <LoadingButton loading={loading} variant="contained" onClick={handleVerifyOtp}>
              Verify
            </LoadingButton>
          </Box>
          </Paper>
        </>
      )}
    </>
  );
}



