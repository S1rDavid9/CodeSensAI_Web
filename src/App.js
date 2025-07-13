import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
import LandingPage from './pages/LandingPage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import OnboardingPage from './pages/OnboardingPage';
import ProfilePage from './pages/ProfilePage';
import DashboardPage from './pages/DashboardPage';
import QuizzesPage from './pages/QuizzesPage';
import SandboxPage from './pages/SandboxPage';
import ProgressPage from './pages/ProgressPage';
import SettingsPage from './pages/SettingsPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import SensaiMascot from './components/SensaiMascot';
import WelcomeBanner from './components/WelcomeBanner';
import { UserProvider } from './UserContext';
import { ThemeProvider as CustomThemeProvider } from './ThemeContext';

const theme = {
  colors: {
    primary: '#8e44ad',
    secondary: '#a569bd',
    background: '#fff',
    accent: '#f3e6fa',
    text: '#333',
  },
};

const AppContainer = styled.div`
  min-height: 100vh;
  background: var(--background);
  display: flex;
  flex-direction: column;
`;

const MainContent = styled.main`
  padding-top: 0;
  flex: 1;
  display: flex;
  flex-direction: column;
`;

// Component to handle mascot expressions based on route
const AppWithMascot = () => {
  const location = useLocation();
  const [showWelcome, setShowWelcome] = useState(true);
  const [mascotState, setMascotState] = useState({
    expression: 'happy',
    message: '',
    isCelebrating: false,
    isThinking: false
  });

  useEffect(() => {
    // Set mascot expression based on current route
    const path = location.pathname;
    
    if (path === '/') {
      setMascotState({
        expression: 'happy',
        message: 'Welcome to CodeSensAI! Ready to start your coding journey? 🌟',
        isCelebrating: false,
        isThinking: false
      });
    } else if (path === '/login') {
      setMascotState({
        expression: 'thinking',
        message: 'Welcome back! Let us get you logged in! 🔑',
        isCelebrating: false,
        isThinking: true
      });
    } else if (path === '/register') {
      setMascotState({
        expression: 'excited',
        message: 'Yay! A new coder joining our community! 🎉',
        isCelebrating: true,
        isThinking: false
      });
    } else if (path === '/onboarding') {
      setMascotState({
        expression: 'happy',
        message: 'Tell me about yourself! I want to personalize your learning! 📝',
        isCelebrating: false,
        isThinking: false
      });
    } else if (path === '/dashboard') {
      setMascotState({
        expression: 'happy',
        message: 'Great to see you back! How is your coding journey going? 🚀',
        isCelebrating: false,
        isThinking: false
      });
    } else if (path === '/quizzes') {
      setMascotState({
        expression: 'thinking',
        message: 'Time for some fun challenges! You can do it! 💪',
        isCelebrating: false,
        isThinking: true
      });
    } else if (path === '/profile') {
      setMascotState({
        expression: 'happy',
        message: 'Looking good! Your profile is amazing! ✨',
        isCelebrating: false,
        isThinking: false
      });
    } else {
      setMascotState({
        expression: 'happy',
        message: 'Hello there! How can I help you today? 🌟',
        isCelebrating: false,
        isThinking: false
      });
    }
  }, [location.pathname]);

  const handleMascotClick = () => {
    // Random encouraging messages when clicked
    const messages = [
      "You are doing amazing! Keep coding! 🌟",
      "Every bug is just a learning opportunity! 🐛✨",
      "You are becoming a coding superstar! ⭐",
      "Remember, even the best coders started as beginners! 💪",
      "Your persistence is inspiring! Keep going! 🚀",
      "You have got this! Coding is fun! 🎉"
    ];
    
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    
    setMascotState(prev => ({
      ...prev,
      message: randomMessage,
      isCelebrating: true
    }));
  };

  return (
    <AppContainer>
      {showWelcome && <WelcomeBanner show={showWelcome} onClose={() => setShowWelcome(false)} />}
      <Navbar />
      <MainContent>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/onboarding" element={<OnboardingPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/quizzes" element={<QuizzesPage />} />
          <Route path="/sandbox" element={<SandboxPage />} />
          <Route path="/progress" element={<ProgressPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          {/* More routes coming soon */}
        </Routes>
      </MainContent>
      
      <Footer />
      
      <SensaiMascot 
        expression={mascotState.expression}
        message={mascotState.message}
        isCelebrating={mascotState.isCelebrating}
        isThinking={mascotState.isThinking}
        onClick={handleMascotClick}
      />
    </AppContainer>
  );
};

function App() {
  return (
    <CustomThemeProvider>
      <ThemeProvider theme={theme}>
        <UserProvider>
          <Router>
            <AppWithMascot />
          </Router>
        </UserProvider>
      </ThemeProvider>
    </CustomThemeProvider>
  );
}

export default App;
