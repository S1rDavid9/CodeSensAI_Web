import React, { useState } from 'react';
import styled from 'styled-components';

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 70vh;
  background: var(--background);
  padding: 2rem 1rem;
`;

const Mascot = styled.div`
  font-size: 3rem;
  margin-bottom: 1em;
`;

const Title = styled.h2`
  color: var(--primary-purple);
  font-size: 2rem;
  margin-bottom: 0.5em;
  font-family: 'Poppins', Arial, sans-serif;
`;

const Form = styled.form`
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 2px 8px rgba(142, 68, 173, 0.08);
  padding: 2em 2.5em;
  display: flex;
  flex-direction: column;
  gap: 1.2em;
  min-width: 300px;
  align-items: center;
`;

const Label = styled.label`
  color: var(--primary-purple);
  font-weight: 600;
  margin-bottom: 0.3em;
`;

const Input = styled.input`
  padding: 0.7em 1em;
  border-radius: 12px;
  border: 1px solid var(--accent);
  font-size: 1rem;
  outline: none;
  margin-bottom: 0.5em;
`;

const Toggle = styled.button`
  background: var(--accent);
  color: var(--primary-purple);
  border: 2px solid var(--primary-purple);
  border-radius: 16px;
  padding: 0.5em 1.2em;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s, color 0.2s, border 0.2s;
  &:hover {
    background: var(--primary-purple);
    color: #fff;
    border: 2px solid var(--secondary-purple);
  }
`;

const SaveButton = styled.button`
  background: var(--primary-purple);
  color: #fff;
  border: none;
  border-radius: 20px;
  padding: 0.8em 1.5em;
  font-size: 1.1rem;
  font-weight: 600;
  margin-top: 1em;
  cursor: pointer;
  transition: background 0.2s;
  &:hover {
    background: var(--secondary-purple);
  }
`;

const MascotTip = styled.div`
  color: var(--secondary-purple);
  font-size: 1rem;
  margin-bottom: 1.5em;
  text-align: center;
`;

const SettingsPage = () => {
  const [name, setName] = useState('Amina');
  const [darkMode, setDarkMode] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = e => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 1200);
  };

  return (
    <Wrapper>
      <Mascot>⚙️</Mascot>
      <Title>Settings</Title>
      <MascotTip>Personalize your CodeSensAI experience! 🌈</MascotTip>
      <Form onSubmit={handleSave}>
        <Label htmlFor="name">Display Name</Label>
        <Input id="name" value={name} onChange={e => setName(e.target.value)} />
        <Label>Theme</Label>
        <Toggle type="button" onClick={() => setDarkMode(dm => !dm)}>
          {darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        </Toggle>
        <SaveButton type="submit">Save Changes</SaveButton>
        {saved && <div style={{ color: 'var(--primary-purple)', marginTop: '1em', fontWeight: 600 }}>Settings saved! 🎉</div>}
      </Form>
    </Wrapper>
  );
};

export default SettingsPage; 