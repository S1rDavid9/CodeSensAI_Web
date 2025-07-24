import React, { useState } from 'react';
import styled from 'styled-components';
import { useUser } from '../UserContext';
import { updateUserProfile } from '../api';
import { FaMedal, FaCheckCircle, FaStar, FaEdit, FaUser } from 'react-icons/fa';

const PageBackground = styled.div`
  min-height: 100vh;
  width: 100vw;
  background: linear-gradient(120deg, #fbc2eb 0%, #a18cd1 50%, #fcb69f 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem 0;
  transition: background 0.3s;
`;

const Card = styled.section`
  background: var(--surface-white);
  border-radius: 24px;
  box-shadow: var(--shadow-lg);
  padding: 2.5rem 2.5rem 2rem 2.5rem;
  max-width: 700px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  @media (max-width: 600px) {
    padding: 1.2rem 0.5rem 1.5rem 0.5rem;
    max-width: 98vw;
  }
`;

const EditFab = styled.button`
  position: absolute;
  top: 1.2rem;
  right: 1.2rem;
  background: var(--accent-pink);
  color: #fff;
  border: none;
  border-radius: 50px;
  width: auto;
  height: 48px;
  display: flex;
  align-items: center;
  gap: 0.7em;
  font-size: 1.1rem;
  font-weight: 600;
  box-shadow: var(--shadow-md);
  cursor: pointer;
  padding: 0 1.3em;
  z-index: 2;
  transition: background 0.2s, transform 0.2s;
  animation: bounce 1.5s infinite alternate;
  @keyframes bounce {
    0% { transform: translateY(0); }
    100% { transform: translateY(-6px); }
  }
  &:hover {
    background: var(--accent-orange);
    transform: scale(1.07);
  }
`;

const Avatar = styled.div`
  background: var(--surface-light);
  border: 4px solid var(--primary-purple);
  border-radius: 50%;
  width: 110px;
  height: 110px;
  font-size: 3.5rem;
  margin-bottom: 0.7em;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: var(--shadow-md);
  transition: border 0.2s;
`;

const Title = styled.h2`
  color: var(--primary-purple);
  font-size: 2.1rem;
  margin-bottom: 0.2em;
  font-family: 'Poppins', Arial, sans-serif;
  text-align: center;
`;

const Tagline = styled.p`
  color: var(--text-secondary);
  font-size: 1.1rem;
  margin-bottom: 1.2em;
  text-align: center;
`;

const StatsRow = styled.div`
  display: flex;
  gap: 1.2em;
  justify-content: center;
  margin: 1.2em 0 0.7em 0;
  width: 100%;
`;

const StatCard = styled.div`
  background: var(--surface-purple);
  border-radius: 16px;
  padding: 0.7em 1.1em;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 80px;
  box-shadow: var(--shadow-sm);
`;

const StatIcon = styled.div`
  color: var(--primary-purple);
  font-size: 1.3rem;
  margin-bottom: 0.2em;
`;

const StatNumber = styled.div`
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--text-primary);
`;

const StatLabel = styled.div`
  font-size: 0.95rem;
  color: var(--text-secondary);
`;

const ProgressBar = styled.div`
  width: 100%;
  max-width: 260px;
  height: 18px;
  background: var(--surface-purple);
  border-radius: 12px;
  margin: 1.2em auto 1.2em auto;
  overflow: hidden;
`;

const ProgressFill = styled.div`
  height: 100%;
  background: var(--gradient-primary);
  width: ${props => props.progress || 0}%;
  border-radius: 12px;
  transition: width 0.6s;
`;

const ActivitySection = styled.div`
  width: 100%;
  margin-top: 1.5em;
`;

const ActivityTitle = styled.h3`
  color: var(--primary-purple);
  font-size: 1.1rem;
  margin-bottom: 0.5em;
  font-weight: 600;
`;

const ActivityList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const ActivityItem = styled.li`
  background: var(--surface-purple);
  border-radius: 10px;
  padding: 0.6em 1em;
  margin-bottom: 0.5em;
  color: var(--text-primary);
  font-size: 0.98rem;
  display: flex;
  align-items: center;
  gap: 0.7em;
`;

