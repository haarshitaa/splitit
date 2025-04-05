// this is the normal running code without any animation
// import { useNavigate } from "react-router-dom";
// import Typography from '@mui/material/Typography';
// import React, { useState, useEffect } from 'react';
// import Box from '@mui/material/Box';
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
// import axios from "axios";
// import { Bottom } from "../Components/bottom";

// export function SignUp() {
//     const navigate = useNavigate();
//     const [showPassword, setShowPassword] = useState(false);
//     const [email, setEmail] = useState("");
//     const [name, setName] = useState("");
//     const [password, setPassword] = useState("");
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState("");  // New state to hold error message

//     const handleClickShowPassword = () => setShowPassword((show) => !show);

//     const handleMouseDownPassword = (event) => {
//         event.preventDefault();
//     };

//     useEffect(() => {
//         const token = localStorage.getItem("token");
//         if (token) {
//             navigate("/dashboard");
//         }
//     }, [navigate]);

//     const handleSubmit = async () => {
//         if (name === "" || email === "" || password === "") {
//             setError("Please fill all the credentials.");
//             return;
//         }
    
//         setLoading(true);
    
//         try {
//             const response = await axios.post("https://splititb.harshitacodes.workers.dev/signup", {
//                 email,
//                 name,
//                 password
//             });
    
//             localStorage.setItem("token", response.data.token);
//             navigate('/dashboard');
    
//         } catch (err) {
//             console.error("Error during signup:", err);
    
//             // Check if error response exists and contains the expected message
//             if (err.response && err.response.status === 400 && err.response.data.message) {
//                 setError(err.response.data.message);
//             } else {
//                 setError("An error occurred during signup.");
//             }
    
//         } finally {
//             setLoading(false);
//         }
//     };
    

//     return (
//         <>
//             <div>
//                 {/* signup */}
//                 <Typography
//                     component="h1"
//                     variant="h4"
//                     sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
//                 >
//                     Sign Up
//                 </Typography>
//                 <br />
//                 {/* username email password */}
//                 <Box sx={{ display: 'flex', alignItems: 'flex-end', mb: 2 }}>
//                     <MailIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
//                     <TextField
//                         id="email"
//                         label="Email"
//                         variant="standard"
//                         fullWidth
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)}
//                     />
//                 </Box>

//                 <Box sx={{ display: 'flex', alignItems: 'flex-end', mb: 2 }}>
//                     <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
//                     <TextField
//                         id="username"
//                         label="Username"
//                         variant="standard"
//                         fullWidth
//                         value={name}
//                         onChange={(e) => setName(e.target.value)}
//                     />
//                 </Box>

//                 <FormControl sx={{ m: 1, width: '100%' }} variant="standard">
//                     <InputLabel htmlFor="password">Password</InputLabel>
//                     <Input
//                         id="password"
//                         type={showPassword ? 'text' : 'password'}
//                         endAdornment={
//                             <InputAdornment position="end">
//                                 <IconButton
//                                     aria-label="toggle password visibility"
//                                     onClick={handleClickShowPassword}
//                                     onMouseDown={handleMouseDownPassword}
//                                 >
//                                     {showPassword ? <VisibilityOff /> : <Visibility />}
//                                 </IconButton>
//                             </InputAdornment>
//                         }
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                     />
//                 </FormControl>

//                 {/* error alert */}
//                 {error && (
//                     <Alert severity="error">{error}</Alert>
//                 )}

//                 {/* submit button */}
//                 {loading ? (
//                     <LoadingButton loading variant="outlined">
//                         Submit
//                     </LoadingButton>
//                 ) : (
//                     <Button
//                         variant="contained"
//                         onClick={handleSubmit}
//                     >
//                         Sign Up
//                     </Button>
//                 )}
//             </div>
//             <div>
//                 <Bottom warning={"Already have an account?"} buttonText={"Sign in"} to={"/signin"} />
//             </div>
//         </>
//     );
// }





import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import axios from "axios";

 // "form" | "confirm" | "otp"
