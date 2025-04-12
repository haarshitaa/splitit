// import {
//   Box, Button, TextField, Typography, IconButton,
//   Input, InputLabel, InputAdornment, FormControl, Alert, Paper, Divider
// } from "@mui/material";
// import MailIcon from '@mui/icons-material/Mail';
// import AccountCircle from '@mui/icons-material/AccountCircle';
// import Visibility from '@mui/icons-material/Visibility';
// import VisibilityOff from '@mui/icons-material/VisibilityOff';
// import LoadingButton from '@mui/lab/LoadingButton';
// import { Bottom } from "../Components/bottom";
// import {
//   InputOTP,
//   InputOTPGroup,
//   InputOTPSeparator,
//   InputOTPSlot,
// } from "@/components/ui/input-otp"


// export function SignUpBox({
//     theme,
//     step,
//     setStep,
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
//     handleSendOtp,
//     handleVerifyOtp,
//     otp,
//     setOtp,
//   }) {

//   return (
//     <>
//       {step === "form" && (
//         <Paper elevation={6} sx={{
//           p: 4, borderRadius: 4, width: { xs: '90vw', sm: '400px' },
//           backdropFilter: 'blur(8px)', backgroundColor: 'rgba(255, 255, 255, 0.85)',
//           position: 'relative', overflow: 'hidden',
//           '&:before': {
//             content: '""',
//             position: 'absolute', top: 0, left: 0, right: 0, height: '4px',
//             background: `bg-gradient-to-r from-customBg to-customBgLight`
//           }
//         }}>
//           <Typography component="h1" variant="h4" sx={{
//             textAlign: 'center', mb: 3,
//             background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
//             WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'
//           }}>
//             Join SplitIt
//           </Typography>
//           <Typography variant="body2" color="text.secondary" textAlign="center" mb={3}>
//             Start splitting expenses with friends effortlessly
//           </Typography>
//           <Divider sx={{ mb: 3 }} />

//           {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

//           <Box sx={{ display: 'flex', alignItems: 'flex-end', mb: 2 }}>
//             <MailIcon sx={{ color: 'action.active', mr: 1 }} />
//             <TextField
//               label="Email" variant="standard" fullWidth value={email}
//               onChange={(e) => setEmail(e.target.value)} 
//             />
//           </Box>

//           <Box sx={{ display: 'flex', alignItems: 'flex-end', mb: 2 }}>
//             <AccountCircle sx={{ color: 'action.active', mr: 1 }} />
//             <TextField
//               label="Username" variant="standard" fullWidth value={name}
//               onChange={(e) => setName(e.target.value)} 
//             />
//           </Box>

//           <FormControl sx={{ m: 1, width: '100%' }} variant="standard">
//             <InputLabel>Password</InputLabel>
//             <Input
//               type={showPassword ? 'text' : 'password'} value={password}
//               onChange={(e) => setPassword(e.target.value)} 
//               endAdornment={
//                 <InputAdornment position="end">
//                   <IconButton onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword}>
//                     {showPassword ? <VisibilityOff /> : <Visibility />}
//                   </IconButton>
//                 </InputAdornment>
//               }
//             />
//           </FormControl>

//           <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
//             <Button variant="contained" fullWidth onClick={handleSubmit}>
//               Sign Up
//             </Button>
//           </Box>

//           <Box sx={{ mt: 3 }}>
//             <Bottom warning="Already have an account?" buttonText="Sign in" to="/signin" />
//           </Box>
//         </Paper>
//       )}

//       {step === "confirm" && (
//         <>
//           <Paper elevation={6} sx={{
//           p: 4, borderRadius: 4, width: { xs: '90vw', sm: '400px' },
//           backdropFilter: 'blur(8px)', backgroundColor: 'rgba(255, 255, 255, 0.85)',
//           position: 'relative', overflow: 'hidden',
//           '&:before': {
//             content: '""',
//             position: 'absolute', top: 0, left: 0, right: 0, height: '4px',
//             background: 'linear-gradient(to right, #f8a825, #facc15)'
//           }
//         }}>
//           <TextField label="Email" fullWidth value={email} disabled variant="standard" sx={{ mb: 2 }} />
//           <TextField label="Username" fullWidth value={name} disabled variant="standard" sx={{ mb: 2 }} />
//           <FormControl variant="standard" fullWidth>
//             <InputLabel>Password</InputLabel>
//             <Input type="password" value={password} disabled />
//           </FormControl>

//           <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
//             <Button variant="outlined" onClick={() => setStep("form")}>
//               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" class="size-8">
//                 <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
//               </svg>
//             </Button>
//             <LoadingButton loading={loading} variant="contained" onClick={handleSendOtp}>
//                Send OTP
//             </LoadingButton>
//           </Box>
//           </Paper>
//         </>
//       )}

