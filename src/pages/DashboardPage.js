import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { useUser } from '../UserContext';
import { Link } from 'react-router-dom';
import Spinner from '../components/Spinner';
import modules from '../data/modules';

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const pulse = keyframes`
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
`;

const Wrapper = styled.section`
  min-height: 100vh;
  background: var(--background);
  padding: 2rem 1rem;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 3rem;
  animation: ${fadeInUp} 0.8s ease-out;
`;

const Title = styled.h1`
  color: var(--text-primary);
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  font-family: 'Fredoka', 'Poppins', Arial, sans-serif;
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const WelcomeMessage = styled.div`
  color: var(--text-secondary);
  font-size: 1.3rem;
  margin-bottom: 1rem;
  font-weight: 500;
`;

const UserLevel = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: var(--gradient-accent);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: var(--radius-full);
  font-weight: 600;
  font-size: 0.9rem;
  box-shadow: var(--shadow-md);
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 3rem;
  animation: ${fadeInUp} 0.8s ease-out 0.2s both;
`;

const StatCard = styled.div`
  background: var(--surface-white);
  border-radius: var(--radius-xl);
  padding: 2rem;
  text-align: center;
  box-shadow: var(--shadow-lg);
  border: 1px solid var(--surface-light);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: var(--gradient-primary);
  }
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: var(--shadow-xl);
  }
`;

const StatIcon = styled.div`
  font-size: 2.5rem;
  margin-bottom: 1rem;
`;

const StatNumber = styled.div`
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
  font-family: 'Fredoka', 'Poppins', Arial, sans-serif;
`;

const StatLabel = styled.div`
  color: var(--text-secondary);
  font-weight: 600;
  font-size: 1rem;
`;

const ProgressSection = styled.div`
  background: var(--surface-white);
  border-radius: var(--radius-xl);
  padding: 2.5rem;
  margin-bottom: 3rem;
  box-shadow: var(--shadow-lg);
  border: 1px solid var(--surface-light);
  animation: ${fadeInUp} 0.8s ease-out 0.4s both;
`;

const ProgressHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
`;

const ProgressTitle = styled.h3`
  color: var(--text-primary);
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0;
`;

const ProgressPercentage = styled.div`
  color: var(--primary-purple);
  font-weight: 700;
  font-size: 1.2rem;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 12px;
  background: var(--surface-light);
  border-radius: var(--radius-full);
  overflow: hidden;
  margin-bottom: 1rem;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const ProgressFill = styled.div`
  height: 100%;
  background: var(--gradient-primary);
  width: ${props => props.progress || 0}%;
  border-radius: var(--radius-full);
  transition: width 1s ease-out;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
    animation: ${pulse} 2s infinite;
  }
`;

const ProgressDetails = styled.div`
  display: flex;
  justify-content: space-between;
  color: var(--text-secondary);
  font-size: 0.95rem;
  font-weight: 500;
`;

const QuickActions = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-bottom: 3rem;
  animation: ${fadeInUp} 0.8s ease-out 0.6s both;
`;

const ActionCard = styled(Link)`
  background: var(--surface-white);
  border-radius: var(--radius-xl);
  padding: 2rem;
  text-align: center;
  box-shadow: var(--shadow-lg);
  border: 1px solid var(--surface-light);
  transition: all 0.3s ease;
  text-decoration: none;
  color: inherit;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: var(--gradient-primary);
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: var(--shadow-xl);
    
    &::before {
      opacity: 0.05;
    }
  }
`;

const ActionIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1rem;
`;

const ActionTitle = styled.h4`
  color: var(--text-primary);
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const ActionDescription = styled.p`
  color: var(--text-secondary);
  font-size: 0.95rem;
  line-height: 1.5;
`;

const ModuleSection = styled.div`
  background: var(--surface-white);
  border-radius: var(--radius-xl);
  padding: 2rem;
  box-shadow: var(--shadow-lg);
  border: 1px solid var(--surface-light);
  margin-bottom: 2rem;
  animation: ${fadeInUp} 0.8s ease-out 0.4s both;
