import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import axios from "axios";
import { useSpring, animated, config } from '@react-spring/web';
import { Paper, Divider } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { SignUpBox } from "../Components/SignUpBox";
import { OtpBox } from "../Components/OtpBox";
import { styled } from '@mui/system';

// Styled components for particles and coins
const FloatingCoins = styled(animated.div)({
  position: 'fixed',
  width: '40px',
  height: '40px',
  background: 'radial-gradient(circle, #FFD700 30%, transparent 70%)',
  borderRadius: '50%',
  filter: 'blur(1px)',
  pointerEvents: 'none',
  zIndex: 0,
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
        duration: 20000 + Math.random() * 10000,
        tension: 20,
        friction: 5
      },
      loop: { reverse: false }
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
  const [otp, setOtp] = useState("");
  const [showsignup, setShowsignup] = useState(false);

  // Animation for the form container
  const formAnimation = useSpring({
    from: { opacity: 0, transform: 'translateY(20px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
    config: { tension: 200, friction: 20 }
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
      background: '#fff5e9',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background elements */}
      <ParticlesContainer>
        {particles}
      </ParticlesContainer>
      {coins}
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