import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { useParams, useNavigate } from 'react-router-dom';
import { useUser } from '../UserContext';
import { ThemeContext } from '../ThemeContext';
import { updateUserProgress } from '../api';
import modules from '../data/modules';
import SensaiMascot from '../components/SensaiMascot';
import { 
  FaArrowLeft, 
  FaPlay, 
  FaPause, 
  FaCheck, 
  FaTimes, 
  FaStar,
  FaTrophy,
  FaLightbulb,
  FaCode,
  FaBook,
  FaGamepad,
  FaMedal,
  FaClock,
  FaGraduationCap
} from 'react-icons/fa';

// Styled Components
const PageContainer = styled.div`
  min-height: 100vh;
  background: ${props => props.theme === 'dark' 
    ? 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)' 
    : 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #cbd5e1 100%)'};
  padding: 2rem;
  
  @media (max-width: 768px) {
    padding: 1rem;
  }
  

`;

const ModuleContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  background: ${props => props.theme === 'dark' ? '#1e293b' : '#ffffff'};
  border-radius: 24px;
  box-shadow: ${props => props.theme === 'dark' 
    ? '0 20px 40px rgba(0, 0, 0, 0.4)' 
    : '0 20px 40px rgba(0, 0, 0, 0.1)'};
  overflow: hidden;
`;

const ModuleHeader = styled.div`
  background: ${props => props.theme === 'dark' 
    ? 'linear-gradient(135deg, #7c3aed 0%, #8b5cf6 100%)' 
    : 'linear-gradient(135deg, #8b5cf6 0%, #a855f7 100%)'};
  color: white;
  padding: 3rem 2rem;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: -50%;
    right: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
    animation: float 6s ease-in-out infinite;
  }
  
  @keyframes float {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-20px) rotate(180deg); }
  }
  
  @media (max-width: 768px) {
    padding: 2rem 1rem;
  }
`;

const BackButton = styled.button`
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  
  &:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: translateY(-2px);
  }
`;

const ModuleTitle = styled.h1`
  font-size: 3rem;
  font-weight: 800;
  margin: 1rem 0;
  text-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const ModuleDescription = styled.p`
  font-size: 1.2rem;
  opacity: 0.9;
  margin-bottom: 2rem;
  max-width: 600px;
`;

const ModuleStats = styled.div`
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
  
  @media (max-width: 768px) {
    gap: 1rem;
  }
`;

const StatItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(255, 255, 255, 0.2);
  padding: 0.75rem 1.5rem;
  border-radius: 12px;
  backdrop-filter: blur(10px);
  font-weight: 600;
`;

const ContentSection = styled.div`
  padding: 3rem 2rem;
  
  @media (max-width: 768px) {
    padding: 2rem 1rem;
  }
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 8px;
  background: ${props => props.theme === 'dark' ? '#374151' : '#e5e7eb'};
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 2rem;
`;

const ProgressFill = styled.div`
  height: 100%;
  background: linear-gradient(90deg, #10b981 0%, #34d399 100%);
  width: ${props => props.progress}%;
  transition: width 0.5s ease;
  border-radius: 4px;
`;

const StepContainer = styled.div`
  background: ${props => props.theme === 'dark' ? '#334155' : '#f8fafc'};
  border-radius: 16px;
  padding: 2rem;
  margin-bottom: 2rem;
  border: 2px solid ${props => props.isActive ? '#8b5cf6' : 'transparent'};
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${props => props.theme === 'dark' 
      ? '0 10px 25px rgba(0, 0, 0, 0.3)' 
      : '0 10px 25px rgba(0, 0, 0, 0.1)'};
  }
`;

const MascotBubble = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  background: ${props => props.theme === 'dark' 
    ? 'linear-gradient(135deg, #7c3aed 0%, #8b5cf6 100%)' 
    : 'linear-gradient(135deg, #f3e8ff 0%, #e9d5ff 100%)'};
  color: ${props => props.theme === 'dark' ? 'white' : '#7c3aed'};
  padding: 1.5rem;
  border-radius: 20px;
  margin: 1.5rem 0;
  font-size: 1.1rem;
  font-weight: 600;
  box-shadow: 0 4px 12px rgba(139, 92, 246, 0.2);
  
  .mascot {
    font-size: 2rem;
    animation: bounce 2s infinite;
  }
  
  @keyframes bounce {
    0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
    40% { transform: translateY(-10px); }
    60% { transform: translateY(-5px); }
  }
`;