`;

const ModuleTitle = styled.h3`
  color: var(--text-primary);
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const ModuleGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: 1rem;
`;

const ModuleCard = styled(Link)`
  background: var(--surface-white);
  border: 2px solid var(--surface-light);
  border-radius: var(--radius-lg);
  padding: 1.5rem;
  text-decoration: none;
  color: inherit;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(139, 92, 246, 0.1), transparent);
    transition: left 0.5s ease;
  }
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-xl);
    border-color: var(--primary-purple);
    
    &::before {
      left: 100%;
    }
  }
  
  &.completed {
    border-color: var(--success);
    background: linear-gradient(135deg, var(--success-light), var(--success-lighter));
  }
  
  &.locked {
    opacity: 0.6;
    cursor: not-allowed;
    
    &:hover {
      transform: none;
      box-shadow: var(--shadow-lg);
    }
  }
`;

const ModuleCardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

const ModuleCardTitle = styled.h4`
  color: var(--text-primary);
  font-size: 1.2rem;
  font-weight: 700;
  margin: 0;
`;

const ModuleCardStatus = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  font-weight: 600;
  
  &.completed {
    color: var(--success);
  }
  
  &.locked {
    color: var(--text-secondary);
  }
`;

const ModuleCardDescription = styled.p`
  color: var(--text-secondary);
  font-size: 0.95rem;
  line-height: 1.5;
  margin-bottom: 1rem;
`;

const ModuleCardMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 0.85rem;
  color: var(--text-secondary);
`;

const ModuleCardMetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

const RecentActivity = styled.div`
  background: var(--surface-white);
  border-radius: var(--radius-xl);
  padding: 2.5rem;
  box-shadow: var(--shadow-lg);
  border: 1px solid var(--surface-light);
  animation: ${fadeInUp} 0.8s ease-out 0.8s both;
`;

const ActivityTitle = styled.h3`
  color: var(--text-primary);
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
`;

const ActivityItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  border-radius: var(--radius-lg);
  background: var(--surface-light);
  margin-bottom: 1rem;
  transition: all 0.3s ease;
  
  &:hover {
    background: var(--surface-purple);
    transform: translateX(5px);
  }
`;

const ActivityIcon = styled.div`
  font-size: 1.5rem;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--gradient-primary);
  border-radius: var(--radius-full);
  color: white;
`;

const ActivityContent = styled.div`
  flex: 1;
`;

const ActivityText = styled.div`
  color: var(--text-primary);
  font-weight: 500;
  margin-bottom: 0.25rem;
`;

const ActivityTime = styled.div`
  color: var(--text-light);
  font-size: 0.85rem;
`;