const EditInput = styled.input`
  padding: 0.5em 1em;
  border-radius: 12px;
  border: 1px solid var(--accent);
  font-size: 1rem;
  margin-bottom: 0.7em;
  width: 90%;
  max-width: 320px;
  background: var(--surface-white);
  color: var(--text-primary);
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

const AvatarPickerRow = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.7em;
  justify-items: center;
  margin-bottom: 1em;
  @media (max-width: 600px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const SmallAvatar = styled.button`
  background: none;
  border: 2px solid var(--primary-purple);
  border-radius: 50%;
  width: 44px;
  height: 44px;
  font-size: 1.3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: border 0.2s;
  outline: none;
  border-width: ${props => (props.selected ? 3 : 1)}px;
`;

const FunNavBar = styled.div`
  display: flex;
  gap: 1.2em;
  justify-content: center;
  margin-top: 2em;
  flex-wrap: wrap;
`;

const FunNavButton = styled.a`
  background: var(--surface-purple);
  color: var(--primary-purple);
  padding: 0.8em 1.5em;
  border-radius: 20px;
  font-weight: 700;
  font-size: 1.1rem;
  text-decoration: none;
  box-shadow: var(--shadow-md);
  display: flex;
  align-items: center;
  gap: 0.7em;
  margin-bottom: 0.5em;
  transition: background 0.2s, color 0.2s, transform 0.2s;
  &:hover {
    background: var(--accent-pink);
    color: #fff;
    transform: translateY(-2px) scale(1.05);
  }
`;

const mockActivity = [
  'Completed "JavaScript Basics" quiz',
  'Finished Module: HTML & CSS',
  'Earned a new badge: Fast Learner',
  'Logged in from a new device',
  'Completed "React Components" lesson',
];

const Layout = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 2.5rem;
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
  @media (max-width: 900px) {
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
  }
`;

const EditCard = styled(Card)`
  max-width: 400px;
  min-width: 320px;
  box-shadow: var(--shadow-xl);
  background: var(--surface-white);
  z-index: 2;
  @media (max-width: 900px) {
    width: 100%;
    min-width: unset;
    max-width: 98vw;
    margin: 0 auto;
  }
`;

const FunInfo = styled.div`
  color: var(--text-primary);
  font-size: 1.1rem;
  margin-bottom: 0.7em;
  text-align: center;
  display: flex;
  align-items: center;
  gap: 0.5em;
  justify-content: center;
`;

const avatars = [
  '🦄', '🐱', '🐼', '🦊', '🐧', '👧', '👩‍💻', '🧑‍🚀',
  '🐸', '🐵', '🐯', '🐶', '🐰', '🦁', '🐲', '🤖',
  '🧙‍♂️', '🧚‍♀️', '🧞‍♂️', '🧜‍♀️', '🦸‍♂️', '🦹‍♀️', '👽', '👾'
];

