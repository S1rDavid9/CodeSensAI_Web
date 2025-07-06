import { useState, useEffect } from 'react';

export const useMascot = () => {
  const [mascotState, setMascotState] = useState({
    expression: 'happy',
    message: '',
    isCelebrating: false,
    isThinking: false
  });

  const celebrate = (message = '') => {
    setMascotState({
      expression: 'surprised',
      message: message || '🎉 Amazing work! You are incredible! 🎉',
      isCelebrating: true,
      isThinking: false
    });
  };

  const think = (message = '') => {
    setMascotState({
      expression: 'thinking',
      message: message || '🤔 Let me think about that...',
      isCelebrating: false,
      isThinking: true
    });
  };

  const encourage = (message = '') => {
    setMascotState({
      expression: 'happy',
      message: message || '🌟 You are doing fantastic! Keep going! 🌟',
      isCelebrating: false,
      isThinking: false
    });
  };

  const congratulate = (message = '') => {
    setMascotState({
      expression: 'excited',
      message: message || '🏆 Congratulations! You are a coding champion! 🏆',
      isCelebrating: true,
      isThinking: false
    });
  };

  const comfort = (message = '') => {
    setMascotState({
      expression: 'happy',
      message: message || '💪 Do not worry! Every mistake is a step toward success! 💪',
      isCelebrating: false,
      isThinking: false
    });
  };

  const welcome = (message = '') => {
    setMascotState({
      expression: 'happy',
      message: message || '👋 Welcome! Ready to start your coding adventure? 👋',
      isCelebrating: false,
      isThinking: false
    });
  };

  const randomEncouragement = () => {
    const messages = [
      "You are doing amazing! Keep coding! 🌟",
      "Every bug is just a learning opportunity! 🐛✨",
      "You are becoming a coding superstar! ⭐",
      "Remember, even the best coders started as beginners! 💪",
      "Your persistence is inspiring! Keep going! 🚀",
      "You have got this! Coding is fun! 🎉",
      "You are making incredible progress! 🌈",
      "Your code is getting better every day! 📈",
      "You are solving problems like a pro! 🔧",
      "Keep that curiosity alive! It is your superpower! 🦸‍♀️"
    ];
    
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    
    setMascotState(prev => ({
      ...prev,
      message: randomMessage,
      isCelebrating: true
    }));
  };

  // Auto-reset celebration and thinking states
  useEffect(() => {
    if (mascotState.isCelebrating) {
      const timer = setTimeout(() => {
        setMascotState(prev => ({
          ...prev,
          isCelebrating: false
        }));
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [mascotState.isCelebrating]);

  useEffect(() => {
    if (mascotState.isThinking) {
      const timer = setTimeout(() => {
        setMascotState(prev => ({
          ...prev,
          isThinking: false
        }));
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [mascotState.isThinking]);

  return {
    mascotState,
    setMascotState,
    celebrate,
    think,
    encourage,
    congratulate,
    comfort,
    welcome,
    randomEncouragement
  };
}; 