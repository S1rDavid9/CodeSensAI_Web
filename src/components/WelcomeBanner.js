import React, { useEffect, useState } from "react";
import styled from "styled-components";

const BannerContainer = styled.div`
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  background: var(--accent);
  color: #fff;
  padding: 1rem 2rem;
  border-radius: 2rem;
  box-shadow: 0 4px 16px rgba(0,0,0,0.15);
  z-index: 1000;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  animation: popIn 0.5s;
  
  @keyframes popIn {
    from { 
      opacity: 0; 
      transform: translateX(-50%) translateY(-30px) scale(0.9);
    }
    to { 
      opacity: 1; 
      transform: translateX(-50%) translateY(0) scale(1);
    }
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: #fff;
  margin-left: 1rem;
  font-size: 1.2rem;
  cursor: pointer;
  padding: 0.2rem;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s;
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
`;

const messages = [
  "Welcome, future coder! 👩‍💻✨",
  "Ready to learn and have fun? 🎉🚀",
  "Sensai is here to guide you! 🥋💫",
  "Let us start coding together! 💻🌈",
  "You are going to be amazing! 🌟💪"
];

export default function WelcomeBanner({ show, onClose }) {
  const [visible, setVisible] = useState(show);
  const [currentMessage, setCurrentMessage] = useState("");

  useEffect(() => {
    if (show) {
      setVisible(true);
      setCurrentMessage(messages[Math.floor(Math.random() * messages.length)]);
      
      const timer = setTimeout(() => {
        setVisible(false);
        onClose && onClose();
      }, 4000);
      
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  if (!visible) return null;

  return (
    <BannerContainer>
      <span>{currentMessage}</span>
      <CloseButton 
        onClick={() => { 
          setVisible(false); 
          onClose && onClose(); 
        }}
      >
        ✖
      </CloseButton>
    </BannerContainer>
  );
} 