//       {step === "otp" && (
//         <>
//         <Paper elevation={6} sx={{
//           p: 4, borderRadius: 4, width: { xs: '90vw', sm: '400px' },
//           backdropFilter: 'blur(8px)', backgroundColor: 'rgba(255, 255, 255, 0.85)',
//           position: 'relative', overflow: 'hidden',
//           '&:before': {
//             content: '""',
//             position: 'absolute', top: 0, left: 0, right: 0, height: '4px',
//             background: 'linear-gradient(to right, #f8a825, #facc15)'
//           }
//         }}>
//           <Typography variant="body1" mb={2}>Enter the OTP sent to <b>{email}</b></Typography>
//           <InputOTP
//         maxLength={4}
//         value={otp}
//         onChange={(value) => setOtp(value)}
//       >
//         <InputOTPGroup>
//           <InputOTPSlot index={0} />
//           <InputOTPSlot index={1} />
//           <InputOTPSlot index={2} />
//           <InputOTPSlot index={3} />
//         </InputOTPGroup>
//       </InputOTP>
//           {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
//           <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
//             <Button variant="outlined" onClick={handleSendOtp}>Resend OTP</Button>
//             <LoadingButton loading={loading} variant="contained" onClick={handleVerifyOtp}>
//               Verify
//             </LoadingButton>
//           </Box>
//           </Paper>
//         </>
//       )}
//     </>
//   );
// }





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
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";


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

  const yellowGradient = 'linear-gradient(to right, #f8a825, #facc15)';

  const paperStyles = {
    p: 4,
    borderRadius: 4,
    width: { xs: '90vw', sm: '400px' },
    backdropFilter: 'blur(8px)',
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    position: 'relative',
    overflow: 'hidden',
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: '4px',
      background: yellowGradient,
    },
  };

  const yellowContained = {
    backgroundColor: '#f8a825',
    color: '#fff',
    '&:hover': {
      backgroundColor: '#facc15',
    },
  };

  const yellowOutlined = {
    borderColor: '#f8a825',
    color: '#f8a825',
    '&:hover': {
      backgroundColor: '#f8a825',
      color: '#fff',
    },
  };

  return (
    <>
      {step === "form" && (
        <Paper elevation={6} sx={paperStyles}>
          <Typography component="h1" variant="h4" sx={{
            textAlign: 'center', mb: 3,
            background: yellowGradient,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
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
              label="Email"
              variant="standard"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'flex-end', mb: 2 }}>
            <AccountCircle sx={{ color: 'action.active', mr: 1 }} />
            <TextField
              label="Username"
              variant="standard"
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Box>

          <FormControl sx={{ m: 1, width: '100%' }} variant="standard">
            <InputLabel>Password</InputLabel>
            <Input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>

          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <Button variant="contained" fullWidth onClick={handleSubmit} sx={yellowContained}>
              Sign Up
            </Button>
          </Box>

          <Box sx={{ mt: 3 }}>
            <Bottom warning="Already have an account?" buttonText="Sign in" to="/signin" />
          </Box>
        </Paper>
      )}

      {step === "confirm" && (
        <Paper elevation={6} sx={paperStyles}>
          <TextField label="Email" fullWidth value={email} disabled variant="standard" sx={{ mb: 2 }} />
          <TextField label="Username" fullWidth value={name} disabled variant="standard" sx={{ mb: 2 }} />
          <FormControl variant="standard" fullWidth>
            <InputLabel>Password</InputLabel>
            <Input type="password" value={password} disabled />
          </FormControl>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
            <Button variant="outlined" onClick={() => setStep("form")} sx={yellowOutlined}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                strokeWidth="1.5" stroke="currentColor" className="size-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
              </svg>
            </Button>
            <LoadingButton loading={loading} variant="contained" onClick={handleSendOtp} sx={yellowContained}>
              Send OTP
            </LoadingButton>
          </Box>
        </Paper>
      )}

      {step === "otp" && (
        <Paper elevation={6} sx={paperStyles}>
          <Typography variant="body1" mb={2}>
            Enter the OTP sent to <b>{email}</b>
          </Typography>
          <InputOTP
            maxLength={4}
            value={otp}
            onChange={(value) => setOtp(value)}
          >
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
            </InputOTPGroup>
          </InputOTP>
          {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
            <Button variant="outlined" onClick={handleSendOtp} sx={yellowOutlined}>Resend OTP</Button>
            <LoadingButton loading={loading} variant="contained" onClick={handleVerifyOtp} sx={yellowContained}>
              Verify
            </LoadingButton>
          </Box>
        </Paper>
      )}
    </>
  );
}


