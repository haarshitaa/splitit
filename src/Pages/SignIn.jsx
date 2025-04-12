// this is the normal running code without any animation
// import { useNavigate } from "react-router-dom";
// import Typography from '@mui/material/Typography';
// import React, { useState, useEffect } from 'react';
// import Box from '@mui/material/Box';
// import TextField from '@mui/material/TextField';
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

// export function SignIn() {
//     const navigate = useNavigate();
//     const [showPassword, setShowPassword] = useState(false);
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState("");  

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
//         if (email === "" || password === "") {
//             setError("Please fill all the credentials.");
//         } else {
//             setLoading(true);
//             try {
//                 const response = await axios.post("https://splititb.harshitacodes.workers.dev/signin", {
//                     email,
//                     password
//                 });
//                 if(response.data.message === "No user found"){
//                     setError("This email is not registered."),
//                     setLoading(false);
//                     return;
//                 }

//                 if(response.data.token){
//                     localStorage.setItem("token",response.data.token);
//                     localStorage.setItem("user", JSON.stringify(response.data.data));
//                     navigate('/dashboard');
//                 }else{
//                     setError("Failed to sign in. Please try again.");
//                 }
//             } catch (err) {
//                 console.error("Error during signin", err);
//                 setError("An error occurred during signin.");
//                 setLoading(false);
//             }
//         }
//     };

//     return (
//         <>
//             <div>
//                 {/* Sign In Header */}
//                 <Typography
//                     component="h1"
//                     variant="h4"
//                     sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
//                 >
//                     Sign In
//                 </Typography>
//                 <br />

//                 {/* Email input */}
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

//                 {/* Password input */}
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

//                 {/* Error alert */}
//                 {error && (
//                     <Alert severity="error">{error}</Alert>
//                 )}

//                 {/* Submit button */}
//                 {loading ? (
//                     <LoadingButton loading variant="outlined">
//                         Submit
//                     </LoadingButton>
//                 ) : (
//                     <Button
//                         variant="contained"
//                         onClick={handleSubmit}
//                     >
//                         Sign In
//                     </Button>
//                 )}
//             </div>

//             {/* Bottom section */}
//             <div>
//                 <Bottom warning={"Don't have an account?"} buttonText={"Sign Up"} to={"/signup"} />
//             </div>
//         </>
//     );
// }

//make changes in ui by yourself
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
import { useSpring, animated, config } from '@react-spring/web';
import { styled } from '@mui/system';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';

// Styled components
const AnimatedContainer = styled(animated.div)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100vh',
  padding: '2rem',
  background: 'linear-gradient(135deg, #1a237e 0%, #283593 50%, #3949ab 100%)',
});

const Card = styled(animated.div)({
  backgroundColor: 'rgba(255, 255, 255, 0.1)',
  borderRadius: '24px',
  padding: '2.5rem',
  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
  width: '100%',
  maxWidth: '450px',
  position: 'relative',
  overflow: 'hidden',
  zIndex: 1,
  border: '1px solid rgba(255, 255, 255, 0.2)',
  backdropFilter: 'blur(10px)',
});

const FloatingCoins = styled(animated.div)({
  position: 'absolute',
  width: '40px',
  height: '40px',
  background: 'radial-gradient(circle, rgba(255, 215, 0, 0.6) 30%, transparent 70%)',
  borderRadius: '50%',
  filter: 'blur(1px)',
});

