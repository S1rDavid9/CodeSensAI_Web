import React, { useState, useEffect } from 'react';
import styled, { keyframes, css } from 'styled-components';

// Animations
const float = keyframes`
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  25% { transform: translateY(-10px) rotate(2deg); }
  50% { transform: translateY(-5px) rotate(0deg); }
  75% { transform: translateY(-15px) rotate(-2deg); }
`;

const bounce = keyframes`
  0%, 20%, 50%, 80%, 100% { transform: translateY(0) scale(1); }
  40% { transform: translateY(-20px) scale(1.1); }
  60% { transform: translateY(-10px) scale(1.05); }
`;

const wiggle = keyframes`
  0%, 100% { transform: rotate(0deg); }
  25% { transform: rotate(5deg); }
  75% { transform: rotate(-5deg); }
`;

const sparkle = keyframes`
  0%, 100% { opacity: 0; transform: scale(0) rotate(0deg); }
  50% { opacity: 1; transform: scale(1) rotate(180deg); }
`;

const speechBubble = keyframes`
  0% { opacity: 0; transform: scale(0.8) translateY(10px); }
  100% { opacity: 1; transform: scale(1) translateY(0); }
`;

const blink = keyframes`
  0%, 90%, 100% { transform: scaleY(1); }
  95% { transform: scaleY(0.1); }
`;

const shake = keyframes`
  0% { transform: translateX(0); }
  20% { transform: translateX(-10px); }
  40% { transform: translateX(10px); }
  60% { transform: translateX(-10px); }
  80% { transform: translateX(10px); }
  100% { transform: translateX(0); }
`;

// Styled Components
const MascotContainer = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: scale(1.1);
  }
`;

const MascotBody = styled.div`
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #8e44ad, #a569bd);
  border-radius: 50%;
  position: relative;
  animation: ${float} 3s ease-in-out infinite;
  box-shadow: 0 8px 25px rgba(142, 68, 173, 0.3);
  border: 3px solid #fff;
  
  ${props => props.isCelebrating && css`
    animation: ${bounce} 0.6s ease-in-out;
  `}
  
  ${props => props.isThinking && css`
    animation: ${wiggle} 1s ease-in-out infinite;
  `}

  ${props => props.isShaking && css`
    animation: ${shake} 0.5s cubic-bezier(.36,.07,.19,.97) both;
  `}
`;

const MascotFace = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 60px;
  height: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Eyes = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 5px;
`;

const Eye = styled.div`
  width: 8px;
  height: 8px;
  background: #fff;
  border-radius: 50%;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    top: 1px;
    left: 1px;
    width: 4px;
    height: 4px;
    background: #333;
    border-radius: 50%;
    animation: ${props => props.isBlinking ? 'none' : css`${blink} 3s infinite`};
  }
`;

const Mouth = styled.div`
  width: 20px;
  height: ${props => {
    if (props.expression === 'happy') return '12px';
    if (props.expression === 'thinking') return '6px';
    if (props.expression === 'surprised') return '15px';
    return '8px';
  }};
  border: 2px solid #fff;
  border-top: none;
  border-radius: 0 0 20px 20px;
  background: ${props => props.expression === 'happy' ? '#fff' : 'transparent'};
  transition: all 0.3s ease;
`;

const Glasses = styled.div`
  position: absolute;
  top: -5px;
  left: -5px;
  width: 70px;
  height: 70px;
  border: 3px solid #fff;
  border-radius: 50%;
  opacity: 0.8;
  
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 50px;
    height: 50px;
    border: 2px solid #fff;
    border-radius: 50%;
  }
`;

const CodeParticles = styled.div`
  position: absolute;
  top: -20px;
  left: -20px;
  width: 120px;
  height: 120px;
  pointer-events: none;
`;

const Particle = styled.div`
  position: absolute;
  font-size: 12px;
  color: #fff;
  opacity: 0;
  animation: ${sparkle} 2s ease-in-out infinite;
  animation-delay: ${props => props.delay}s;
  
  &:nth-child(1) { top: 10px; left: 20px; }
  &:nth-child(2) { top: 30px; right: 15px; }
  &:nth-child(3) { bottom: 25px; left: 10px; }
  &:nth-child(4) { bottom: 15px; right: 25px; }
  &:nth-child(5) { top: 50%; left: 5px; }
  &:nth-child(6) { top: 50%; right: 5px; }
`;

const SpeechBubble = styled.div`
  position: absolute;
  bottom: 100px;
  right: 0;
  background: #fff;
  border: 2px solid var(--primary-purple);
  border-radius: 15px;
  padding: 10px 15px;
  max-width: 200px;
  font-size: 14px;
  color: var(--primary-purple);
  font-weight: 600;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  animation: ${speechBubble} 0.3s ease-out;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -8px;
    right: 20px;
    width: 0;
    height: 0;
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    border-top: 8px solid #fff;
  }
  
  &::before {
    content: '';
    position: absolute;
    bottom: -10px;
    right: 20px;
    width: 0;
    height: 0;
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    border-top: 8px solid var(--primary-purple);
  }
`;

const SensaiMascot = ({ 
  expression = 'happy', 
  message = '', 
  isCelebrating = false, 
  isThinking = false,
  isShaking = false,
  onClick 
}) => {
  const [isBlinking, setIsBlinking] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  // Blinking animation
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 150);
    }, 3000);

    return () => clearInterval(blinkInterval);
  }, []);

  // Show message when provided
  useEffect(() => {
    if (message) {
      setShowMessage(true);
      const timer = setTimeout(() => setShowMessage(false), 8000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  const defaultMessages = {
    happy: "Hello, young coder! Ready to learn? 🌟",
    thinking: "Hmm, let me think about that... 🤔",
    surprised: "Wow! That is amazing! 🎉",
    excited: "You are doing fantastic! Keep going! 🚀"
  };

  const displayMessage = message || defaultMessages[expression] || defaultMessages.happy;

  return (
    <MascotContainer onClick={handleClick}>
      <MascotBody 
        isCelebrating={isCelebrating} 
        isThinking={isThinking}
        isShaking={isShaking}
      >
        <Glasses />
        <MascotFace>
          <Eyes>
            <Eye isBlinking={isBlinking} />
            <Eye isBlinking={isBlinking} />
          </Eyes>
          <Mouth expression={expression} />
        </MascotFace>
        
        <CodeParticles>
          <Particle delay={0}>{"<>"}</Particle>
          <Particle delay={0.5}>{"{}"}</Particle>
          <Particle delay={1}>{"()"}</Particle>
          <Particle delay={1.5}>{"[]"}</Particle>
          <Particle delay={2}>{"//"}</Particle>
          <Particle delay={2.5}>{"&&"}</Particle>
        </CodeParticles>
      </MascotBody>
      
      {showMessage && (
        <SpeechBubble>
          {displayMessage}
        </SpeechBubble>
      )}
    </MascotContainer>
  );
};

export default SensaiMascot; 