// this isssssss wooorrrrrrrrrrkiiingggggggg without anyyyy animationnnn
// import { useNavigate } from "react-router-dom";

// export function Home() {
//     const navigate = useNavigate();

//     return (
//         <div>
//             WELCOME TO SPLIT IT
//             <br/> <br /><br /><br />
//             <button onClick={() => navigate("/signup")}>
//                 Get Started
//             </button>
//         </div>
//     );
// }




import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useSpring, animated, config } from '@react-spring/web';
import { Button, Typography, Box, Container } from '@mui/material';
import { useTheme, createTheme, ThemeProvider } from '@mui/material/styles';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import GroupsIcon from '@mui/icons-material/Groups';
import ReceiptIcon from '@mui/icons-material/Receipt';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

// Fun yet serious color palette
const theme = createTheme({
  palette: {
    primary: {
      main: '#6C63FF', // Vibrant purple-blue
      light: '#8D85FF',
      dark: '#564FC9'
    },
    secondary: {
      main: '#FF6584', // Playful pink
      light: '#FF8A9D',
      dark: '#E64C6D'
    },
    background: {
      default: '#F9FAFF', // Very light purple tint
      paper: '#FFFFFF'
    },
    text: {
      primary: '#2D3748',
      secondary: '#718096'
    }
  },
  typography: {
    fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          textTransform: 'none',
          fontWeight: 600,
          padding: '10px 24px'
        }
      }
    }
  }
});

// Animated background with floating elements
const AnimatedBackground = () => {
  const shapes = ['💰', '🧾', '💸', '💳', '📊', '💲'];
  const particles = Array.from({ length: 25 }).map((_, i) => {
    const animation = useSpring({
      from: {
        transform: `translate(${Math.random() * 120 - 10}vw, ${Math.random() * 120 - 10}vh) rotate(0deg) scale(0)`,
        opacity: 0
      },
      to: {
        transform: `translate(${Math.random() * 120 - 10}vw, ${Math.random() * 120 - 10}vh) rotate(${Math.random() * 360}deg) scale(${0.5 + Math.random() * 0.5})`,
        opacity: 0.7
      },
      config: { 
        mass: 1,
        tension: 20,
        friction: 10,
        duration: 20000 + Math.random() * 10000
      },
      loop: { reverse: true }
    });

    return (
      <animated.div
        key={i}
        style={{
          position: 'absolute',
          fontSize: `${1.5 + Math.random() * 2}rem`,
          zIndex: 0,
          pointerEvents: 'none',
          filter: 'drop-shadow(0 0 8px rgba(0,0,0,0.1))',
          ...animation
        }}
      >
        {shapes[Math.floor(Math.random() * shapes.length)]}
      </animated.div>
    );
  });

  return <>{particles}</>;
};

// Feature Card with playful bounce
const FeatureCard = ({ icon, title, description, animationDelay }) => {
  const [hovered, setHovered] = useState(false);
  
  const animation = useSpring({
    from: { 
      opacity: 0, 
      transform: 'translateY(40px) scale(0.95)',
      boxShadow: '0 4px 6px rgba(0,0,0,0.05)'
    },
    to: { 
      opacity: 1, 
      transform: 'translateY(0) scale(1)',
      boxShadow: hovered ? '0 15px 30px rgba(108, 99, 255, 0.2)' : '0 8px 15px rgba(0,0,0,0.1)'
    },
    delay: animationDelay,
    config: config.wobbly
  });

  return (
    <animated.div 
      style={animation}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Box sx={{
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderRadius: 3,
        p: 3,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        border: '1px solid rgba(0,0,0,0.05)',
        transition: 'all 0.3s ease',
      }}>
        <Box sx={{
          mb: 2,
          color: hovered ? 'secondary.main' : 'primary.main',
          transform: hovered ? 'scale(1.2) rotate(5deg)' : 'scale(1)',
          transition: 'all 0.3s cubic-bezier(0.68, -0.55, 0.27, 1.55)'
        }}>
          {icon}
        </Box>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 700 }}>
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </Box>
    </animated.div>
  );
};

