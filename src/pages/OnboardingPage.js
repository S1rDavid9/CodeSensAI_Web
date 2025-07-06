import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../UserContext';
import { updateUserProfile } from '../api';

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 70vh;
  background: var(--background);
  padding: 2rem 1rem;
  position: relative;
`;

const Title = styled.h2`
  color: var(--primary-purple);
  font-size: 2rem;
  margin-bottom: 0.5em;
  font-family: 'Poppins', Arial, sans-serif;
`;

const Form = styled.form`
  background: #fff;
  border-radius: 20px;
  box-shadow: 0 2px 12px rgba(142, 68, 173, 0.08);
  padding: 2rem 2.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  min-width: 320px;
`;

const Label = styled.label`
  color: var(--primary-purple);
  font-weight: 600;
  margin-bottom: 0.3em;
`;

const Select = styled.select`
  padding: 0.7em 1em;
  border-radius: 12px;
  border: 1px solid var(--accent);
  font-size: 1rem;
  outline: none;
  margin-bottom: 0.5em;
`;

const TextArea = styled.textarea`
  padding: 0.7em 1em;
  border-radius: 12px;
  border: 1px solid var(--accent);
  font-size: 1rem;
  outline: none;
  margin-bottom: 0.5em;
  resize: vertical;
`;

const AvatarGrid = styled.div`
  display: flex;
  gap: 1.2em;
  margin-bottom: 1em;
  justify-content: center;
`;

const AvatarOption = styled.button`
  background: none;
  border: 2px solid ${props => (props.selected ? 'var(--primary-purple)' : 'var(--accent)')};
  border-radius: 50%;
  padding: 0.3em;
  cursor: pointer;
  outline: none;
  transition: border 0.2s;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: ${props => (props.selected ? '0 0 8px #a569bd55' : 'none')};
`;

const SubmitButton = styled.button`
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

const ErrorMsg = styled.div`
  position: fixed;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  color: #d32f2f;
  background: #ffeaea;
  border: 3px solid #f44336;
  border-radius: 20px;
  padding: 1rem 2rem;
  font-size: 1.1rem;
  font-weight: 700;
  text-align: center;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  animation: slideUp 0.5s ease-out;
  
  @keyframes slideUp {
    0% {
      transform: translateX(-50%) translateY(100%);
      opacity: 0;
    }
    100% {
      transform: translateX(-50%) translateY(0);
      opacity: 1;
    }
  }
`;

const SuccessMsg = styled.div`
  position: fixed;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  color: #2e7d32;
  background: #e8f5e8;
  border: 3px solid #4caf50;
  border-radius: 20px;
  padding: 1rem 2rem;
  font-size: 1.1rem;
  font-weight: 700;
  text-align: center;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  animation: slideUp 0.5s ease-out;
  
  @keyframes slideUp {
    0% {
      transform: translateX(-50%) translateY(100%);
      opacity: 0;
    }
    100% {
      transform: translateX(-50%) translateY(0);
      opacity: 1;
    }
  }
`;

const avatars = [
  '🦄', '🐱', '🐼', '🦊', '🐧', '👧', '👩‍💻', '🧑‍🚀'
];

const ageGroups = [
  { value: '', label: 'Select your age group' },
  { value: '9-11', label: '9–11' },
  { value: '12-14', label: '12–14' },
  { value: '15-16', label: '15–16' },
];

const OnboardingPage = () => {
  const [form, setForm] = useState({ ageGroup: '', goals: '', avatar: avatars[0] });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { updateUser } = useUser();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleAvatarSelect = avatar => {
    setForm({ ...form, avatar });
    setError('');
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!form.ageGroup || !form.goals) {
      setError('Oopsie! Please pick your age group and tell us your awesome tech dreams! 🌟');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Prepare profile data
      const profileData = {
        age: form.ageGroup,
        interests: [form.goals], // Convert goals to interests array
        profile: {
          avatar: form.avatar,
          bio: `Learning goals: ${form.goals}`,
          level: 'beginner',
          points: 0,
          badges: [],
          completedLessons: [],
          currentLesson: null
        }
      };

      // Update user profile in backend
      const result = await updateUserProfile(profileData);
      
      if (result.success) {
        // Update local user state with the returned user data
        updateUser(result.user);
        setSuccess(true);
        setTimeout(() => {
          navigate('/profile');
        }, 2000);
      } else {
        setError(result.error || 'Oh no! Something went wrong. Let us try again! 🔧');
      }
    } catch (err) {
      console.error('Error saving profile:', err);
      setError('Oops! Something went wrong. Let us try again! 🔧');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Wrapper>
      <Title>Personalize Your Learning Journey</Title>
      <MascotTip>🌟 Let your Sensai know a bit about you!<br/>Pick your age group, share your tech dreams, and choose your learning buddy.</MascotTip>
      <Form onSubmit={handleSubmit}>
        <Label htmlFor="ageGroup">Your Age Group</Label>
        <Select id="ageGroup" name="ageGroup" value={form.ageGroup} onChange={handleChange} required>
          {ageGroups.map(group => (
            <option key={group.value} value={group.value}>
              {group.label}
            </option>
          ))}
        </Select>

        <Label htmlFor="goals">What do you want to learn? 🚀</Label>
        <TextArea
          id="goals"
          name="goals"
          value={form.goals}
          onChange={handleChange}
          placeholder="Tell us your coding dreams! (e.g., I want to make games, build websites, create apps...)"
          rows="3"
          required
        />

        <Label>Choose Your Learning Buddy! 🦄</Label>
        <AvatarGrid>
          {avatars.map(avatar => (
            <AvatarOption
              key={avatar}
              selected={form.avatar === avatar}
              onClick={() => handleAvatarSelect(avatar)}
              type="button"
            >
              <span style={{ fontSize: '2rem' }}>{avatar}</span>
            </AvatarOption>
          ))}
        </AvatarGrid>

        <SubmitButton type="submit" disabled={loading}>
          {loading ? 'Setting up your profile... ✨' : 'Start My Coding Adventure! 🎉'}
        </SubmitButton>
      </Form>
      {error && <ErrorMsg>{error}</ErrorMsg>}
      {success && <SuccessMsg>Yay! Your profile is all set up! Taking you to your awesome profile... 🎉✨</SuccessMsg>}
    </Wrapper>
  );
};

export default OnboardingPage; 