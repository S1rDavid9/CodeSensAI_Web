import React, { useState } from 'react';
import styled from 'styled-components';
import SensaiMascot from '../components/SensaiMascot';

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
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
  transition: background 0.2s, color 0.2s, border 0.2s, opacity 0.2s;
  &:hover {
    background: var(--primary-purple);
    color: #fff;
    border: 2px solid var(--secondary-purple);
  }
  &:disabled {
    opacity: 0.6;
    background: var(--accent);
    color: var(--primary-purple);
    border: 2px dashed var(--secondary-purple);
    cursor: not-allowed;
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

const OptionsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const QuizzesPage = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [isCorrect, setIsCorrect] = useState(null);
  const [showTryAgain, setShowTryAgain] = useState(false);
  const [mascotAnim, setMascotAnim] = useState('');
  const [showNext, setShowNext] = useState(false);

  // Expanded and more diverse questions
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
    },
    {
      question: 'Which HTML tag is used to display a picture on a web page?',
      options: ['<img>', '<picture>', '<photo>', '<src>'],
      correct: 0
    },
    {
      question: 'What property changes the text color in CSS?',
      options: ['font-style', 'color', 'background', 'text-align'],
      correct: 1
    },
    {
      question: 'Which of these is used to repeat code in JavaScript?',
      options: ['if statement', 'for loop', 'variable', 'function'],
      correct: 1
    },
    {
      question: 'What is the correct way to start an array in JavaScript?',
      options: ['let arr = []', 'let arr = {}', 'let arr = ()', 'let arr = <>'],
      correct: 0
    },
    {
      question: 'Which CSS property makes text bold?',
      options: ['font-weight', 'font-size', 'font-style', 'text-decoration'],
      correct: 0
    },
    {
      question: 'What does the <h1> tag represent in HTML?',
      options: ['A heading', 'A hyperlink', 'A list', 'A table'],
      correct: 0
    },
    {
      question: 'Which of these is NOT a valid JavaScript variable name?',
      options: ['myVar', '2cool', '_name', 'userName'],
      correct: 1
    },
    {
      question: 'What is the output of 2 + "2" in JavaScript?',
      options: ['4', '22', 'NaN', 'undefined'],
      correct: 1
    },
    {
      question: 'Which HTML tag creates a link to another page?',
      options: ['<a>', '<link>', '<href>', '<url>'],
      correct: 0
    },
    {
      question: 'What does CSS stand for?',
      options: [
        'Cascading Style Sheets',
        'Creative Style Syntax',
        'Computer Styled Sections',
        'Colorful Style Sheets'
      ],
      correct: 0
    },
  ];

  const handleSubmit = () => {
    if (selectedOption === null) {
      setFeedback('Please select an answer!');
      setIsCorrect(false);
      setShowFeedback(true);
      setMascotAnim('shake');
      setShowTryAgain(false);
      return;
    }
    const isAnswerCorrect = selectedOption === questions[currentQuestion].correct;
    setIsCorrect(isAnswerCorrect);
    setShowFeedback(true);
    setMascotAnim(isAnswerCorrect ? 'bounce' : 'shake');
    if (isAnswerCorrect) {
      setScore(score + 1);
      setFeedback('Woo-hoo! You got it! 🎉✨');
      setShowNext(true);
      setShowTryAgain(false);
    } else {
      setFeedback('Oops! That is not quite right. Try again! 💪🌈');
      setShowTryAgain(true);
      setShowNext(false);
    }
  };

  const handleNext = () => {
    setCurrentQuestion(currentQuestion + 1);
    setSelectedOption(null);
    setShowFeedback(false);
    setIsCorrect(null);
    setShowTryAgain(false);
    setShowNext(false);
    setMascotAnim('');
  };

  const handleTryAgain = () => {
    setShowFeedback(false);
    setIsCorrect(null);
    setShowTryAgain(false);
    setMascotAnim('');
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setSelectedOption(null);
    setShowFeedback(false);
    setFeedback('');
    setIsCorrect(null);
    setShowTryAgain(false);
    setShowNext(false);
    setMascotAnim('');
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <Wrapper style={{ background: 'linear-gradient(135deg, #ede9fe 0%, #fff 100%)', minHeight: '80vh', borderRadius: 24, boxShadow: '0 8px 32px rgba(124,58,237,0.08)' }}>
      <SensaiMascot
        expression={isCorrect === null ? 'thinking' : isCorrect ? 'happy' : 'surprised'}
        message={showFeedback ? feedback : "Let's ace this quiz together!"}
        isShaking={mascotAnim === 'shake'}
        isCelebrating={mascotAnim === 'bounce'}
      />
      <Title style={{ fontSize: '2.5rem', color: '#7c3aed', marginBottom: 0 }}>Code Quiz with Sensai!</Title>
      <Subtitle style={{ color: '#a21caf', fontWeight: 600, marginBottom: 24 }}>Test your coding knowledge! You can do it! 💪</Subtitle>
      <ProgressBar style={{ marginBottom: 24, background: '#e0e7ff' }}>
        <ProgressFill progress={progress} style={{ background: 'linear-gradient(90deg, #7c3aed 60%, #a21caf 100%)' }} />
        <ProgressText>Question {currentQuestion + 1} of {questions.length}</ProgressText>
      </ProgressBar>
      <ScoreDisplay style={{ color: '#a21caf', fontWeight: 700, fontSize: '1.3rem' }}>Score: {score}/{questions.length} 🌟</ScoreDisplay>
      {currentQuestion < questions.length ? (
        <>
          <QuestionBox style={{ border: '2px solid #a21caf', background: '#fff7fb', fontSize: '1.25rem', fontWeight: 600 }}>
            {questions[currentQuestion].question}
          </QuestionBox>
          <OptionsContainer>
            {questions[currentQuestion].options.map((option, index) => (
              <OptionButton
                key={index}
                onClick={() => setSelectedOption(index)}
                disabled={showFeedback && isCorrect}
                style={{
                  border: selectedOption === index ? '3px solid #7c3aed' : undefined,
                  background: selectedOption === index ? '#ede9fe' : undefined,
                  boxShadow: showFeedback && !isCorrect && selectedOption === index ? '0 0 0 3px #f44336' : undefined,
                  color: selectedOption === index ? '#a21caf' : undefined,
                  fontWeight: selectedOption === index ? 700 : 600,
                  minWidth: 180,
                  margin: 8,
                  fontSize: '1.1rem',
                  letterSpacing: 0.5
                }}
              >
                {option}
              </OptionButton>
            ))}
          </OptionsContainer>
          <div style={{ marginTop: 24 }}>
            {!showFeedback && (
              <OptionButton onClick={handleSubmit} disabled={selectedOption === null} style={{ background: '#7c3aed', color: '#fff', border: 'none', fontSize: '1.15rem', padding: '0.8em 2em', borderRadius: 20, margin: 8, boxShadow: '0 2px 8px #ede9fe' }}>
                Submit
              </OptionButton>
            )}
            {showTryAgain && (
              <OptionButton onClick={handleTryAgain} style={{ background: '#f44336', color: '#fff', border: 'none', marginLeft: 8, fontSize: '1.1rem', borderRadius: 20, margin: 8 }}>
                Try Again
              </OptionButton>
            )}
            {showNext && (
              <OptionButton onClick={handleNext} style={{ background: '#22c55e', color: '#fff', border: 'none', marginLeft: 8, fontSize: '1.1rem', borderRadius: 20, margin: 8 }}>
                Next Question
              </OptionButton>
            )}
          </div>
        </>
      ) : (
        <ResultsContainer>
          <ResultTitle style={{ color: '#7c3aed', fontSize: '2.5rem', marginBottom: 0 }}>
            {score === questions.length ? '🏆 Perfect Score! 🏆' : '🎉 Quiz Complete! 🎉'}
          </ResultTitle>
          <ResultScore style={{ color: '#a21caf', fontWeight: 700, fontSize: '1.7rem' }}>You got {score} out of {questions.length} correct!</ResultScore>
          <ResultMessage style={{ color: '#7c3aed', fontWeight: 600, fontSize: '1.2rem' }}>
            {score === questions.length 
              ? 'Incredible! You are a coding master! 🌟' 
              : score >= questions.length * 0.7 
                ? 'Great job! You are doing amazing! 🚀' 
                : 'Good effort! Keep practicing and you will get even better! 💪'
            }
          </ResultMessage>
          <ResetButton onClick={resetQuiz} style={{ background: '#7c3aed', color: '#fff', fontSize: '1.15rem', borderRadius: 20, padding: '0.8em 2em', marginTop: 16, boxShadow: '0 2px 8px #ede9fe' }}>Try Again! 🔄</ResetButton>
        </ResultsContainer>
      )}
    </Wrapper>
  );
};

export default QuizzesPage; 