import React, { useState } from 'react';
import styled from 'styled-components';
import { useMascot } from '../hooks/useMascot';

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 70vh;
  background: var(--background);
  padding: 2rem 1rem;
  position: relative;
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

const Subtitle = styled.h3`
  color: var(--primary-purple);
  font-size: 1.5rem;
  margin-bottom: 1em;
  font-family: 'Poppins', Arial, sans-serif;
`;

const QuestionBox = styled.div`
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 2px 8px rgba(142, 68, 173, 0.08);
  padding: 1.5em 2em;
  margin-bottom: 1.5em;
  text-align: center;
  color: var(--primary-purple);
  font-size: 1.15rem;
`;

const OptionButton = styled.button`
  background: var(--accent);
  color: var(--primary-purple);
  border: 2px solid var(--primary-purple);
  border-radius: 16px;
  padding: 0.7em 1.5em;
  margin: 0.5em 0.5em;
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

const ProgressBar = styled.div`
  width: 100%;
  height: 20px;
  background-color: #ddd;
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 1em;
`;

const ProgressFill = styled.div`
  height: 100%;
  background-color: ${props => props.progress > 0 ? 'var(--primary-purple)' : '#ddd'};
  width: ${props => props.progress + '%'};
  transition: width 0.5s ease-out;
`;

const ProgressText = styled.span`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  font-weight: 600;
`;

const ScoreDisplay = styled.div`
  color: var(--primary-purple);
  font-size: 1.2rem;
  margin-bottom: 1em;
`;

const ResultsContainer = styled.div`
  text-align: center;
  padding: 2rem;
`;

const ResultTitle = styled.h2`
  color: var(--primary-purple);
  font-size: 2rem;
  margin-bottom: 0.5em;
`;

const ResultScore = styled.div`
  color: var(--primary-purple);
  font-size: 1.5rem;
  margin-bottom: 0.5em;
`;

const ResultMessage = styled.p`
  color: var(--primary-purple);
  font-size: 1.2rem;
  margin-bottom: 1em;
`;

const ResetButton = styled.button`
  background: var(--primary-purple);
  color: #fff;
  border: none;
  border-radius: 16px;
  padding: 0.7em 1.5em;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
  &:hover {
    background: var(--secondary-purple);
  }
`;

const FeedbackMessage = styled.div`
  position: fixed;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  background: ${props => (props.correct ? '#e8f5e8' : '#ffeaea')};
  color: ${props => (props.correct ? '#2e7d32' : '#d32f2f')};
  border: 3px solid ${props => (props.correct ? '#4caf50' : '#f44336')};
  border-radius: 20px;
  padding: 1rem 2rem;
  font-size: 1.2rem;
  font-weight: 700;
  text-align: center;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  animation: bounceIn 0.6s ease-out;
  
  @keyframes bounceIn {
    0% {
      transform: translateX(-50%) scale(0.3);
      opacity: 0;
    }
    50% {
      transform: translateX(-50%) scale(1.05);
    }
    70% {
      transform: translateX(-50%) scale(0.9);
    }
    100% {
      transform: translateX(-50%) scale(1);
      opacity: 1;
    }
  }
`;

const OptionsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const QuizzesPage = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedback, setFeedback] = useState('');
  const { congratulate, comfort } = useMascot();

  const questions = [
    {
      question: 'What does HTML stand for?',
      options: [
        'Hyper Text Markup Language',
        'High Tech Modern Language',
        'Home Tool Markup Language',
        'Hyperlink and Text Markup Language'
      ],
      correct: 0
    },
    {
      question: 'Which symbol is used for comments in JavaScript?',
      options: ['//', '<!--', '/*', '##'],
      correct: 0
    },
    {
      question: 'What does CSS stand for?',
      options: [
        'Computer Style Sheets',
        'Creative Style Sheets',
        'Cascading Style Sheets',
        'Colorful Style Sheets'
      ],
      correct: 2
    },
    {
      question: 'Which of these is a programming language?',
      options: ['HTML', 'CSS', 'Python', 'XML'],
      correct: 2
    },
    {
      question: 'What is the purpose of a function in programming?',
      options: [
        'To make the code look pretty',
        'To store data',
        'To perform a specific task',
        'To create variables'
      ],
      correct: 2
    }
  ];

  const handleAnswer = (selectedOption) => {
    const isCorrect = selectedOption === questions[currentQuestion].correct;
    
    if (isCorrect) {
      setScore(score + 1);
      setFeedback('Woo-hoo! You got it! 🎉✨');
      congratulate('🎉 Correct! You are a coding genius! 🎉');
    } else {
      setFeedback('Oopsie! That is not quite right, but do not worry! Try again, you can do it! 💪🌈');
      comfort('💪 Do not worry! Every mistake helps you learn! 💪');
    }
    
    setShowFeedback(true);
    
    setTimeout(() => {
      setShowFeedback(false);
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      }
    }, 2000);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowFeedback(false);
    setFeedback('');
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <Wrapper>
      <Mascot>🧙‍♀️</Mascot>
      <Title>Code Quiz with Sensai!</Title>
      <Subtitle>Test your coding knowledge! You can do it! 💪</Subtitle>
      
      <ProgressBar>
        <ProgressFill progress={progress} />
        <ProgressText>Question {currentQuestion + 1} of {questions.length}</ProgressText>
      </ProgressBar>
      
      <ScoreDisplay>Score: {score}/{questions.length} 🌟</ScoreDisplay>
      
      {currentQuestion < questions.length ? (
        <>
          <QuestionBox>
            {questions[currentQuestion].question}
          </QuestionBox>
          
          <OptionsContainer>
            {questions[currentQuestion].options.map((option, index) => (
              <OptionButton
                key={index}
                onClick={() => handleAnswer(index)}
                disabled={showFeedback}
              >
                {option}
              </OptionButton>
            ))}
          </OptionsContainer>
        </>
      ) : (
        <ResultsContainer>
          <ResultTitle>
            {score === questions.length ? '🏆 Perfect Score! 🏆' : '🎉 Quiz Complete! 🎉'}
          </ResultTitle>
          <ResultScore>You got {score} out of {questions.length} correct!</ResultScore>
          <ResultMessage>
            {score === questions.length 
              ? 'Incredible! You are a coding master! 🌟' 
              : score >= questions.length * 0.7 
                ? 'Great job! You are doing amazing! 🚀' 
                : 'Good effort! Keep practicing and you will get even better! 💪'
            }
          </ResultMessage>
          <ResetButton onClick={resetQuiz}>Try Again! 🔄</ResetButton>
        </ResultsContainer>
      )}
      
      {showFeedback && (
        <FeedbackMessage>
          {feedback}
        </FeedbackMessage>
      )}
    </Wrapper>
  );
};

export default QuizzesPage; 