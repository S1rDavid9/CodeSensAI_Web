import React, { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useUser } from '../UserContext';
import { ThemeContext } from '../ThemeContext';
import { 
  FaUser, 
  FaChartBar, 
  FaPuzzlePiece, 
  FaCode, 
  FaCog, 
  FaGraduationCap,
  FaBars,
  FaTimes,
  FaMoon,
  FaSun
} from 'react-icons/fa';

const SidebarContainer = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  height: 100vh;
  width: ${props => props.isOpen ? '280px' : '80px'};
  background: var(--surface-white);
  box-shadow: var(--shadow-lg);
  transition: width 0.3s ease;
  z-index: 1000;
  overflow: hidden;
  
  @media (max-width: 768px) {
    width: ${props => props.isOpen ? '280px' : '0px'};
    transform: translateX(${props => props.isOpen ? '0' : '-100%'});
  }
`;

const SidebarHeader = styled.div`
  padding: 1.5rem;
  border-bottom: 1px solid var(--surface-light);
  display: flex;
  align-items: center;
  justify-content: ${props => props.isOpen ? 'space-between' : 'center'};
  min-height: 80px;
`;

const Logo = styled.div`
  font-size: ${props => props.isOpen ? '1.5rem' : '1.2rem'};
  font-weight: 700;
  color: var(--primary-purple);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  white-space: nowrap;
  
  &::before {
    content: '🌟';
    font-size: ${props => props.isOpen ? '1.3rem' : '1rem'};
  }
`;

const MobileToggleButton = styled.button`
  position: fixed;
  top: 1rem;
  left: 1rem;
  background: var(--primary-purple);
  border: none;
  color: white;
  font-size: 1.2rem;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: var(--radius-md);
  z-index: 1001;
  display: none;
  
  @media (max-width: 768px) {
    display: block;
  }
`;

const DesktopToggleButton = styled.button`
  position: fixed;
  top: 1rem;
  left: 1rem;
  background: var(--primary-purple);
  border: none;
  color: white;
  font-size: 1.2rem;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: var(--radius-md);
  z-index: 1001;
  display: block;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const UserSection = styled.div`
  padding: 1rem 1.5rem;
  border-bottom: 1px solid var(--surface-light);
  display: flex;
  align-items: center;
  gap: 0.8rem;
  opacity: ${props => props.isOpen ? '1' : '0'};
  transition: opacity 0.3s ease;
`;

const UserAvatar = styled.div`
  width: 40px;
  height: 40px;
  background: var(--accent-pink);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 1rem;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
`;

const UserName = styled.span`
  font-weight: 600;
  color: var(--text-primary);
  font-size: 0.9rem;
`;

const UserRole = styled.span`
  font-size: 0.8rem;
  color: var(--text-secondary);
  text-transform: capitalize;
`;

const NavSection = styled.div`
  padding: 1rem 0;
  flex: 1;
  overflow-y: auto;
`;

const NavItem = styled(Link)`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.8rem 1.5rem;
  color: var(--text-secondary);
  text-decoration: none;
  transition: all 0.2s ease;
  border-left: 3px solid transparent;
  white-space: nowrap;
  
  &:hover {
    background: var(--surface-light);
    color: var(--primary-purple);
    border-left-color: var(--primary-purple);
  }
  
  &.active {
    background: var(--surface-purple);
    color: var(--primary-purple);
    border-left-color: var(--primary-purple);
    font-weight: 600;
  }
  
  .icon {
    font-size: 1.2rem;
    min-width: 20px;
  }
  
  .label {
    opacity: ${props => props.isOpen ? '1' : '0'};
    transition: opacity 0.3s ease;
  }
`;

const BottomSection = styled.div`
  padding: 1rem 1.5rem;
  border-top: 1px solid var(--surface-light);
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const ThemeToggle = styled.button`
  display: flex;
  align-items: center;
  gap: 1rem;
  background: none;
  border: none;
  color: var(--text-secondary);
  padding: 0.8rem;
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
  
  &:hover {
    background: var(--surface-light);
    color: var(--primary-purple);
  }
  
  .icon {
    font-size: 1.1rem;
    min-width: 20px;
  }
  
  .label {
    opacity: ${props => props.isOpen ? '1' : '0'};
    transition: opacity 0.3s ease;
  }