export function Home() {
  const navigate = useNavigate();
  const theme = useTheme();
  
  // Title animation
  const titleAnimation = useSpring({
    from: { 
      opacity: 0, 
      transform: 'translateY(-40px) scale(0.9)',
      textShadow: '0 0 0 rgba(0,0,0,0)'
    },
    to: { 
      opacity: 1, 
      transform: 'translateY(0) scale(1)',
      textShadow: '0 5px 15px rgba(108, 99, 255, 0.3)'
    },
    config: config.wobbly
  });

  // Button animation
  const [buttonHovered, setButtonHovered] = useState(false);
  const buttonAnimation = useSpring({
    transform: buttonHovered ? 'scale(1.05) rotate(-2deg)' : 'scale(1)',
    boxShadow: buttonHovered 
      ? '0 10px 25px rgba(255, 101, 132, 0.3)' 
      : '0 5px 15px rgba(108, 99, 255, 0.2)',
    config: config.gentle
  });

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{
        minHeight: '100vh',
        background: `linear-gradient(135deg, ${theme.palette.background.default} 0%, #EDF2F7 100%)`,
        position: 'relative',
        overflow: 'hidden',
        pt: { xs: 10, md: 15 },
        pb: 10
      }}>
        <AnimatedBackground />
        
        <Container maxWidth="lg">
        <Box sx={{ 
  textAlign: 'center',
  mb: { xs: 4, md: 6 }, 
  position: 'relative',
  zIndex: 1
}}>

            <animated.div style={titleAnimation}>
              <Typography variant="h2" component="h1" sx={{ 
                fontWeight: 900,
                mb: 3,
                letterSpacing: '-0.03em',
                background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontSize: { xs: '2.5rem', md: '3.5rem' }
              }}>
                Split Expenses the Fun Way
              </Typography>
              <Typography variant="h5" component="h2" sx={{ 
                mb: 4,
                color: 'text.secondary',
                maxWidth: '700px',
                mx: 'auto',
                fontWeight: 400,
                lineHeight: 1.6
              }}>
                No more awkward money talks - just easy splitting with friends
              </Typography>
            </animated.div>
            
            <animated.div
              onMouseEnter={() => setButtonHovered(true)}
              onMouseLeave={() => setButtonHovered(false)}
              style={buttonAnimation}
            >
            </animated.div>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: { xs: 3, md: 5 }, mb: { xs: 4, md: 6 } }}>

  <Button
    variant="contained"
    size="large"
    onClick={() => navigate("/signup")}
    sx={{
      px: 6,
      py: 1.5,
      fontSize: '1.1rem',
      borderRadius: '12px',
      fontWeight: 700,
      letterSpacing: '0.03em',
      background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
      '&:hover': {
        transform: 'scale(1.05) rotate(-2deg)'
      },
      transition: 'all 0.3s ease'
    }}
  >
    Get Started — It's Free
  </Button>
</Box>

<Box sx={{ 
  display: 'grid',
  gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'repeat(4, 1fr)' },
  gap: 4,
  mt: { xs: 2, md: 3 },
  position: 'relative',
  zIndex: 1
}}>


            <FeatureCard
              icon={<GroupsIcon sx={{ fontSize: '3.5rem' }} />}
              title="Group Splits"
              description="Split dinner bills, rent, or trips with ease"
              animationDelay={100}
            />
            <FeatureCard
              icon={<ReceiptIcon sx={{ fontSize: '3.5rem' }} />}
              title="Track Expenses"
              description="See who paid for what in your group"
              animationDelay={200}
            />
            <FeatureCard
              icon={<AccountBalanceIcon sx={{ fontSize: '3.5rem' }} />}
              title="Clear Balances"
              description="Know exactly who owes whom"
              animationDelay={300}
            />
            <FeatureCard
              icon={<TrendingUpIcon sx={{ fontSize: '3.5rem' }} />}
              title="Smart Insights"
              description="Visualize your spending habits"
              animationDelay={400}
            />
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
}


