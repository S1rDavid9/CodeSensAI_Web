import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { ThemeContext } from '../ThemeContext';
import Spinner from '../components/Spinner';
import { FaPalette, FaUser, FaBell, FaShieldAlt } from 'react-icons/fa';

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  background: var(--background);
  padding: 2rem 1rem;
  position: relative;
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
  
  @media (max-width: 768px) {
    padding: 1.5rem 0.75rem;
  }
  
  @media (max-width: 480px) {
    padding: 1rem 0.5rem;
  }
`;

const Title = styled.h2`
  color: var(--primary-purple);
  font-size: 2.3rem;
  margin-bottom: 0.7em;
  font-family: 'Poppins', Arial, sans-serif;
  letter-spacing: 1px;
  text-align: center;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
  
  @media (max-width: 480px) {
    font-size: 1.8rem;
  }
`;

const Subtitle = styled.h3`
  color: var(--primary-purple);
  font-size: 1.3rem;
  margin-bottom: 1.5em;
  font-family: 'Poppins', Arial, sans-serif;
  font-weight: 500;
  text-align: center;
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
  
  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;

const SettingsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  width: 100%;
  max-width: 800px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const SettingsCard = styled.div`
  background: var(--surface-white);
  border-radius: 20px;
  box-shadow: var(--shadow-md);
  padding: 2rem;
  border: 1px solid var(--surface-light);
  transition: transform 0.2s, box-shadow 0.2s;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-lg);
  }
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid var(--surface-light);
`;

const CardIcon = styled.div`
  color: var(--primary-purple);
  font-size: 1.5rem;
`;

const CardTitle = styled.h3`
  color: var(--primary-purple);
  font-size: 1.3rem;
  font-weight: 600;
  margin: 0;
`;

const SettingItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
  border-bottom: 1px solid var(--surface-light);
  
  &:last-child {
    border-bottom: none;
  }
`;

const SettingLabel = styled.div`
  color: var(--text-primary);
  font-size: 1rem;
  font-weight: 500;
`;

const SettingDescription = styled.div`
  color: var(--text-secondary);
  font-size: 0.9rem;
  margin-top: 0.3rem;
`;

const ToggleSwitch = styled.label`
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
  
  input {
    opacity: 0;
    width: 0;
    height: 0;
  }
  
  span {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: var(--surface-light);
    transition: 0.4s;
    border-radius: 34px;
    
    &:before {
      position: absolute;
      content: "";
      height: 26px;
      width: 26px;
      left: 4px;
      bottom: 4px;
      background-color: white;
      transition: 0.4s;
      border-radius: 50%;
    }
  }
  
  input:checked + span {
    background-color: var(--primary-purple);
  }
  
  input:checked + span:before {
    transform: translateX(26px);
  }
`;

const ThemeSelector = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const ThemeButton = styled.button`
  background: ${props => props.active ? 'var(--primary-purple)' : 'var(--surface-light)'};
  color: ${props => props.active ? 'white' : 'var(--text-primary)'};
  border: 2px solid ${props => props.active ? 'var(--primary-purple)' : 'var(--surface-light)'};
  border-radius: 12px;
  padding: 0.8rem 1.2rem;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background: ${props => props.active ? 'var(--primary-purple)' : 'var(--surface-purple)'};
    color: white;
  }
