import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import Spinner from '../components/Spinner';
import { useNotifications } from '../NotificationContext';
import { ThemeContext } from '../ThemeContext';

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

const QuestionBox = styled.div`
  background: ${props => {
    // Use theme-aware gradient that works well in both light and dark modes
    const isLight = props.theme === 'light' || !props.theme;
    if (isLight) {
      return 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
    } else {
      return 'linear-gradient(135deg, var(--surface-purple) 60%, var(--accent-pink) 100%)';
    }
  }};
  border-radius: 22px;
  box-shadow: var(--shadow-lg);
  padding: 2em 2.5em;
  margin-bottom: 2em;
  text-align: center;
  color: ${props => {
    // Use theme-aware color that works well in both light and dark modes
    const isLight = props.theme === 'light' || !props.theme;
    return isLight ? '#000' : '#fff';
  }};
  font-size: 1.25rem;
  font-weight: 700;
  letter-spacing: 0.5px;
  width: 100%;
  max-width: 600px;
  
  @media (max-width: 768px) {
    padding: 1.5em 2em;
    font-size: 1.1rem;
    margin-bottom: 1.5em;
  }
  
  @media (max-width: 480px) {
    padding: 1.2em 1.5em;
    font-size: 1rem;
    margin-bottom: 1.2em;
  }
`;

const OptionButton = styled.button`
  background: var(--surface-white);
  color: var(--text-primary);
  border: 2.5px solid var(--primary-purple);
  border-radius: 18px;
  padding: 1em 2em;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(.4,2,.6,1);
  box-shadow: var(--shadow-md);
  min-width: 280px;
  min-height: 54px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5em;
  width: 100%;
  max-width: 500px;
  
  @media (max-width: 768px) {
    min-width: 240px;
    padding: 0.8em 1.5em;
    font-size: 1rem;
  }
  
  @media (max-width: 480px) {
    min-width: 200px;
    padding: 0.7em 1.2em;
    font-size: 0.95rem;
    min-height: 48px;
  }
  
  &:hover {
    background: var(--primary-purple);
    color: white;
    border: 2.5px solid var(--primary-purple);
    transform: translateY(-3px) scale(1.02);
    box-shadow: var(--shadow-lg);
  }
  
  &:disabled {
    opacity: 0.6;
    background: var(--surface-light);
    color: var(--text-secondary);
    border: 2.5px dashed var(--text-light);
    cursor: not-allowed;
    transform: none;
  }
  
  &.selected {
    background: var(--primary-purple);
    color: white;
    border: 2.5px solid var(--primary-purple);
  }
  
  &.correct {
    background: var(--success);
    color: white;
    border: 2.5px solid var(--success);
    box-shadow: 0 0 0 4px rgba(34,197,94,0.12);
  }
  
  &.incorrect {
    background: var(--error);
    color: white;
    border: 2.5px solid var(--error);
    box-shadow: 0 0 0 4px rgba(239,68,68,0.12);
  }
`;

const ProgressBar = styled.div`
  width: 100%;
  max-width: 600px;
  height: 20px;
  background-color: var(--surface-light);
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 1em;
  position: relative;
  
  @media (max-width: 768px) {
    height: 18px;
  }
  
  @media (max-width: 480px) {
    height: 16px;
  }
`;

const ProgressFill = styled.div`
  height: 100%;
  background-color: ${props => props.progress > 0 ? 'var(--primary-purple)' : 'var(--surface-light)'};
  width: ${props => props.progress + '%'};
  transition: width 0.5s ease-out;
`;

const ProgressText = styled.span`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  font-weight: 600;
  font-size: 0.9rem;
  color: var(--text-primary);
  
  @media (max-width: 480px) {
    font-size: 0.8rem;
  }
`;

const ScoreDisplay = styled.div`
  color: var(--primary-purple);
  font-size: 1.2rem;
  margin-bottom: 1em;
  font-weight: 600;
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
  
  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;

const ButtonRow = styled.div`
  display: flex;
  gap: 1.2em;
  justify-content: center;
  margin-top: 1.5em;
  flex-wrap: wrap;
  
  @media (max-width: 768px) {
    gap: 1em;
    margin-top: 1.2em;
  }
  
  @media (max-width: 480px) {
    gap: 0.8em;
    margin-top: 1em;
  }