const CodePlayground = styled.div`
  background: ${props => props.theme === 'dark' ? '#1e293b' : '#ffffff'};
  border: 2px solid ${props => props.theme === 'dark' ? '#475569' : '#e5e7eb'};
  border-radius: 12px;
  overflow: hidden;
  margin: 1.5rem 0;
`;

const CodeHeader = styled.div`
  background: ${props => props.theme === 'dark' ? '#334155' : '#f1f5f9'};
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-weight: 600;
  color: ${props => props.theme === 'dark' ? '#e2e8f0' : '#475569'};
`;

const CodeHeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const PlayButton = styled.button`
  background: ${props => props.theme === 'dark' ? '#10b981' : '#059669'};
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${props => props.theme === 'dark' ? '#059669' : '#047857'};
    transform: translateY(-1px);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;

const CodeTextarea = styled.textarea`
  width: 100%;
  min-height: 120px;
  background: ${props => props.theme === 'dark' ? '#1e293b' : '#ffffff'};
  color: ${props => props.theme === 'dark' ? '#e2e8f0' : '#1f2937'};
  border: none;
  padding: 1rem;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 14px;
  line-height: 1.5;
  resize: vertical;
  
  &:focus {
    outline: none;
  }
`;

const CodeOutput = styled.div`
  background: ${props => props.theme === 'dark' ? '#0f172a' : '#f8fafc'};
  border-top: 1px solid ${props => props.theme === 'dark' ? '#475569' : '#e5e7eb'};
  padding: 1rem;
  min-height: 80px;
  color: ${props => props.theme === 'dark' ? '#e2e8f0' : '#374151'};
`;

const InteractiveCard = styled.div`
  background: ${props => props.theme === 'dark' ? '#334155' : '#ffffff'};
  border: 2px solid ${props => props.theme === 'dark' ? '#475569' : '#e5e7eb'};
  border-radius: 16px;
  padding: 2rem;
  margin: 1.5rem 0;
  text-align: center;
`;

const DragDropArea = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin: 1.5rem 0;
  justify-content: center;
`;

const DraggableItem = styled.div`
  background: ${props => props.theme === 'dark' 
    ? 'linear-gradient(135deg, #7c3aed 0%, #8b5cf6 100%)' 
    : 'linear-gradient(135deg, #f3e8ff 0%, #e9d5ff 100%)'};
  color: ${props => props.theme === 'dark' ? 'white' : '#7c3aed'};
  padding: 1rem 1.5rem;
  border-radius: 12px;
  font-weight: 600;
  cursor: grab;
  user-select: none;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(139, 92, 246, 0.3);
  }
  
  &:active {
    cursor: grabbing;
  }
`;

const DropZone = styled.div`
  min-height: 80px;
  border: 3px dashed ${props => props.isCorrect ? '#10b981' : props.isIncorrect ? '#ef4444' : '#8b5cf6'};
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  color: ${props => props.isCorrect ? '#10b981' : props.isIncorrect ? '#ef4444' : '#8b5cf6'};
  background: ${props => props.isCorrect ? 'rgba(16, 185, 129, 0.1)' : props.isIncorrect ? 'rgba(239, 68, 68, 0.1)' : 'rgba(139, 92, 246, 0.1)'};
  transition: all 0.3s ease;
  margin: 1rem 0;
`;

const QuizCard = styled.div`
  background: ${props => props.theme === 'dark' ? '#334155' : '#ffffff'};
  border: 2px solid ${props => props.theme === 'dark' ? '#475569' : '#e5e7eb'};
  border-radius: 16px;
  padding: 2rem;
  margin: 1.5rem 0;
`;

