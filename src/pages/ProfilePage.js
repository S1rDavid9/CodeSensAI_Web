import React, { useState } from 'react';
import styled from 'styled-components';
import { useUser } from '../UserContext';
import { updateUserProfile } from '../api';

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  min-height: 80vh;
  background: var(--background);
  padding: 2rem 1rem;
`;

const Title = styled.h2`
  color: var(--primary-purple);
  font-size: 2rem;
  margin-bottom: 0.2em;
  font-family: 'Poppins', Arial, sans-serif;
`;

const Avatar = styled.button`
  background: none;
  border: 3px solid var(--primary-purple);
  border-radius: 50%;
  width: 80px;
  height: 80px;
  font-size: 2.5rem;
  margin-bottom: 0.5em;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: border 0.2s;
  &:hover {
    border: 3px solid var(--secondary-purple);
  }
`;

const Info = styled.div`
  color: var(--primary-purple);
  font-size: 1.1rem;
  margin-bottom: 1em;
  text-align: center;
`;

const ProgressBar = styled.div`
  width: 220px;
  height: 18px;
  background: var(--accent);
  border-radius: 12px;
  margin: 1em auto 1.5em auto;
  overflow: hidden;
`;

const ProgressFill = styled.div`
  height: 100%;
  background: linear-gradient(90deg, #8e44ad 60%, #a569bd 100%);
  width: ${props => props.progress || 0}%;
  border-radius: 12px;
  transition: width 0.6s;
`;

const EditSection = styled.div`
  margin: 1.5em 0 2em 0;
  text-align: center;
`;

const EditInput = styled.input`
  padding: 0.5em 1em;
  border-radius: 12px;
  border: 1px solid var(--accent);
  font-size: 1rem;
  margin-bottom: 0.7em;
`;

const SaveButton = styled.button`
  background: var(--primary-purple);
  color: #fff;
  border: none;
  border-radius: 20px;
  padding: 0.6em 1.2em;
  font-size: 1rem;
  font-weight: 600;
  margin-left: 0.5em;
  cursor: pointer;
  transition: background 0.2s;
  &:hover {
    background: var(--secondary-purple);
  }
`;

const NavBar = styled.nav`
  display: flex;
  gap: 1.2em;
  justify-content: center;
  margin-top: 2em;
`;

const NavLink = styled.a`
  background: #fff;
  color: var(--primary-purple);
  padding: 0.5em 1.2em;
  border-radius: 16px;
  font-weight: 600;
  font-size: 1.05rem;
  text-decoration: none;
  transition: background 0.2s, color 0.2s;
  &:hover {
    background: var(--secondary-purple);
    color: #fff;
  }
`;

const avatars = [
  '🦄', '🐱', '🐼', '🦊', '🐧', '👧', '👩‍💻', '🧑‍🚀'
];

const ProfilePage = () => {
  const { user, updateUser } = useUser();
  const [editing, setEditing] = useState(false);
  const [editInterests, setEditInterests] = useState('');
  const [editAvatar, setEditAvatar] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Initialize edit values when user data is available
  React.useEffect(() => {
    if (user) {
      setEditInterests(user.interests?.join(', ') || '');
      setEditAvatar(user.profile?.avatar || '🦄');
    }
  }, [user]);

  const handleSave = async () => {
    if (!user) return;

    setLoading(true);
    setError('');

    try {
      const profileData = {
        interests: editInterests.split(',').map(i => i.trim()).filter(i => i),
        profile: {
          ...user.profile,
          avatar: editAvatar
        }
      };

      const result = await updateUserProfile(profileData);
      
      if (result.success) {
        updateUser(profileData);
        setEditing(false);
      } else {
        setError(result.error || 'Failed to save changes');
      }
    } catch (err) {
      console.error('Error saving profile:', err);
      setError('Failed to save changes. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Show loading state while user data is being fetched
  if (!user) {
    return (
      <Wrapper>
        <Title>Loading profile...</Title>
      </Wrapper>
    );
  }

  const progress = user.profile?.completedLessons?.length || 0;
  const totalLessons = 20; // Mock total lessons
  const progressPercentage = Math.round((progress / totalLessons) * 100);

  return (
    <Wrapper>
      <Title>Welcome, {user.username}!</Title>
      <Avatar title="Click to change avatar" onClick={() => setEditing(true)}>
        {user.profile?.avatar || '🦄'}
      </Avatar>
      <Info>Age Group: <b>{user.age || 'Not set'}</b></Info>
      <Info>Learning Goals: <b>{user.interests?.join(', ') || 'Not set'}</b></Info>
      <ProgressBar>
        <ProgressFill progress={progressPercentage} />
      </ProgressBar>
      <Info>Progress: <b>{progressPercentage}%</b> to next badge!</Info>
      <Info>Points: <b>{user.profile?.points || 0}</b></Info>
      <Info>Completed Lessons: <b>{user.profile?.completedLessons?.length || 0}</b></Info>
      
      {error && <div style={{color: '#d32f2f', marginBottom: '1em', fontWeight: 600}}>{error}</div>}
      
      {editing && (
        <EditSection>
          <div style={{ marginBottom: '0.7em' }}>Edit Avatar:</div>
          <div style={{ display: 'flex', gap: '0.7em', justifyContent: 'center', marginBottom: '1em' }}>
            {avatars.map(a => (
              <Avatar 
                key={a} 
                style={{ 
                  width: 50, 
                  height: 50, 
                  fontSize: '1.5rem', 
                  borderWidth: editAvatar === a ? 3 : 1 
                }} 
                onClick={() => setEditAvatar(a)}
              >
                {a}
              </Avatar>
            ))}
          </div>
          <div>Edit Interests:</div>
          <EditInput 
            value={editInterests} 
            onChange={e => setEditInterests(e.target.value)} 
            placeholder="Enter your interests separated by commas"
          />
          <SaveButton onClick={handleSave} disabled={loading}>
            {loading ? 'Saving...' : 'Save'}
          </SaveButton>
        </EditSection>
      )}
      
      <NavBar>
        <NavLink href="/">Home</NavLink>
        <NavLink href="/quizzes">Quizzes</NavLink>
        <NavLink href="/sandbox">Sandbox</NavLink>
        <NavLink href="/progress">Progress</NavLink>
        <NavLink href="/settings">Settings</NavLink>
      </NavBar>
    </Wrapper>
  );
};

export default ProfilePage; 