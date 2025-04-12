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
  background: '#fff5e9',
  overflow: 'hidden',
  position: 'relative',
});

const Card = styled(animated.div)({
  backgroundColor: 'white',
  borderRadius: '24px',
  padding: '2.5rem',
  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)',
  width: '100%',
  maxWidth: '450px',
  position: 'relative',
  overflow: 'hidden',
  zIndex: 1,
});

const FloatingCoins = styled(animated.div)({
  position: 'fixed',
  width: '40px',
  height: '40px',
  background: 'radial-gradient(circle, #FFD700 30%, transparent 70%)',
  borderRadius: '50%',
  filter: 'blur(1px)',
  pointerEvents: 'none',
});

const ParticlesContainer = styled(animated.div)({
  position: 'fixed',
  width: '100%',
  height: '100%',
  top: 0,
  left: 0,
  pointerEvents: 'none',
  zIndex: 0,
});

const Particle = styled(animated.div)({
  position: 'absolute',
  background: '#f8a825',
  borderRadius: '50%',
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

  // Floating coins animation
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
            top: `${Math.max(0, Math.min(90, Math.random() * 100))}%`,
            left: `${Math.max(0, Math.min(90, Math.random() * 100))}%`,
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

  // Particles animation
  const particles = Array(30).fill().map((_, i) => {
    const size = Math.random() * 5 + 2;
    const anim = useSpring({
      from: {
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        opacity: 0,
        width: `${size}px`,
        height: `${size}px`,
      },
      to: async next => {
        while (1) {
          await next({
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            opacity: Math.random() * 0.4 + 0.1,
            config: { duration: 10000 + Math.random() * 10000 }
          });
        }
      },
      config: config.molasses
    });
    return <Particle key={`particle-${i}`} style={anim} />;
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
      <ParticlesContainer>
        {particles}
      </ParticlesContainer>
      {coins}
      <Card style={cardAnimation}>
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
          <CurrencyExchangeIcon 
            sx={{ 
              fontSize: 60, 
              color: '#f8a825',
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
            background: 'linear-gradient(to right, #f8a825, #facc15)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}
        >
          Welcome to SplitIt
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'flex-end', mb: 3 }}>
          <MailIcon sx={{ color: 'text.secondary', mr: 1, my: 0.5 }} />
          <TextField
            id="email"
            label="Email"
            variant="standard"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Box>

        <FormControl sx={{ mb: 3, width: '100%' }} variant="standard">
          <InputLabel htmlFor="password">Password</InputLabel>
          <Input
            id="password"
            type={showPassword ? 'text' : 'password'}
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
                  background: 'linear-gradient(to right, #f8a825, #facc15)',
                  color: 'white',
                  fontWeight: 'bold',
                  borderRadius: '20px',
                  padding: '10px 30px',
                  '&:hover': {
                    background: 'linear-gradient(to right, #f8a825, #facc15)',
                    filter: 'brightness(0.95)'
                  },
                  boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
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
          background: 'rgba(248, 168, 37, 0.1)',
          border: '1px solid rgba(248, 168, 37, 0.2)'
        }}>
          <Typography variant="body1" sx={{ color: 'text.secondary', mb: 1 }}>
            Don't have an account?
          </Typography>
          <Button 
            variant="contained" 
            onClick={() => navigate('/signup')}
            sx={{ 
              background: 'white',
              color: '#f8a825',
              fontWeight: 'bold',
              borderRadius: '20px',
              padding: '10px 30px',
              border: '1px solid #f8a825',
              '&:hover': {
                background: 'rgba(248, 168, 37, 0.1)',
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