`;

const LogoutButton = styled.button`
  display: flex;
  align-items: center;
  gap: 1rem;
  background: none;
  border: none;
  color: var(--error);
  padding: 0.8rem;
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
  
  &:hover {
    background: var(--surface-light);
  }
  
  .icon {
    font-size: 1.1rem;
    min-width: 20px;
  }
  
  .label {
    opacity: ${props => props.isOpen ? '1' : '0'};
    transition: opacity 0.3s ease;
  }
`;

const MainContent = styled.div`
  margin-left: ${props => props.isOpen ? '280px' : '80px'};
  transition: margin-left 0.3s ease;
  min-height: 100vh;
  width: calc(100vw - ${props => props.isOpen ? '280px' : '80px'});
  overflow-x: hidden;
  
  @media (max-width: 768px) {
    margin-left: 0;
    width: 100vw;
  }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
  display: ${props => props.isOpen ? 'block' : 'none'};
  
  @media (min-width: 769px) {
    display: none;
  }
`;

const Sidebar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);
  const { user, logout } = useUser();
  const { theme, toggleTheme } = useContext(ThemeContext);
  const location = useLocation();
  const navigate = useNavigate();

  // Auto-close sidebar when navigating to a new page
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const getInitials = (username) => {
    return username ? username.substring(0, 2).toUpperCase() : 'U';
  };

  const getNavItems = () => {
    if (!user) return [];

    if (user.role === 'parent') {
      return [
        { path: '/parent-dashboard', label: 'Dashboard', icon: <FaChartBar /> },
        { path: '/profile', label: 'Profile', icon: <FaUser /> },
        { path: '/settings', label: 'Settings', icon: <FaCog /> },
      ];
    } else {
      return [
        { path: '/dashboard', label: 'Dashboard', icon: <FaChartBar /> },
        { path: '/quizzes', label: 'Quizzes', icon: <FaPuzzlePiece /> },
        { path: '/sandbox', label: 'Sandbox', icon: <FaCode /> },
        { path: '/progress', label: 'Progress', icon: <FaGraduationCap /> },
        { path: '/profile', label: 'Profile', icon: <FaUser /> },
        { path: '/settings', label: 'Settings', icon: <FaCog /> },
      ];
    }
  };

  return (
    <>
      <MobileToggleButton onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <FaTimes /> : <FaBars />}
      </MobileToggleButton>
      
      <DesktopToggleButton onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <FaTimes /> : <FaBars />}
      </DesktopToggleButton>
      
      <SidebarContainer isOpen={isOpen}>
        <SidebarHeader isOpen={isOpen}>
          <Logo isOpen={isOpen}>CodeSensAI</Logo>
        </SidebarHeader>

        {user && (
          <UserSection isOpen={isOpen}>
            <UserAvatar>{getInitials(user.username)}</UserAvatar>
            <UserInfo>
              <UserName>{user.username}</UserName>
              <UserRole>{user.role}</UserRole>
            </UserInfo>
          </UserSection>
        )}

        <NavSection>
          {getNavItems().map((item) => (
            <NavItem
              key={item.path}
              to={item.path}
              isOpen={isOpen}
              className={location.pathname === item.path ? 'active' : ''}
            >
              <span className="icon">{item.icon}</span>
              <span className="label">{item.label}</span>
            </NavItem>
          ))}
        </NavSection>

        <BottomSection>
          <ThemeToggle onClick={toggleTheme} isOpen={isOpen}>
            <span className="icon">
              {theme === 'light' ? <FaMoon /> : <FaSun />}
            </span>
            <span className="label">
              {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
            </span>
          </ThemeToggle>
          
          {user && (
            <LogoutButton onClick={handleLogout} isOpen={isOpen}>
              <span className="icon">🚪</span>
              <span className="label">Logout</span>
            </LogoutButton>
          )}
        </BottomSection>
      </SidebarContainer>

      <Overlay isOpen={isOpen} onClick={() => setIsOpen(false)} />
      
      <MainContent isOpen={isOpen}>
        {children}
      </MainContent>
    </>
  );
};

export default Sidebar; 