const DashboardPage = () => {
  const { user } = useUser();
  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  // Notification handler
  const handleNotify = (type, message) => {
    setNotifications((prev) => [
      { type, message, time: new Date().toLocaleTimeString() },
      ...prev.slice(0, 9), // keep max 10
    ]);
  };

  if (loading) {
    return <Spinner message="Loading your awesome dashboard... 🚀" />;
  }

  if (!user) {
    return (
      <Wrapper>
        <Container>
          <Title>Loading Dashboard...</Title>
        </Container>
      </Wrapper>
    );
  }

  const progress = user.profile?.completedLessons?.length || 0;
  const totalLessons = modules.length; // Dynamic total lessons
  const progressPercentage = Math.round((progress / totalLessons) * 100);
  const points = user.profile?.points || 0;
  const level = user.profile?.level || 'beginner';
  const badges = user.profile?.badges?.length || 0;

  const getLevelEmoji = (level) => {
    switch (level) {
      case 'beginner': return '🌱';
      case 'intermediate': return '🚀';
      case 'advanced': return '🏆';
      default: return '🌟';
    }
  };

  return (
    <Wrapper>
      <Container>
        <Header>
          <Title>🌟 Welcome Back!</Title>
          <WelcomeMessage>
            Hello, <strong>{user.username}</strong>! Ready to continue your coding adventure?
          </WelcomeMessage>
          <UserLevel>
            {getLevelEmoji(level)} Level {level.charAt(0).toUpperCase() + level.slice(1)}
          </UserLevel>
        </Header>

        <StatsGrid>
          <StatCard>
            <StatIcon>📚</StatIcon>
            <StatNumber>{progress}</StatNumber>
            <StatLabel>Lessons Completed</StatLabel>
          </StatCard>
          <StatCard>
            <StatIcon>⭐</StatIcon>
            <StatNumber>{points}</StatNumber>
            <StatLabel>Points Earned</StatLabel>
          </StatCard>
          <StatCard>
            <StatIcon>🏅</StatIcon>
            <StatNumber>{badges}</StatNumber>
            <StatLabel>Badges Earned</StatLabel>
          </StatCard>
          <StatCard>
            <StatIcon>🎯</StatIcon>
            <StatNumber>{totalLessons - progress}</StatNumber>
            <StatLabel>Lessons Remaining</StatLabel>
          </StatCard>
        </StatsGrid>

        <ModuleSection>
          <ModuleTitle>
            📚 Learning Modules
          </ModuleTitle>
          <ModuleGrid>
            {modules.map((module) => {
              const isCompleted = user.profile?.completedLessons?.includes(module.id);
              const isLocked = module.prerequisites?.some(prereq => 
                !user.profile?.completedLessons?.includes(prereq)
              );
              
              return (
                <ModuleCard
                  key={module.id}
                  to={isLocked ? '#' : `/module/${module.id}`}
                  className={`${isCompleted ? 'completed' : ''} ${isLocked ? 'locked' : ''}`}
                  onClick={isLocked ? (e) => e.preventDefault() : undefined}
                >
                  <ModuleCardHeader>
                    <ModuleCardTitle>{module.title}</ModuleCardTitle>
                    <ModuleCardStatus className={isCompleted ? 'completed' : isLocked ? 'locked' : ''}>
                      {isCompleted ? '✅ Completed' : isLocked ? '🔒 Locked' : '🎯 Available'}
                    </ModuleCardStatus>
                  </ModuleCardHeader>
                  <ModuleCardDescription>{module.description}</ModuleCardDescription>
                  <ModuleCardMeta>
                    <ModuleCardMetaItem>
                      <span>⏱️</span>
                      {module.estimatedTime}
                    </ModuleCardMetaItem>
                    <ModuleCardMetaItem>
                      <span>🏆</span>
                      {module.badge}
                    </ModuleCardMetaItem>
                    <ModuleCardMetaItem>
                      <span>📊</span>
                      {module.level}
                    </ModuleCardMetaItem>
                  </ModuleCardMeta>
                </ModuleCard>
              );
            })}
          </ModuleGrid>
        </ModuleSection>

        <ProgressSection>
          <ProgressHeader>
            <ProgressTitle>Your Learning Journey</ProgressTitle>
            <ProgressPercentage>{progressPercentage}% Complete</ProgressPercentage>
          </ProgressHeader>
          <ProgressBar>
            <ProgressFill progress={progressPercentage} />
          </ProgressBar>
          <ProgressDetails>
            <span>{progress} of {totalLessons} lessons completed</span>
            <span>{Math.round((progress / totalLessons) * 100)}% to next level</span>
          </ProgressDetails>
        </ProgressSection>

        <QuickActions>
          <ActionCard to="/quizzes">
            <ActionIcon>🧩</ActionIcon>
            <ActionTitle>Take a Quiz</ActionTitle>
            <ActionDescription>Test your knowledge with fun coding challenges</ActionDescription>
          </ActionCard>
          <ActionCard to="/sandbox">
            <ActionIcon>💻</ActionIcon>
            <ActionTitle>Code Sandbox</ActionTitle>
            <ActionDescription>Practice coding in a safe environment</ActionDescription>
          </ActionCard>
          <ActionCard to="/profile">
            <ActionIcon>👤</ActionIcon>
            <ActionTitle>View Profile</ActionTitle>
            <ActionDescription>Check your achievements and settings</ActionDescription>
          </ActionCard>
          <ActionCard to="/progress">
            <ActionIcon>📊</ActionIcon>
            <ActionTitle>Progress Report</ActionTitle>
            <ActionDescription>See your detailed learning analytics</ActionDescription>
          </ActionCard>
        </QuickActions>

        <RecentActivity>
          <ActivityTitle>Recent Activity</ActivityTitle>
          {notifications.length === 0 ? (
            <ActivityItem>
              <ActivityIcon>👋</ActivityIcon>
              <ActivityContent>
                <ActivityText>No recent activity yet. Start a module to see your progress!</ActivityText>
              </ActivityContent>
            </ActivityItem>
          ) : (
            notifications.map((n, i) => (
              <ActivityItem key={i}>
                <ActivityIcon>{n.type === 'module' ? '📚' : n.type === 'badge' ? '🏅' : n.type === 'points' ? '⭐' : '🔔'}</ActivityIcon>
                <ActivityContent>
                  <ActivityText>{n.message}</ActivityText>
                  <ActivityTime>{n.time}</ActivityTime>
                </ActivityContent>
              </ActivityItem>
            ))
          )}
        </RecentActivity>
      </Container>
    </Wrapper>
  );
};

export default DashboardPage; 