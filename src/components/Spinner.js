import React, { useState } from "react";
import styled from "styled-components";

const SpinnerOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  backdrop-filter: blur(2px);
`;

const SpinnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

const SpinnerElement = styled.div`
  border: 6px solid rgba(255, 255, 255, 0.3);
  border-top: 6px solid var(--accent);
  border-radius: 50%;
  width: 48px;
  height: 48px;
  animation: spin 1s linear infinite;
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const LoadingText = styled.div`
  color: #fff;
  font-size: 1.1rem;
  font-weight: 600;
  text-align: center;
`;

const messages = [
  "Loading awesome content... 🚀",
  "Preparing your coding adventure... 💻",
  "Getting everything ready... ⚡",
  "Almost there... 🎯",
  "Loading magic... ✨"
];

export default function Spinner({ message }) {
  const [currentMessage] = useState(
    message || messages[Math.floor(Math.random() * messages.length)]
  );

  return (
    <SpinnerOverlay>
      <SpinnerContainer>
        <SpinnerElement />
        <LoadingText>{currentMessage}</LoadingText>
      </SpinnerContainer>
    </SpinnerOverlay>
  );
} 