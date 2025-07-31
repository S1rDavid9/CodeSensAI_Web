import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Wrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(120deg, #fbc2eb 0%, #a18cd1 50%, #fcb69f 100%);
`;

const Title = styled.h1`
  color: #8B5CF6;
  font-size: 2.5rem;
  margin-bottom: 2rem;
  font-family: 'Poppins', Arial, sans-serif;
`;

const ButtonRow = styled.div`
  display: flex;
  gap: 2.5rem;
`;

const BigButton = styled.button`
  background: ${props => props.variant === 'student' ? '#f59e42' : '#8B5CF6'};
  color: #fff;
  border: none;
  border-radius: 24px;
  padding: 2.2rem 3.5rem;
  font-size: 2rem;
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
  font-size: 2.5rem;
  margin-bottom: 0.7rem;
`;

export default function RoleChoicePage() {
  const navigate = useNavigate();
  return (
    <Wrapper>
      <Title>Who are you?</Title>
      <ButtonRow>
        <BigButton variant="student" onClick={() => navigate('/student-login')}>
          <Emoji>👧👦</Emoji>
          I’m a Student
        </BigButton>
        <BigButton variant="parent" onClick={() => navigate('/parent-login')}>
          <Emoji>👩‍👧‍👦</Emoji>
          I’m a Parent
        </BigButton>
      </ButtonRow>
    </Wrapper>
  );
} 