const QuizOption = styled.button`
  width: 100%;
  background: ${props => props.isSelected 
    ? (props.isCorrect ? '#10b981' : '#ef4444') 
    : (props.theme === 'dark' ? '#475569' : '#f1f5f9')};
  color: ${props => props.isSelected ? 'white' : (props.theme === 'dark' ? '#e2e8f0' : '#374151')};
  border: 2px solid ${props => props.isSelected 
    ? (props.isCorrect ? '#10b981' : '#ef4444') 
    : (props.theme === 'dark' ? '#475569' : '#e5e7eb')};
  border-radius: 12px;
  padding: 1rem;
  margin: 0.5rem 0;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: left;
  
  &:hover:not(:disabled) {
    background: ${props => props.theme === 'dark' ? '#64748b' : '#e2e8f0'};
    transform: translateY(-1px);
  }
  
  &:disabled {
    cursor: not-allowed;
  }
`;

const TryAgainButton = styled.button`
  background: ${props => props.theme === 'dark' ? '#ef4444' : '#dc2626'};
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 1rem;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${props => props.theme === 'dark' ? '#dc2626' : '#b91c1c'};
    transform: translateY(-1px);
  }
`;

const NavigationButtons = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 3rem;
  gap: 1rem;
`;

const NavButton = styled.button`
  background: ${props => props.variant === 'primary' 
    ? 'linear-gradient(135deg, #8b5cf6 0%, #a855f7 100%)' 
    : props.theme === 'dark' ? '#475569' : '#f1f5f9'};
  color: ${props => props.variant === 'primary' ? 'white' : (props.theme === 'dark' ? '#e2e8f0' : '#374151')};
  border: none;
  padding: 1rem 2rem;
  border-radius: 12px;
  font-weight: 600;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  opacity: ${props => props.disabled ? 0.5 : 1};
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(139, 92, 246, 0.3);
  }
`;

const CompletionCard = styled.div`
  background: ${props => props.theme === 'dark' 
    ? 'linear-gradient(135deg, #059669 0%, #10b981 100%)' 
    : 'linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)'};
  color: ${props => props.theme === 'dark' ? 'white' : '#065f46'};
  border-radius: 20px;
  padding: 3rem;
  text-align: center;
  margin: 2rem 0;
  box-shadow: 0 10px 25px rgba(16, 185, 129, 0.3);
`;

const BadgeDisplay = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin: 2rem 0;
  
  .badge-icon {
    font-size: 4rem;
    color: #fbbf24;
  }
`;

