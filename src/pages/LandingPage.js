import React from 'react';
import styled, { keyframes } from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';

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

const float = keyframes`
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
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
  background: var(--gradient-primary);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="25" cy="25" r="1" fill="white" opacity="0.1"/><circle cx="75" cy="75" r="1" fill="white" opacity="0.1"/><circle cx="50" cy="10" r="0.5" fill="white" opacity="0.1"/><circle cx="10" cy="60" r="0.5" fill="white" opacity="0.1"/><circle cx="90" cy="40" r="0.5" fill="white" opacity="0.1"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
    pointer-events: none;
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  position: relative;
  z-index: 1;
`;

const Hero = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  min-height: 80vh;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    text-align: center;
    gap: 2rem;
  }
`;

const HeroContent = styled.div`
  animation: ${fadeInUp} 1s ease-out;
`;

const Title = styled.h1`
  color: white;
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  font-family: 'Fredoka', 'Poppins', Arial, sans-serif;
  line-height: 1.2;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const Subtitle = styled.p`
  color: rgba(255, 255, 255, 0.9);
  font-size: 1.4rem;
  margin-bottom: 2rem;
  line-height: 1.6;
  font-weight: 400;
  
  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const CTAButton = styled(Link)`
  background: var(--gradient-secondary);
  color: white;
  padding: 1rem 2.5rem;
  border-radius: var(--radius-xl);
  font-size: 1.3rem;
  font-weight: 600;
  text-decoration: none;
  display: inline-block;
  box-shadow: var(--shadow-lg);
  transition: all 0.3s ease;
  animation: ${pulse} 2s infinite;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: var(--shadow-xl);
    animation: none;
  }
`;

const HeroVisual = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  animation: ${float} 3s ease-in-out infinite;
`;

const MascotContainer = styled.div`
  width: 300px;
  height: 300px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: var(--radius-xl);
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(10px);
  border: 2px solid rgba(255, 255, 255, 0.2);
  font-size: 8rem;
  box-shadow: var(--shadow-xl);
`;

const Features = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 4rem;
  animation: ${fadeInUp} 1s ease-out 0.5s both;
`;

const FeatureCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  padding: 2rem;
  border-radius: var(--radius-lg);
  text-align: center;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    background: rgba(255, 255, 255, 0.15);
  }
`;

const FeatureIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1rem;
`;

const FeatureTitle = styled.h3`
  color: white;
  font-size: 1.3rem;
  margin-bottom: 0.5rem;
  font-weight: 600;
`;

const FeatureText = styled.p`
  color: rgba(255, 255, 255, 0.8);
  font-size: 1rem;
  line-height: 1.5;
`;

const FloatingElements = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  overflow: hidden;
`;

const FloatingElement = styled.div`
  position: absolute;
  font-size: 2rem;
  opacity: 0.1;
  animation: ${float} ${props => props.duration || 4}s ease-in-out infinite;
  animation-delay: ${props => props.delay || 0}s;
  
  &:nth-child(1) { top: 10%; left: 10%; }
  &:nth-child(2) { top: 20%; right: 15%; }
  &:nth-child(3) { top: 60%; left: 5%; }
  &:nth-child(4) { top: 70%; right: 10%; }
  &:nth-child(5) { bottom: 20%; left: 20%; }
  &:nth-child(6) { bottom: 30%; right: 5%; }
`;

const RoleChoiceSection = styled.div`
  margin: 3rem 0 2rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const RoleChoiceTitle = styled.h2`
  color: #fff;
  font-size: 2rem;
  margin-bottom: 1.2rem;
  font-family: 'Poppins', Arial, sans-serif;
`;
const RoleButtonRow = styled.div`
  display: flex;
  gap: 2.5rem;
`;
const RoleButton = styled.button`
  background: ${props => props.variant === 'student' ? '#f59e42' : '#8B5CF6'};
  color: #fff;
  border: none;
  border-radius: 24px;
  padding: 1.2rem 2.5rem;
  font-size: 1.3rem;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 4px 24px rgba(0,0,0,0.08);
  transition: background 0.2s, transform 0.2s;
  display: flex;
  flex-direction: column;
  align-items: center;
  &:hover {
    background: ${props => props.variant === 'student' ? '#f7b733' : '#6d28d9'};
    transform: translateY(-4px) scale(1.04);
  }
`;
const Emoji = styled.span`
  font-size: 2rem;
  margin-bottom: 0.5rem;
`;

const LandingPage = () => {
  const navigate = useNavigate();
  return (
  <Wrapper>
    <FloatingElements>
      <FloatingElement duration={6} delay={0}>🌟</FloatingElement>
      <FloatingElement duration={5} delay={1}>💻</FloatingElement>
      <FloatingElement duration={7} delay={2}>🧩</FloatingElement>
      <FloatingElement duration={4} delay={3}>🎯</FloatingElement>
      <FloatingElement duration={6} delay={1.5}>🚀</FloatingElement>
      <FloatingElement duration={5} delay={2.5}>✨</FloatingElement>
    </FloatingElements>
    <Container>
      <Hero>
        <HeroContent>
          <Title>🌟 CodeSensAI</Title>
          <Subtitle>
            The magical platform where girls become tech creators! Learn coding with your friendly AI guide, solve fun challenges, and unlock amazing rewards. Ready to start your coding adventure?
          </Subtitle>
          <CTAButton to="/register">🚀 Start Your Journey!</CTAButton>
        </HeroContent>
        <HeroVisual>
          <MascotContainer>
            🥋
          </MascotContainer>
        </HeroVisual>
      </Hero>
        {/* Role Choice Section */}
        <RoleChoiceSection>
          <RoleChoiceTitle>Who are you?</RoleChoiceTitle>
          <RoleButtonRow>
            <RoleButton variant="student" onClick={() => navigate('/login')}>
              <Emoji>👧👦</Emoji>
              I’m a Student
            </RoleButton>
            <RoleButton variant="parent" onClick={() => navigate('/parent-login')}>
              <Emoji>👩‍👧‍👦</Emoji>
              I’m a Parent
            </RoleButton>
          </RoleButtonRow>
        </RoleChoiceSection>
      <Features>
        <FeatureCard>
          <FeatureIcon>🤖</FeatureIcon>
          <FeatureTitle>AI-Powered Learning</FeatureTitle>
          <FeatureText>Your personal AI guide, Sensai, helps you learn at your own pace with fun, interactive lessons.</FeatureText>
        </FeatureCard>
        
        <FeatureCard>
          <FeatureIcon>🎮</FeatureIcon>
          <FeatureTitle>Fun Challenges</FeatureTitle>
          <FeatureText>Solve puzzles, complete quests, and earn badges as you master coding concepts.</FeatureText>
        </FeatureCard>
        
        <FeatureCard>
          <FeatureIcon>🏆</FeatureIcon>
          <FeatureTitle>Earn Rewards</FeatureTitle>
          <FeatureText>Collect points, unlock achievements, and track your progress as you become a coding expert.</FeatureText>
        </FeatureCard>
        
        <FeatureCard>
          <FeatureIcon>👥</FeatureIcon>
          <FeatureTitle>Safe Community</FeatureTitle>
          <FeatureText>Connect with other young coders in a safe, supportive environment designed just for girls.</FeatureText>
        </FeatureCard>
      </Features>
    </Container>
  </Wrapper>
);
};

export default LandingPage; 