import { useSpring, animated } from '@react-spring/web';
import { Paper, Divider } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { SignUpBox } from "../Components/SignUpBox";
import { OtpBox } from "../Components/OtpBox";


const FloatingBills = ({ count = 20 }) => {
    const bills = Array.from({ length: count }).map((_, i) => {
      
      const originSide = Math.floor(Math.random() * 4);
      
      // Generate start positions based on origin side
      let startX, startY;
      switch(originSide) {
        case 0: // left
          startX = -10;
          startY = Math.random() * 100;
          break;
        case 1: // right
          startX = 110;
          startY = Math.random() * 100;
          break;
        case 2: // top
          startX = Math.random() * 100;
          startY = -10;
          break;
        case 3: // bottom
          startX = Math.random() * 100;
          startY = 110;
          break;
      }
  
      
      const endX = 100 - (startX / 100) * 100;
      const endY = 100 - (startY / 100) * 100;
      
      const animation = useSpring({
        from: {
          transform: `translate(${startX}vw, ${startY}vh) rotate(0deg)`,
          opacity: 0
        },
        to: {
          transform: `translate(${endX}vw, ${endY}vh) rotate(${Math.random() * 360}deg)`,
          opacity: 0.5
        },
        config: { 
          duration: 20000 + Math.random() * 10000, // Longer duration
          tension: 20,
          friction: 5
        },
        loop: { reverse: false } // One-way animation
      });
  
      return (
        <animated.div
          key={i}
          style={{
            position: 'fixed',
            fontSize: '1.8rem',
            zIndex: 0,
            pointerEvents: 'none',
            userSelect: 'none',
            ...animation
          }}
        >
          {['💵', '💰', '💲'][Math.floor(Math.random() * 3)]}
        </animated.div>
      );
    });
  
    return <>{bills}</>;
  };



export function SignUp() {
    const navigate = useNavigate();
    const theme = useTheme();
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [step, setStep] = useState("form");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [otp,setOtp] = useState("");
    const [showsignup, setShowsignup] = useState(false);

    // Animation for the form container
    const formAnimation = useSpring({
      from: { opacity: 0, transform: 'translateY(20px)' },
      to: { opacity: 1, transform: 'translateY(0)' },
      config: { tension: 200, friction: 20 }
    });

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
      if (!name || !email || !password) {
        setError("Please fill all the credentials.");
        return;
      }
    
      setLoading(true);
      try {
        const res = await axios.post("https://splititb.harshitacodes.workers.dev/signup", { email, name, password });
        console.log(res.data.token);
        localStorage.setItem("token", res.data.token);
        setStep("confirm"); 
      } catch (err) {
        setError(err?.response?.data?.message || "An error occurred during signup.");
      } finally {
        setLoading(false);
      }
    };
    
  const handleSendOtp = async () => {
    setLoading(true);
    try {
      const res = await fetch("https://splititb.harshitacodes.workers.dev/sendcode", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to send OTP");

      setError("");
      setStep("otp");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp) {
      setError("Please enter the OTP.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("https://splititb.harshitacodes.workers.dev/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "OTP verification failed");

      alert("Account created successfully!");
      setError("");
      // Redirect or reset state
       navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
    

    return (
        <Box sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Background elements */}
          <FloatingBills count={8} />

          <animated.div style={formAnimation}>
      
          <SignUpBox
  email={email}
  setEmail={setEmail}
  name={name}
  setName={setName}
  password={password}
  setPassword={setPassword}
  showPassword={showPassword}
  setShowPassword={setShowPassword}
  handleClickShowPassword={handleClickShowPassword}
  handleMouseDownPassword={handleMouseDownPassword}
  handleSubmit={handleSubmit}
  loading={loading}
  error={error}
  theme={theme}
  step={step}
  setStep={setStep}
  handleSendOtp={handleSendOtp}
  handleVerifyOtp={handleVerifyOtp}
  otp={otp}
  setOtp={setOtp}
/>

          </animated.div>
        </Box>
    );
} 