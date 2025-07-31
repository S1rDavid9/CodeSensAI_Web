import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useUser } from '../UserContext';
import Spinner from '../components/Spinner';

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

const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  width: 100%;
  max-width: 800px;
  margin-bottom: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

const StatCard = styled.div`
  background: var(--surface-white);
  border-radius: 20px;
  box-shadow: var(--shadow-md);
  padding: 1.5rem;
  border: 1px solid var(--surface-light);
  text-align: center;
  transition: transform 0.2s, box-shadow 0.2s;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-lg);
  }
`;

const StatIcon = styled.div`
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
  color: var(--primary-purple);
`;

const StatValue = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 0.3rem;
`;

const StatLabel = styled.div`
  font-size: 1rem;
  color: var(--text-secondary);
  font-weight: 500;
`;

const ProgressSection = styled.div`
  background: var(--surface-white);
  border-radius: 20px;
  box-shadow: var(--shadow-md);
  padding: 2rem;
  width: 100%;
  max-width: 600px;
  margin-bottom: 2rem;
  border: 1px solid var(--surface-light);
`;

const ProgressTitle = styled.h3`
  color: var(--primary-purple);
  font-size: 1.5rem;
  margin-bottom: 1rem;
  text-align: center;
  font-weight: 600;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 20px;
  background: var(--surface-light);
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 1rem;
  position: relative;
`;

const ProgressFill = styled.div`
  height: 100%;
  background: linear-gradient(135deg, var(--primary-purple) 0%, var(--accent-pink) 100%);
  width: ${props => props.progress || 0}%;
  transition: width 0.8s ease-out;
  border-radius: 10px;
`;

const ProgressText = styled.div`
  text-align: center;
  color: var(--text-secondary);
  font-size: 1rem;
  font-weight: 500;
`;

const BadgesSection = styled.div`
  background: var(--surface-white);
  border-radius: 20px;
  box-shadow: var(--shadow-md);
  padding: 2rem;
  width: 100%;
  max-width: 800px;
  border: 1px solid var(--surface-light);
`;

const BadgesTitle = styled.h3`
  color: var(--primary-purple);
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  text-align: center;
  font-weight: 600;
`;

const BadgesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 1.5rem;
  justify-items: center;
  
  @media (max-width: 480px) {
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    gap: 1rem;
  }
`;

const Badge = styled.div`
  background: ${props => props.earned ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : 'var(--surface-light)'};
  border-radius: 50%;
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  box-shadow: var(--shadow-md);
  border: 3px solid ${props => props.earned ? 'var(--primary-purple)' : 'var(--surface-light)'};
  flex-direction: column;
  transition: transform 0.2s;
  opacity: ${props => props.earned ? 1 : 0.6};
  
  &:hover {
    transform: scale(1.05);
  }
  
  @media (max-width: 480px) {
    width: 70px;
    height: 70px;
    font-size: 1.8rem;
  }
`;

const BadgeLabel = styled.div`
  font-size: 0.7rem;
  color: ${props => props.earned ? '#fff' : 'var(--text-secondary)'};
  margin-top: 0.2em;
  font-weight: 600;
  text-align: center;
`;

const RecentActivity = styled.div`
  background: var(--surface-white);
  border-radius: 20px;
  box-shadow: var(--shadow-md);
  padding: 2rem;
  width: 100%;
  max-width: 600px;
  border: 1px solid var(--surface-light);
`;

const ActivityTitle = styled.h3`
  color: var(--primary-purple);
  font-size: 1.5rem;
  margin-bottom: 1rem;
  text-align: center;
  font-weight: 600;
`;

const ActivityList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const ActivityItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  padding: 0.8rem;
  background: var(--surface-light);
  border-radius: 12px;
  font-size: 0.9rem;
  color: var(--text-primary);
`;

const ActivityIcon = styled.div`
  color: var(--primary-purple);
  font-size: 1.2rem;
`;

const ProgressPage = () => {
  const { user } = useUser();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Spinner message="Loading your amazing progress..." />;
  }

  if (!user) {
    return (
      <Wrapper>
        <Title>Progress & Achievements</Title>
        <Subtitle>Login to see your learning journey! 🚀</Subtitle>
      </Wrapper>
    );
  }

  // Calculate progress data from user profile
  const completedLessons = user.profile?.completedLessons || [];
  const totalLessons = 10; // Assuming 10 total lessons
  const progressPercentage = Math.round((completedLessons.length / totalLessons) * 100);
  const points = user.profile?.points || 0;
  const badges = user.profile?.badges || [];
  const recentActivity = user.profile?.recentActivity || [];

  // Define available badges
  const availableBadges = [
    { id: 'starter', emoji: '🏅', label: 'Starter', earned: badges.includes('CSS Starter') || badges.includes('Python Starter') },
    { id: 'achiever', emoji: '🎯', label: 'Achiever', earned: points >= 100 },
    { id: 'focused', emoji: '⭐', label: 'Focused', earned: completedLessons.length >= 3 },
    { id: 'expert', emoji: '🏆', label: 'Expert', earned: completedLessons.length >= 5 },
    { id: 'master', emoji: '👑', label: 'Master', earned: completedLessons.length >= 8 },
    { id: 'legend', emoji: '🔥', label: 'Legend', earned: points >= 500 }
  ];

  return (
    <Wrapper>
      <Title>Progress & Achievements</Title>
      <Subtitle>Track your amazing learning journey! 🌟</Subtitle>

      <StatsContainer>
        <StatCard>
          <StatIcon>📚</StatIcon>
          <StatValue>{completedLessons.length}</StatValue>
          <StatLabel>Lessons Completed</StatLabel>
        </StatCard>
        <StatCard>
          <StatIcon>⭐</StatIcon>
          <StatValue>{points}</StatValue>
          <StatLabel>Total Points</StatLabel>
        </StatCard>
        <StatCard>
          <StatIcon>🏅</StatIcon>
          <StatValue>{badges.length}</StatValue>
          <StatLabel>Badges Earned</StatLabel>
        </StatCard>
        <StatCard>
          <StatIcon>🎯</StatIcon>
          <StatValue>{progressPercentage}%</StatValue>
          <StatLabel>Course Progress</StatLabel>
        </StatCard>
      </StatsContainer>

      <ProgressSection>
        <ProgressTitle>Course Progress</ProgressTitle>
        <ProgressBar>
          <ProgressFill progress={progressPercentage} />
        </ProgressBar>
        <ProgressText>
          {completedLessons.length} of {totalLessons} lessons completed • {progressPercentage}% to completion!
        </ProgressText>
      </ProgressSection>

      <BadgesSection>
        <BadgesTitle>Badges & Achievements</BadgesTitle>
        <BadgesGrid>
          {availableBadges.map(badge => (
            <Badge key={badge.id} earned={badge.earned} title={badge.label}>
              {badge.emoji}
              <BadgeLabel earned={badge.earned}>{badge.label}</BadgeLabel>
            </Badge>
          ))}
        </BadgesGrid>
      </BadgesSection>

      {recentActivity.length > 0 && (
        <RecentActivity>
          <ActivityTitle>Recent Activity</ActivityTitle>
          <ActivityList>
            {recentActivity.slice(0, 5).map((activity, index) => (
              <ActivityItem key={index}>
                <ActivityIcon>📝</ActivityIcon>
                {activity}
              </ActivityItem>
            ))}
          </ActivityList>
        </RecentActivity>
      )}
    </Wrapper>
  );
};

export default ProgressPage; 