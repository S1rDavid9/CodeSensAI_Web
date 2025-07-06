import React from 'react';
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

const ProgressBar = styled.div`
  width: 260px;
  height: 20px;
  background: var(--accent);
  border-radius: 12px;
  margin: 1em auto 2em auto;
  overflow: hidden;
`;

const ProgressFill = styled.div`
  height: 100%;
  background: linear-gradient(90deg, #8e44ad 60%, #a569bd 100%);
  width: ${props => props.progress || 0}%;
  border-radius: 12px;
  transition: width 0.6s;
`;

const XP = styled.div`
  color: var(--primary-purple);
  font-size: 1.1rem;
  margin-bottom: 1.5em;
  font-weight: 600;
`;

const BadgeBar = styled.div`
  display: flex;
  gap: 1.2em;
  justify-content: center;
  margin-bottom: 2em;
`;

const Badge = styled.div`
  background: #fff;
  border-radius: 50%;
  width: 54px;
  height: 54px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  box-shadow: 0 2px 8px rgba(142, 68, 173, 0.08);
  border: 2px solid var(--primary-purple);
  flex-direction: column;
`;

const BadgeLabel = styled.div`
  font-size: 0.8rem;
  color: var(--secondary-purple);
  margin-top: 0.2em;
`;

const ProgressPage = () => {
  const progress = 70;
  const xp = 1200;
  const badges = [
    { emoji: '🏅', label: 'Starter' },
    { emoji: '🎯', label: 'Focus' },
    { emoji: '🌟', label: 'Achiever' },
  ];
  return (
    <Wrapper>
      <Mascot>🏆</Mascot>
      <Title>Progress & Badges</Title>
      <XP>XP: {xp} / 2000</XP>
      <ProgressBar>
        <ProgressFill progress={progress} />
      </ProgressBar>
      <div style={{ color: 'var(--primary-purple)', marginBottom: '1.5em' }}>
        Progress: <b>{progress}%</b> to next level!
      </div>
      <BadgeBar>
        {badges.map(b => (
          <Badge key={b.label} title={b.label}>
            {b.emoji}
            <BadgeLabel>{b.label}</BadgeLabel>
          </Badge>
        ))}
      </BadgeBar>
      <div style={{ color: 'var(--secondary-purple)', fontSize: '1.1rem', marginTop: '1em' }}>
        Keep learning to earn more badges and level up!
      </div>
    </Wrapper>
  );
};

export default ProgressPage; 