`;

const SaveButton = styled.button`
  background: var(--primary-purple);
  color: white;
  border: none;
  border-radius: 16px;
  padding: 1rem 2rem;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  margin-top: 2rem;
  width: 100%;
  max-width: 300px;
  
  &:hover {
    background: var(--accent-pink);
    transform: translateY(-2px);
    box-shadow: var(--shadow-lg);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const SuccessMessage = styled.div`
  background: var(--success);
  color: white;
  padding: 1rem;
  border-radius: 12px;
  text-align: center;
  font-weight: 600;
  margin-top: 1rem;
  animation: fadeIn 0.3s ease-in;
  
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

const SettingsPage = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(false);
  const [settings, setSettings] = useState({
    notifications: true,
    soundEffects: true,
    autoSave: true,
    showProgress: true
  });

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleSettingChange = (setting) => {
    setSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  if (loading) {
    return <Spinner message="Loading your settings..." />;
  }

  return (
    <Wrapper>
      <Title>Settings</Title>
      <Subtitle>Personalize your CodeSensAI experience! 🌈</Subtitle>

      <SettingsContainer>
        <SettingsCard>
          <CardHeader>
            <CardIcon><FaPalette /></CardIcon>
            <CardTitle>Appearance</CardTitle>
          </CardHeader>
          
          <SettingItem>
            <div>
              <SettingLabel>Theme</SettingLabel>
              <SettingDescription>Choose your preferred color scheme</SettingDescription>
            </div>
            <ThemeSelector>
              <ThemeButton 
                active={theme === 'light'} 
                onClick={() => toggleTheme('light')}
              >
                ☀️ Light
              </ThemeButton>
              <ThemeButton 
                active={theme === 'dark'} 
                onClick={() => toggleTheme('dark')}
              >
                🌙 Dark
              </ThemeButton>
            </ThemeSelector>
          </SettingItem>
        </SettingsCard>

        <SettingsCard>
          <CardHeader>
            <CardIcon><FaBell /></CardIcon>
            <CardTitle>Notifications</CardTitle>
          </CardHeader>
          
          <SettingItem>
            <div>
              <SettingLabel>Push Notifications</SettingLabel>
              <SettingDescription>Get notified about new lessons and achievements</SettingDescription>
            </div>
            <ToggleSwitch>
              <input 
                type="checkbox" 
                checked={settings.notifications}
                onChange={() => handleSettingChange('notifications')}
              />
              <span></span>
            </ToggleSwitch>
          </SettingItem>
          
          <SettingItem>
            <div>
              <SettingLabel>Sound Effects</SettingLabel>
              <SettingDescription>Play sounds for achievements and interactions</SettingDescription>
            </div>
            <ToggleSwitch>
              <input 
                type="checkbox" 
                checked={settings.soundEffects}
                onChange={() => handleSettingChange('soundEffects')}
              />
              <span></span>
            </ToggleSwitch>
          </SettingItem>
        </SettingsCard>

        <SettingsCard>
          <CardHeader>
            <CardIcon><FaUser /></CardIcon>
            <CardTitle>Learning</CardTitle>
          </CardHeader>
          
          <SettingItem>
            <div>
              <SettingLabel>Auto Save Progress</SettingLabel>
              <SettingDescription>Automatically save your learning progress</SettingDescription>
            </div>
            <ToggleSwitch>
              <input 
                type="checkbox" 
                checked={settings.autoSave}
                onChange={() => handleSettingChange('autoSave')}
              />
              <span></span>
            </ToggleSwitch>
          </SettingItem>
          
          <SettingItem>
            <div>
              <SettingLabel>Show Progress Bar</SettingLabel>
              <SettingDescription>Display progress indicators during lessons</SettingDescription>
            </div>
            <ToggleSwitch>
              <input 
                type="checkbox" 
                checked={settings.showProgress}
                onChange={() => handleSettingChange('showProgress')}
              />
              <span></span>
            </ToggleSwitch>
          </SettingItem>
        </SettingsCard>

        <SettingsCard>
          <CardHeader>
            <CardIcon><FaShieldAlt /></CardIcon>
            <CardTitle>Privacy & Security</CardTitle>
          </CardHeader>
          
          <SettingItem>
            <div>
              <SettingLabel>Data Collection</SettingLabel>
              <SettingDescription>Help improve the app with anonymous usage data</SettingDescription>
            </div>
            <ToggleSwitch>
              <input 
                type="checkbox" 
                defaultChecked={true}
                disabled
              />
              <span></span>
            </ToggleSwitch>
          </SettingItem>
        </SettingsCard>
      </SettingsContainer>

      <SaveButton onClick={handleSave}>
        Save Settings
      </SaveButton>

      {saved && (
        <SuccessMessage>
          Settings saved successfully! 🎉
        </SuccessMessage>
      )}
    </Wrapper>
  );
};

export default SettingsPage; 