`;

const OptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  max-width: 600px;
  align-items: center;
  
  @media (max-width: 768px) {
    gap: 0.8rem;
  }
  
  @media (max-width: 480px) {
    gap: 0.6rem;
  }
`;

const ResetButton = styled.button`
  background: var(--primary-purple);
  color: white;
  border: none;
  border-radius: 12px;
  padding: 0.8em 1.5em;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: var(--shadow-md);
  
  &:hover {
    background: var(--accent-pink);
    transform: translateY(-2px);
    box-shadow: var(--shadow-lg);
  }
`;



const QuizzesPage = () => {
  const { theme } = useContext(ThemeContext);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [isCorrect, setIsCorrect] = useState(null);
  const [showTryAgain, setShowTryAgain] = useState(false);
  const [mascotAnim, setMascotAnim] = useState('');
  const [showNext, setShowNext] = useState(false);
  const [loading, setLoading] = useState(true);
  const [attempts, setAttempts] = useState(0); // Track attempts per question
  const [failedQuestions, setFailedQuestions] = useState([]); // Track failed questions for feedback
  const [quizCompleted, setQuizCompleted] = useState(false); // Flag to prevent multiple notifications
  const [notificationShown, setNotificationShown] = useState(false); // Track if notification has been shown
  const { showQuizCompletion } = useNotifications();

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

  // Show notification when quiz is completed
  useEffect(() => {
    if (quizCompleted && !notificationShown) {
      const percentage = Math.round((score / questions.length) * 100);
      showQuizCompletion(score, questions.length, percentage);
      setNotificationShown(true); // Prevent multiple notifications
    }
  }, [quizCompleted, score, questions.length, notificationShown, showQuizCompletion]);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);



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
      if (attempts === 0 || attempts === 1) {
        setScore(score + 1);
      }
      setFeedback('Woo-hoo! You got it! 🎉✨');
      setShowNext(true);
      setShowTryAgain(false);
      setAttempts(0); // Reset attempts for next question
    } else {
      if (attempts === 0) {
        setFeedback('Oops! That is not quite right. Try again! 💪🌈');
        setShowTryAgain(true);
        setShowNext(false);
        setAttempts(1);
      } else {
        setFeedback(`Sorry, the correct answer was: "${questions[currentQuestion].options[questions[currentQuestion].correct]}"`);
        setShowTryAgain(false);
        setShowNext(true);
        setFailedQuestions([...failedQuestions, currentQuestion]);
        setAttempts(0); // Reset for next question
      }
    }
  };

  const handleNext = () => {
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(null);
      setShowFeedback(false);
      setFeedback('');
      setIsCorrect(null);
      setShowTryAgain(false);
      setShowNext(false);
      setMascotAnim('');
    } else {
      // Quiz is complete
      setQuizCompleted(true);
      // Remove the notification call from here since it's handled in useEffect
    }
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
    setQuizCompleted(false);
    setFailedQuestions([]);
    setNotificationShown(false); // Reset notification state
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  if (loading) {
    return <Spinner message="Are you ready for an awesome challenge🦾..." />;
  }

  return (
    <Wrapper>
      <Title>Code Quiz with Sensai!</Title>
      <Subtitle>Test your coding knowledge! You can do it! 💪</Subtitle>
      <ProgressBar>
        <ProgressFill progress={progress} />
        <ProgressText>Question {currentQuestion + 1} of {questions.length}</ProgressText>
      </ProgressBar>
      <ScoreDisplay>Score: {score}/{questions.length} 🌟</ScoreDisplay>
      {currentQuestion < questions.length ? (
        <>
          <QuestionBox theme={theme}>
            {questions[currentQuestion].question}
          </QuestionBox>
          <OptionsContainer>
            {questions[currentQuestion].options.map((option, index) => (
              <OptionButton
                key={index}
                onClick={() => setSelectedOption(index)}
                disabled={showFeedback}
                className={
                  selectedOption === index
                    ? isCorrect === null
                      ? 'selected'
                      : isCorrect && selectedOption === index
                        ? 'correct'
                        : !isCorrect && selectedOption === index && attempts === 1
                          ? 'incorrect'
                          : ''
                    : ''
                }
              >
                {option}
              </OptionButton>
            ))}
          </OptionsContainer>
          <ButtonRow>
            {!showFeedback && (
              <OptionButton onClick={handleSubmit} disabled={selectedOption === null} style={{ minWidth: 140 }}>
                Submit
              </OptionButton>
            )}
            {showTryAgain && !showNext && (
              <OptionButton onClick={handleTryAgain} style={{ minWidth: 140 }}>
                Try Again
              </OptionButton>
            )}
            {showNext && (
              <OptionButton 
                onClick={handleNext} 
                style={{ 
                  minWidth: 140, 
                  background: currentQuestion + 1 === questions.length ? 'var(--success)' : 'var(--accent-pink)', 
                  color: '#fff', 
                  border: `2.5px solid ${currentQuestion + 1 === questions.length ? 'var(--success)' : 'var(--accent-pink)'}` 
                }}
              >
                {currentQuestion + 1 === questions.length ? '🎉 Finish Quiz!' : 'Next Question'}
              </OptionButton>
            )}
          </ButtonRow>
        </>
      ) : (
        <div style={{ textAlign: 'center', color: 'var(--text-primary)' }}>
          <h2 style={{ color: 'var(--primary-purple)', fontSize: '2.5rem', marginBottom: '1rem' }}>
            🎉 Quiz Complete! 🎉
          </h2>
          <div style={{ 
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
            borderRadius: '20px', 
            padding: '2rem', 
            marginBottom: '2rem',
            color: '#fff',
            boxShadow: 'var(--shadow-lg)',
            width: '100%',
            maxWidth: '600px'
          }}>
            <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>
              Score: {score}/{questions.length} ⭐
            </h3>
            <p style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>
              You got {score} out of {questions.length} correct
            </p>
            <p style={{ fontSize: '1.1rem', opacity: 0.9 }}>
              {score === questions.length 
                ? 'Perfect score! You are absolutely amazing! 🌟' 
                : score >= questions.length * 0.8 
                  ? 'Great job! You are doing amazing! 🚀' 
                  : score >= questions.length * 0.6 
                    ? 'Good work! Keep practicing! 💪' 
                    : 'Keep learning! You will get better! 📚'
              }
            </p>
          </div>
          {failedQuestions.length > 0 && (
            <div style={{ 
              background: 'var(--surface-white)', 
              borderRadius: '15px', 
              padding: '1.5rem', 
              margin: '1.5em 0', 
              boxShadow: 'var(--shadow-md)',
              border: '2px solid var(--error)'
            }}>
              <h4 style={{ color: 'var(--error)', fontSize: '1.3rem', marginBottom: '1rem', fontWeight: '600' }}>
                📝 Review these questions you missed:
              </h4>
              <div style={{ textAlign: 'left' }}>
                {failedQuestions.map((idx, index) => (
                  <div key={idx} style={{ 
                    marginBottom: '1rem', 
                    padding: '1rem', 
                    background: 'var(--surface-light)', 
                    borderRadius: '10px',
                    borderLeft: '4px solid var(--error)'
                  }}>
                    <p style={{ 
                      color: 'var(--text-primary)', 
                      fontWeight: '600', 
                      marginBottom: '0.5rem',
                      fontSize: '1.1rem'
                    }}>
                      {index + 1}. {questions[idx].question}
                    </p>
                    <p style={{ 
                      color: 'var(--error)', 
                      fontWeight: '600',
                      fontSize: '1rem'
                    }}>
                      ✅ Correct answer: {questions[idx].options[questions[idx].correct]}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
          <ResetButton onClick={resetQuiz}>Try Again! 🔄</ResetButton>
        </div>
      )}
    </Wrapper>
  );
};

export default QuizzesPage; 