const ModulePage = () => {
  const { moduleId } = useParams();
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);
  const { user, updateUser } = useUser();
  
  const [currentStep, setCurrentStep] = useState(0);
  const [moduleCompleted, setModuleCompleted] = useState(false);
  const [interactiveAnswers, setInteractiveAnswers] = useState({});
  const [quizAnswers, setQuizAnswers] = useState({});
  const [showFeedback, setShowFeedback] = useState({});
  const [codeInputs, setCodeInputs] = useState({});
  const [codeOutputs, setCodeOutputs] = useState({});
  const [mascotExpression, setMascotExpression] = useState('happy');
  const [mascotMessage, setMascotMessage] = useState('');
  
  const module = modules.find(m => m.id === moduleId);
  const progress = module ? ((currentStep + 1) / module.content.length) * 100 : 0;
  const currentContent = module ? module.content[currentStep] : null;

  // Helper function to update mascot expression and message
  const updateMascot = (expression, message) => {
    setMascotExpression(expression);
    setMascotMessage(message);
  };

  // Helper function to execute code safely
  const executeCode = (code, stepIndex) => {
    try {
      // For HTML code, create a safe preview
      if (code.includes('<') && code.includes('>')) {
        // Create a temporary div to render HTML
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = code;
        setCodeOutputs(prev => ({ ...prev, [stepIndex]: tempDiv.innerHTML }));
      } else {
        // For other code types, show as formatted text
        setCodeOutputs(prev => ({ ...prev, [stepIndex]: `<pre>${code}</pre>` }));
      }
    } catch (error) {
      setCodeOutputs(prev => ({ ...prev, [stepIndex]: `<div style="color: #ef4444;">Error: ${error.message}</div>` }));
    }
  };

  // Helper function to handle quiz interactions
  const handleQuizAnswer = (stepIndex, selectedAnswer, correctAnswer, correctMessage, incorrectMessage) => {
    setQuizAnswers(prev => ({ ...prev, [stepIndex]: selectedAnswer }));
    setShowFeedback(prev => ({ ...prev, [stepIndex]: true }));
    
    if (selectedAnswer === correctAnswer) {
      updateMascot('excited', correctMessage);
    } else {
      updateMascot('thinking', incorrectMessage);
    }
  };

  // Helper function to reset quiz
  const resetQuiz = (stepIndex) => {
    setQuizAnswers(prev => ({ ...prev, [stepIndex]: null }));
    setShowFeedback(prev => ({ ...prev, [stepIndex]: false }));
    updateMascot('happy', 'Try again! You can do it! 🥋');
  };

  // Initialize mascot when page loads
  useEffect(() => {
    if (module) {
      updateMascot('happy', `Welcome to ${module.title}! Let's start learning! 🥋`);
    }
  }, [module?.title]);

  // Update mascot when step changes
  useEffect(() => {
    if (currentContent && currentContent.type === 'mascot') {
      updateMascot('happy', currentContent.value);
    }
  }, [currentStep, currentContent]);
  
  if (!module) {
    return (
      <PageContainer theme={theme}>
        <div style={{ textAlign: 'center', padding: '4rem' }}>
          <h1>Module not found!</h1>
          <button onClick={() => navigate('/dashboard')}>Back to Dashboard</button>
        </div>
      </PageContainer>
    );
  }
  
  const handleStepComplete = async () => {
    if (currentStep === module.content.length - 1) {
      // Complete module
      try {
        const result = await updateUserProgress({
          lessonId: module.id,
          completed: true,
          score: 100,
          timeSpent: 0,
          badge: module.badge
        });
        
        if (result.success) {
          updateUser(result.user);
          setModuleCompleted(true);
        }
      } catch (error) {
        console.error('Error completing module:', error);
      }
    } else {
      setCurrentStep(prev => prev + 1);
    }
  };
  
  const renderContent = (content) => {
    switch (content.type) {
      case 'mascot':
        return (
          <MascotBubble theme={theme}>
            <span className="mascot">🥋</span>
            {content.value}
          </MascotBubble>
        );
        
      case 'text':
        return (
          <div style={{ 
            fontSize: '1.1rem', 
            lineHeight: '1.7', 
            color: theme === 'dark' ? '#e2e8f0' : '#374151',
            margin: '1.5rem 0'
          }}>
            {content.value}
          </div>
        );
        
      case 'image':
        return (
          <div style={{ textAlign: 'center', margin: '1.5rem 0' }}>
            <img 
              src={content.value} 
              alt={content.alt || "Lesson visual"} 
              style={{ 
                maxWidth: '100%', 
                maxHeight: '300px', 
                borderRadius: '12px',
                boxShadow: theme === 'dark' ? '0 4px 12px rgba(0, 0, 0, 0.3)' : '0 4px 12px rgba(0, 0, 0, 0.1)'
              }} 
            />
          </div>
        );
        
      case 'code':
        return (
          <CodePlayground theme={theme}>
            <CodeHeader theme={theme}>
              <CodeHeaderLeft>
                <FaCode />
                Code Playground
              </CodeHeaderLeft>
              <PlayButton 
                theme={theme}
                onClick={() => {
                  const textarea = document.querySelector(`textarea[data-step="${currentStep}"]`);
                  if (textarea) {
                    executeCode(textarea.value, currentStep);
                    updateMascot('excited', 'Great! Check out your code output! 🎉');
                  }
                }}
              >
                <FaPlay />
                Run Code
              </PlayButton>
            </CodeHeader>
            <CodeTextarea 
              theme={theme}
              defaultValue={content.value}
              placeholder="Try modifying the code..."
              data-step={currentStep}
            />
            <CodeOutput 
              theme={theme}
              dangerouslySetInnerHTML={{ 
                __html: codeOutputs[currentStep] || '<div style="color: #6b7280;">Output will appear here...</div>' 
              }}
            />
          </CodePlayground>
        );
        
      case 'interactive':
        if (content.interaction === 'drag-drop') {
          return (
            <InteractiveCard theme={theme}>
              <h3 style={{ marginBottom: '1rem' }}>{content.prompt}</h3>
              <DragDropArea>
                {content.items.map((item, index) => (
                  <DraggableItem 
                    key={index} 
                    theme={theme}
                    draggable
                    onDragStart={(e) => e.dataTransfer.setData('text', item)}
                  >
                    {item}
                  </DraggableItem>
                ))}
              </DragDropArea>
              <DropZone 
                theme={theme}
                isCorrect={showFeedback[currentStep] && interactiveAnswers[currentStep] === content.answer}
                isIncorrect={showFeedback[currentStep] && interactiveAnswers[currentStep] !== content.answer}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  const dropped = e.dataTransfer.getData('text');
                  const isCorrect = dropped === content.answer;
                  setInteractiveAnswers(prev => ({ ...prev, [currentStep]: dropped }));
                  setShowFeedback(prev => ({ ...prev, [currentStep]: true }));
                  
                  if (isCorrect) {
                    updateMascot('excited', content.mascotCorrect);
                  } else {
                    updateMascot('thinking', content.mascotIncorrect);
                  }
                }}
              >
                {showFeedback[currentStep] 
                  ? (interactiveAnswers[currentStep] === content.answer ? '✅ Correct!' : '❌ Try again!') 
                  : 'Drop your answer here'}
              </DropZone>
              {showFeedback[currentStep] && (
                <MascotBubble theme={theme}>
                  <span className="mascot">🥋</span>
                  {interactiveAnswers[currentStep] === content.answer 
                    ? content.mascotCorrect 
                    : content.mascotIncorrect}
                </MascotBubble>
              )}
              {showFeedback[currentStep] && interactiveAnswers[currentStep] !== content.answer && (
                <TryAgainButton 
                  theme={theme}
                  onClick={() => {
                    setInteractiveAnswers(prev => ({ ...prev, [currentStep]: null }));
                    setShowFeedback(prev => ({ ...prev, [currentStep]: false }));
                    updateMascot('happy', 'Try again! You can do it! 🥋');
                  }}
                >
                  <FaTimes />
                  Try Again
                </TryAgainButton>
              )}
            </InteractiveCard>
          );
        }
        if (content.interaction === 'fill-blank') {
          return (
            <InteractiveCard theme={theme}>
              <h3 style={{ marginBottom: '1rem' }}>{content.prompt}</h3>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1rem' }}>
                <input 
                  type="text" 
                  placeholder="Type your answer..."
                  style={{
                    flex: 1,
                    padding: '0.75rem',
                    borderRadius: '8px',
                    border: '2px solid #e5e7eb',
                    fontSize: '1rem',
                    background: theme === 'dark' ? '#374151' : '#ffffff',
                    color: theme === 'dark' ? '#e2e8f0' : '#374151'
                  }}
                  onChange={(e) => {
                    const answer = e.target.value.trim().toLowerCase();
                    if (answer === content.answer.toLowerCase()) {
                      setInteractiveAnswers(prev => ({ ...prev, [currentStep]: answer }));
                      setShowFeedback(prev => ({ ...prev, [currentStep]: true }));
                      updateMascot('excited', content.mascotCorrect);
                    }
                  }}
                />
              </div>
              {showFeedback[currentStep] && (
                <MascotBubble theme={theme}>
                  <span className="mascot">🥋</span>
                  {content.mascotCorrect}
                </MascotBubble>
              )}
            </InteractiveCard>
          );
        }
        break;
        
      case 'quiz':
        return (
          <QuizCard theme={theme}>
            <h3 style={{ marginBottom: '1.5rem' }}>{content.question}</h3>
            {content.options.map((option, index) => (
              <QuizOption
                key={index}
                theme={theme}
                isSelected={quizAnswers[currentStep] === index}
                isCorrect={showFeedback[currentStep] && index === content.correct}
                onClick={() => {
                  handleQuizAnswer(
                    currentStep, 
                    index, 
                    content.correct, 
                    content.mascotCorrect, 
                    content.mascotIncorrect
                  );
                }}
                disabled={showFeedback[currentStep]}
              >
                {option}
              </QuizOption>
            ))}
            {showFeedback[currentStep] && (
              <MascotBubble theme={theme}>
                <span className="mascot">🥋</span>
                {quizAnswers[currentStep] === content.correct 
                  ? content.mascotCorrect 
                  : content.mascotIncorrect}
              </MascotBubble>
            )}
            {showFeedback[currentStep] && quizAnswers[currentStep] !== content.correct && (
              <TryAgainButton 
                theme={theme}
                onClick={() => resetQuiz(currentStep)}
              >
                <FaTimes />
                Try Again
              </TryAgainButton>
            )}
          </QuizCard>
        );
        
      case 'mini-project':
        return (
          <InteractiveCard theme={theme}>
            <h3 style={{ marginBottom: '1rem', color: theme === 'dark' ? '#e2e8f0' : '#374151' }}>
              🎯 Mini Project Challenge
            </h3>
            <div style={{ 
              fontSize: '1.1rem', 
              lineHeight: '1.7', 
              color: theme === 'dark' ? '#e2e8f0' : '#374151',
              marginBottom: '1.5rem'
            }}>
              {content.prompt}
            </div>
            
            {/* Code Playground for Mini Project */}
            <div style={{ marginBottom: '1.5rem' }}>
              <h4 style={{ 
                marginBottom: '0.5rem', 
                color: theme === 'dark' ? '#e2e8f0' : '#374151',
                fontSize: '1rem'
              }}>
                💻 Code Playground
              </h4>
              <div style={{
                background: theme === 'dark' ? '#1f2937' : '#ffffff',
                border: '2px solid #8b5cf6',
                borderRadius: '8px',
                overflow: 'hidden'
              }}>
                <textarea
                  value={codeInputs[currentStep] || ''}
                  onChange={(e) => setCodeInputs(prev => ({ ...prev, [currentStep]: e.target.value }))}
                  placeholder="Write your HTML code here...&#10;&#10;Example:&#10;&lt;h1&gt;My Web Page&lt;/h1&gt;&#10;&lt;p&gt;Welcome to my page!&lt;/p&gt;&#10;&lt;ul&gt;&#10;  &lt;li&gt;HTML&lt;/li&gt;&#10;  &lt;li&gt;CSS&lt;/li&gt;&#10;  &lt;li&gt;JavaScript&lt;/li&gt;&#10;&lt;/ul&gt;"
                  style={{
                    width: '100%',
                    minHeight: '200px',
                    padding: '1rem',
                    border: 'none',
                    outline: 'none',
                    resize: 'vertical',
                    fontFamily: 'monospace',
                    fontSize: '0.9rem',
                    lineHeight: '1.5',
                    background: theme === 'dark' ? '#1f2937' : '#ffffff',
                    color: theme === 'dark' ? '#e2e8f0' : '#374151'
                  }}
                />
                <div style={{
                  background: theme === 'dark' ? '#374151' : '#f8fafc',
                  padding: '0.75rem 1rem',
                  borderTop: '1px solid #8b5cf6',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <span style={{ 
                    fontSize: '0.9rem',
                    color: theme === 'dark' ? '#a1a1aa' : '#6b7280'
                  }}>
                    💡 Try writing your HTML code above!
                  </span>
                  <button
                    onClick={() => executeCode(codeInputs[currentStep] || '', currentStep)}
                    style={{
                      background: '#8b5cf6',
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      padding: '0.5rem 1rem',
                      fontSize: '0.9rem',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem'
                    }}
                    onMouseOver={(e) => e.target.style.background = '#7c3aed'}
                    onMouseOut={(e) => e.target.style.background = '#8b5cf6'}
                  >
                    ▶️ Run Code
                  </button>
                </div>
              </div>
              
              {/* Code Output */}
              {codeOutputs[currentStep] && (
                <div style={{ marginTop: '1rem' }}>
                  <h4 style={{ 
                    marginBottom: '0.5rem', 
                    color: theme === 'dark' ? '#e2e8f0' : '#374151',
                    fontSize: '1rem'
                  }}>
                    📄 Output
                  </h4>
                  <div style={{
                    background: theme === 'dark' ? '#1f2937' : '#ffffff',
                    border: '2px solid #10b981',
                    borderRadius: '8px',
                    padding: '1rem',
                    minHeight: '100px'
                  }}>
                    <div 
                      dangerouslySetInnerHTML={{ __html: codeOutputs[currentStep] }}
                      style={{
                        color: theme === 'dark' ? '#e2e8f0' : '#374151',
                        lineHeight: '1.6'
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
            
            <div style={{
              background: theme === 'dark' ? '#374151' : '#f8fafc',
              padding: '1rem',
              borderRadius: '8px',
              border: '2px dashed #8b5cf6'
            }}>
              <p style={{ 
                color: theme === 'dark' ? '#a1a1aa' : '#6b7280',
                fontStyle: 'italic',
                margin: 0
              }}>
                💡 Tip: Use the code playground above to try out your code!
              </p>
            </div>
          </InteractiveCard>
        );

      case 'reward':
        return (
          <CompletionCard theme={theme}>
            <BadgeDisplay>
              <FaMedal className="badge-icon" />
              <div>
                <h2>🎉 Congratulations!</h2>
                <p>You earned the "{content.badge}" badge!</p>
              </div>
            </BadgeDisplay>
          </CompletionCard>
        );
        
      default:
        return (
          <div style={{ 
            padding: '2rem', 
            textAlign: 'center',
            color: theme === 'dark' ? '#a1a1aa' : '#6b7280'
          }}>
            <p>Content type "{content.type}" is not yet supported.</p>
          </div>
        );
    }
  };
  
  if (moduleCompleted) {
    return (
      <PageContainer theme={theme}>
        <ModuleContainer theme={theme}>
          <CompletionCard theme={theme}>
            <BadgeDisplay>
              <FaTrophy className="badge-icon" />
              <div>
                <h1>🎉 Module Completed!</h1>
                <p>You've successfully completed "{module.title}"</p>
                <p>You earned the "{module.badge}" badge and 100 points!</p>
              </div>
            </BadgeDisplay>
            <NavButton 
              variant="primary" 
              theme={theme}
              onClick={() => navigate('/dashboard')}
            >
              <FaGraduationCap />
              Continue Learning
            </NavButton>
          </CompletionCard>
        </ModuleContainer>
        
        {/* Interactive SensaiMascot */}
        <SensaiMascot
          expression={mascotExpression}
          message={mascotMessage}
          isCelebrating={mascotExpression === 'excited'}
          isThinking={mascotExpression === 'thinking'}
          isShaking={false}
          onClick={() => {
            // Optional: Add click interaction
            updateMascot('happy', 'Keep up the great work! You\'re doing amazing! 🌟');
          }}
        />
      </PageContainer>
    );
  }
  
  return (
    <PageContainer theme={theme}>
      <ModuleContainer theme={theme}>
        <ModuleHeader theme={theme}>
          <BackButton onClick={() => navigate('/dashboard')}>
            <FaArrowLeft />
            Back to Dashboard
          </BackButton>
          
          <ModuleTitle>{module.title}</ModuleTitle>
          <ModuleDescription>{module.description}</ModuleDescription>
          
          <ModuleStats>
            <StatItem>
              <FaClock />
              {module.estimatedTime}
            </StatItem>
            <StatItem>
              <FaStar />
              {module.level}
            </StatItem>
            <StatItem>
              <FaMedal />
              {module.badge}
            </StatItem>
          </ModuleStats>
        </ModuleHeader>
        
        <ContentSection theme={theme}>
          <ProgressBar theme={theme}>
            <ProgressFill progress={progress} />
          </ProgressBar>
          
          <StepContainer 
            theme={theme} 
            isActive={true}
          >
            {renderContent(currentContent)}
          </StepContainer>
          
          <NavigationButtons>
            <NavButton
              theme={theme}
              onClick={() => setCurrentStep(prev => Math.max(0, prev - 1))}
              disabled={currentStep === 0}
            >
              <FaArrowLeft />
              Previous
            </NavButton>
            
            <NavButton
              variant="primary"
              theme={theme}
              onClick={handleStepComplete}
            >
              {currentStep === module.content.length - 1 ? (
                <>
                  <FaCheck />
                  Complete Module
                </>
              ) : (
                <>
                  Next
                  <FaPlay />
                </>
              )}
            </NavButton>
          </NavigationButtons>
        </ContentSection>
      </ModuleContainer>
      
      {/* Interactive SensaiMascot */}
      <SensaiMascot
        expression={mascotExpression}
        message={mascotMessage}
        isCelebrating={mascotExpression === 'excited'}
        isThinking={mascotExpression === 'thinking'}
        isShaking={false}
        onClick={() => {
          // Optional: Add click interaction
          updateMascot('happy', 'Keep up the great work! You\'re doing amazing! 🌟');
        }}
      />
    </PageContainer>
  );
};

export default ModulePage; 