const ProfilePage = () => {
  const { user, updateUser } = useUser();
  const [editing, setEditing] = useState(false);
  const [editInterests, setEditInterests] = useState('');
  const [editAvatar, setEditAvatar] = useState('');
  const [editTagline, setEditTagline] = useState('');
  const [editAge, setEditAge] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  React.useEffect(() => {
    if (user) {
      setEditInterests(user.interests?.join(', ') || '');
      setEditAvatar(user.profile?.avatar || '🦄');
      setEditTagline(user.tagline || '');
      setEditAge(user.age || '');
    }
  }, [user]);

  const handleSave = async () => {
    if (!user) return;
    setLoading(true);
    setError('');
    setSuccess(false);
    try {
      // Prepare new activity
      const newActivity = `Updated profile at ${new Date().toLocaleString()}`;
      const updatedActivity = [
        newActivity,
        ...(user.profile?.recentActivity || [])
      ].slice(0, 5); // keep max 5
      const profileData = {
        interests: editInterests.split(',').map(i => i.trim()).filter(i => i),
        tagline: editTagline,
        age: editAge,
        profile: {
          ...user.profile,
          avatar: editAvatar,
          recentActivity: updatedActivity
        }
      };
      const result = await updateUserProfile(profileData);
      if (result.success) {
        updateUser(profileData);
        setEditing(false);
        setSuccess(true);
        setTimeout(() => setSuccess(false), 2000);
      } else {
        setError(result.error || 'Failed to save changes');
      }
    } catch (err) {
      setError('Failed to save changes. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <PageBackground>
        <Card>
          <Title>Loading profile...</Title>
        </Card>
      </PageBackground>
    );
  }

  const progress = user.profile?.completedLessons?.length || 0;
  const totalLessons = 20;
  const progressPercentage = Math.round((progress / totalLessons) * 100);
  const activity = user.profile?.recentActivity && user.profile.recentActivity.length > 0
    ? user.profile.recentActivity
    : mockActivity;

  return (
    <PageBackground>
      <Layout>
        <Card>
          <EditFab title="Edit Profile" onClick={() => setEditing(!editing)}>
            <FaEdit style={{fontSize:'1.3em'}} /> Edit Profile
          </EditFab>
          <Avatar>{user.profile?.avatar || <FaUser />}</Avatar>
          <Title>{user.username || 'User'}</Title>
          <Tagline>{user.tagline || 'Welcome to your profile!'}</Tagline>
          <StatsRow>
            <StatCard>
              <StatIcon><FaStar /></StatIcon>
              <StatNumber>{user.profile?.points || 0}</StatNumber>
              <StatLabel>Points</StatLabel>
            </StatCard>
            <StatCard>
              <StatIcon><FaCheckCircle /></StatIcon>
              <StatNumber>{progress}</StatNumber>
              <StatLabel>Lessons</StatLabel>
            </StatCard>
            <StatCard>
              <StatIcon><FaMedal /></StatIcon>
              <StatNumber>{progressPercentage}%</StatNumber>
              <StatLabel>Progress</StatLabel>
            </StatCard>
          </StatsRow>
          <FunInfo>🎂 <b>You're in the {user.age || 'mystery'} explorer squad!</b></FunInfo>
          <FunInfo>🎯 <b>Your learning quest:</b> {user.interests?.length ? user.interests.map(i => i.charAt(0).toUpperCase() + i.slice(1)).join(', ') : 'Not set yet!'} 🚀</FunInfo>
          <ProgressBar>
            <ProgressFill progress={progressPercentage} />
          </ProgressBar>
          {error && <div style={{color: '#d32f2f', marginBottom: '1em', fontWeight: 600}}>{error}</div>}
          {success && <div style={{color: 'var(--success)', marginBottom: '1em', fontWeight: 600}}>Profile updated! 🎉</div>}
          <ActivitySection>
            <ActivityTitle>Recent Activity</ActivityTitle>
            <ActivityList>
              {activity.map((item, idx) => (
                <ActivityItem key={idx}><FaCheckCircle style={{color:'var(--primary-purple)'}} /> {item}</ActivityItem>
              ))}
            </ActivityList>
          </ActivitySection>
          <FunNavBar>
            <FunNavButton href="/quizzes">🧩 Take a Quiz!</FunNavButton>
            <FunNavButton href="/sandbox">💻 Jump into Sandbox!</FunNavButton>
            <FunNavButton href="/progress">📊 See Your Progress!</FunNavButton>
            <FunNavButton href="/settings">⚙️ Settings</FunNavButton>
            <FunNavButton href="/">🏠 Home</FunNavButton>
          </FunNavBar>
        </Card>
        {editing && (
          <EditCard>
            <Title>Edit Profile</Title>
            <div style={{ marginBottom: '0.7em' }}>Pick Your Avatar:</div>
            <AvatarPickerRow>
              {avatars.map(a => (
                <SmallAvatar
                  key={a}
                  selected={editAvatar === a}
                  onClick={() => setEditAvatar(a)}
                >
                  {a}
                </SmallAvatar>
              ))}
            </AvatarPickerRow>
            <div>Edit Tagline:</div>
            <EditInput
              value={editTagline}
              onChange={e => setEditTagline(e.target.value)}
              placeholder="Enter a short tagline or bio"
            />
            <div>Edit Age Group:</div>
            <EditInput
              value={editAge}
              onChange={e => setEditAge(e.target.value)}
              placeholder="Enter your age group (e.g. 10-14)"
            />
            <div>Edit Interests:</div>
            <EditInput
              value={editInterests}
              onChange={e => setEditInterests(e.target.value)}
              placeholder="Enter your interests separated by commas"
            />
            <SaveButton onClick={handleSave} disabled={loading}>
              {loading ? 'Saving...' : 'Save'}
            </SaveButton>
            <SaveButton style={{background:'var(--surface-purple)', color:'var(--primary-purple)', marginLeft:0, marginTop:'0.7em'}} onClick={()=>setEditing(false)} type="button">Cancel</SaveButton>
          </EditCard>
        )}
      </Layout>
    </PageBackground>
  );
};

export default ProfilePage; 