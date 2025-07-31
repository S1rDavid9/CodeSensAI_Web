import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../UserContext';
import { ThemeContext } from '../ThemeContext';

const Nav = styled.nav`
  background: var(--gradient-primary);
  color: #fff;
  padding: 1rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: var(--shadow-lg);
  position: sticky;
  top: 0;
  z-index: 1000;
  backdrop-filter: blur(10px);
`;

const Logo = styled.div`
  font-size: 1.8rem;
  font-weight: 700;
  letter-spacing: 1px;
  font-family: 'Fredoka', 'Poppins', Arial, sans-serif;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &::before {
    content: '🌟';
    font-size: 1.5rem;
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 1rem;
  font-size: 1rem;
  align-items: center;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;
  
  @media (max-width: 768px) {
    display: block;
  }
`;

const MobileMenu = styled.div`
  display: ${props => props.isOpen ? 'flex' : 'none'};
  flex-direction: column;
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: var(--surface-white);
  box-shadow: var(--shadow-xl);
  padding: 1rem;
  gap: 0.5rem;
  border-radius: 0 0 var(--radius-lg) var(--radius-lg);
  
  @media (max-width: 768px) {
    display: ${props => props.isOpen ? 'flex' : 'none'};
  }
`;

const StyledLink = styled(Link)`
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
  padding: 0.6em 1.2em;
  border-radius: var(--radius-lg);
  font-weight: 600;
  transition: all 0.3s ease;
  text-decoration: none;
  border: 2px solid transparent;
  backdrop-filter: blur(10px);
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-2px);
    box-shadow: var(--shadow-md);
  }
  
  &.active {
    background: rgba(255, 255, 255, 0.2);
    border-color: rgba(255, 255, 255, 0.3);
  }
`;

const LogoutButton = styled.button`
  background: rgba(239, 68, 68, 0.9);
  color: #fff;
  padding: 0.6em 1.2em;
  border-radius: var(--radius-lg);
  font-weight: 600;
  transition: all 0.3s ease;
  text-decoration: none;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  backdrop-filter: blur(10px);
  
  &:hover {
    background: rgba(239, 68, 68, 1);
    transform: translateY(-2px);
    box-shadow: var(--shadow-md);
  }
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: #fff;
  font-size: 1rem;
  background: rgba(255, 255, 255, 0.1);
  padding: 0.5rem 1rem;
  border-radius: var(--radius-lg);
  backdrop-filter: blur(10px);
`;

const UserAvatar = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: var(--radius-full);
  background: var(--gradient-secondary);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  font-weight: 600;
  box-shadow: var(--shadow-sm);
`;

const UserName = styled.span`
  font-weight: 600;
  max-width: 120px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const ThemeToggleButton = styled.button`
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
  padding: 0.6em 1.2em;
  border-radius: var(--radius-lg);
  font-weight: 600;
  transition: all 0.3s ease;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-2px);
    box-shadow: var(--shadow-md);
  }
`;

const Navbar = () => {
  const { user, logout, isAuthenticated } = useUser();
  const { theme, toggleTheme } = useContext(ThemeContext);
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/');
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const getInitials = (username) => {
    return username ? username.charAt(0).toUpperCase() : 'U';
  };

  return (
    <Nav>
      <Logo>CodeSensAI</Logo>
      
      <MobileMenuButton onClick={toggleMobileMenu}>
        {isMobileMenuOpen ? '✕' : '☰'}
      </MobileMenuButton>
      
      <NavLinks>
        <StyledLink to="/">🏠 Home</StyledLink>
        
        {isAuthenticated ? (
          <>
            <UserInfo>
              <UserAvatar>{getInitials(user?.username)}</UserAvatar>
              <UserName>{user?.username}</UserName>
            </UserInfo>
            {user?.role === 'parent' ? (
              <>
                <StyledLink to="/parent-dashboard">👨‍👧‍👦 Parent Dashboard</StyledLink>
                <StyledLink to="/profile">👤 Profile</StyledLink>
                <ThemeToggleButton onClick={toggleTheme}>
                  {theme === "light" ? "🌙" : "☀️"} {theme === "light" ? "Dark" : "Light"}
                </ThemeToggleButton>
                <LogoutButton onClick={handleLogout}>🚪 Logout</LogoutButton>
              </>
            ) : (
              <>
                <StyledLink to="/dashboard">📊 Dashboard</StyledLink>
                <StyledLink to="/quizzes">🧩 Quizzes</StyledLink>
                <StyledLink to="/sandbox">💻 Sandbox</StyledLink>
                <StyledLink to="/profile">👤 Profile</StyledLink>
                <ThemeToggleButton onClick={toggleTheme}>
                  {theme === "light" ? "🌙" : "☀️"} {theme === "light" ? "Dark" : "Light"}
                </ThemeToggleButton>
                <LogoutButton onClick={handleLogout}>🚪 Logout</LogoutButton>
              </>
            )}
          </>
        ) : (
          <>
            <StyledLink to="/login">🔑 Login</StyledLink>
            <StyledLink to="/register">✨ Register</StyledLink>
            <ThemeToggleButton onClick={toggleTheme}>
              {theme === "light" ? "🌙" : "☀️"} {theme === "light" ? "Dark" : "Light"}
            </ThemeToggleButton>
          </>
        )}
      </NavLinks>
      
      <MobileMenu isOpen={isMobileMenuOpen}>
        <StyledLink to="/" onClick={() => setIsMobileMenuOpen(false)}>🏠 Home</StyledLink>
        
        {isAuthenticated ? (
          <>
            <StyledLink to="/dashboard" onClick={() => setIsMobileMenuOpen(false)}>📊 Dashboard</StyledLink>
            <StyledLink to="/quizzes" onClick={() => setIsMobileMenuOpen(false)}>🧩 Quizzes</StyledLink>
            <StyledLink to="/sandbox" onClick={() => setIsMobileMenuOpen(false)}>💻 Sandbox</StyledLink>
            <StyledLink to="/profile" onClick={() => setIsMobileMenuOpen(false)}>👤 Profile</StyledLink>
            <ThemeToggleButton onClick={() => { toggleTheme(); setIsMobileMenuOpen(false); }}>
              {theme === "light" ? "🌙" : "☀️"} {theme === "light" ? "Dark" : "Light"}
            </ThemeToggleButton>
            <LogoutButton onClick={handleLogout}>🚪 Logout</LogoutButton>
          </>
        ) : (
          <>
            <StyledLink to="/login" onClick={() => setIsMobileMenuOpen(false)}>🔑 Login</StyledLink>
            <StyledLink to="/register" onClick={() => setIsMobileMenuOpen(false)}>✨ Register</StyledLink>
            <ThemeToggleButton onClick={() => { toggleTheme(); setIsMobileMenuOpen(false); }}>
              {theme === "light" ? "🌙" : "☀️"} {theme === "light" ? "Dark" : "Light"}
            </ThemeToggleButton>
          </>
        )}
      </MobileMenu>
    </Nav>
  );
};

export default Navbar; 