export function SignIn() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const containerAnimation = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: config.slow
  });

  const cardAnimation = useSpring({
    from: { transform: 'translateY(50px)', opacity: 0 },
    to: { transform: 'translateY(0)', opacity: 1 },
    config: config.wobbly,
    delay: 200
  });

  const buttonAnimation = useSpring({
    from: { scale: 0.9 },
    to: { scale: 1 },
    config: config.gentle,
  });

  const coins = Array(20).fill().map((_, i) => {
    const anim = useSpring({
      from: {
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        opacity: 0
      },
      to: async next => {
        while (1) {
          await next({
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            opacity: 0.7,
            config: { duration: 5000 + Math.random() * 5000 }
          });
          await next({
            opacity: 0.3,
            config: { duration: 2000 }
          });
        }
      },
      config: config.slow
    });
    return <FloatingCoins key={i} style={anim} />;
  });

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => event.preventDefault();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) navigate("/dashboard");
  }, [navigate]);

  const handleSubmit = async () => {
    if (email === "" || password === "") {
      setError("Please fill all the credentials.");
    } else {
      setLoading(true);
      try {
        const response = await axios.post("https://splititb.harshitacodes.workers.dev/signin", {
          email,
          password
        });
        if (response.data.message === "No user found") {
          setError("This email is not registered.");
          setLoading(false);
          return;
        }
        if (response.data.token) {
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("user", JSON.stringify(response.data.data));
          navigate('/dashboard');
        } else {
          setError("Failed to sign in. Please try again.");
        }
      } catch (err) {
        console.error("Error during signin", err);
        setError("An error occurred during signin.");
      }
      setLoading(false);
    }
  };

  return (
    <AnimatedContainer style={containerAnimation}>
      {coins}
      <Particles />
      <Card style={cardAnimation}>
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
          <CurrencyExchangeIcon 
            sx={{ 
              fontSize: 60, 
              color: 'white',
              transform: 'rotate(20deg)'
            }} 
          />
        </Box>

        <Typography
          component="h1"
          variant="h4"
          align="center"
          sx={{ 
            mb: 3,
            fontWeight: 'bold',
            color: 'white'
          }}
        >
          Welcome to SplitIt
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'flex-end', mb: 3 }}>
          <MailIcon sx={{ color: 'white', mr: 1, my: 0.5 }} />
          <TextField
            id="email"
            label="Email"
            variant="standard"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            InputLabelProps={{ style: { color: 'white' } }}
            InputProps={{ style: { color: 'white' } }}
          />
        </Box>

        <FormControl sx={{ mb: 3, width: '100%' }} variant="standard">
          <InputLabel htmlFor="password" sx={{ color: 'white' }}>Password</InputLabel>
          <Input
            id="password"
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton 
                  onClick={handleClickShowPassword} 
                  onMouseDown={handleMouseDownPassword}
                  sx={{ color: 'white' }}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ color: 'white' }}
          />
        </FormControl>

        {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          {loading ? (
            <LoadingButton loading variant="contained">Signing In...</LoadingButton>
          ) : (
            <animated.div style={buttonAnimation}>
              <Button
                variant="contained"
                onClick={handleSubmit}
                sx={{
                  background: 'rgba(255, 255, 255, 0.2)',
                  color: 'white',
                  fontWeight: 'bold',
                  borderRadius: '20px',
                  padding: '10px 30px',
                  '&:hover': {
                    background: 'rgba(255, 255, 255, 0.3)',
                  }
                }}
              >
                Sign In
              </Button>
            </animated.div>
          )}
        </Box>

        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          flexDirection: 'column', 
          mt: 3, 
          p: 2, 
          borderRadius: '16px', 
          background: 'rgba(255, 255, 255, 0.1)', 
          border: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          <Typography variant="body1" sx={{ color: 'white', mb: 1 }}>
            Don't have an account?
          </Typography>
          <Button 
            variant="contained" 
            onClick={() => navigate('/signup')}
            sx={{ 
              background: 'rgba(255, 255, 255, 0.2)',
              color: 'white',
              fontWeight: 'bold',
              borderRadius: '20px',
              padding: '10px 30px',
              '&:hover': {
                background: 'rgba(255, 255, 255, 0.3)',
              }
            }}
          >
            Sign Up
          </Button>
        </Box>
      </Card>
    </AnimatedContainer>
  );
}

// Particles Component
const Particles = () => {
  const particles = Array(20).fill().map((_, i) => {
    const anim = useSpring({ from: { opacity: 0 }, to: { opacity: 0.4 }, loop: { reverse: true } });
    return <animated.div key={i} style={{ 
      position: 'absolute', 
      background: 'rgba(255, 255, 255, 0.5)', 
      borderRadius: '50%', 
      opacity: anim.opacity,
      width: `${Math.random() * 10 + 5}px`,
      height: `${Math.random() * 10 + 5}px`,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
    }} />;
  });

  return <>{particles}</>;
};
