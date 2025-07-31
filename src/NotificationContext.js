import React, { createContext, useContext, useState } from 'react';
import styled from 'styled-components';

const NotificationContext = createContext();

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};

const NotificationContainer = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const NotificationItem = styled.div`
  background: ${props => {
    switch (props.type) {
      case 'success': return 'var(--success)';
      case 'error': return 'var(--error)';
      case 'warning': return 'var(--warning)';
      case 'info': return 'var(--info)';
      default: return 'var(--primary-purple)';
    }
  }};
  color: white;
  padding: 1rem 1.5rem;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-lg);
  min-width: 300px;
  max-width: 400px;
  animation: slideIn 0.3s ease-out;
  display: flex;
  align-items: center;
  gap: 0.8rem;
  
  @keyframes slideIn {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  &.removing {
    animation: slideOut 0.3s ease-in;
  }
  
  @keyframes slideOut {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(100%);
      opacity: 0;
    }
  }
`;

const NotificationIcon = styled.div`
  font-size: 1.5rem;
`;

const NotificationContent = styled.div`
  flex: 1;
`;

const NotificationTitle = styled.div`
  font-weight: 600;
  margin-bottom: 0.2rem;
`;

const NotificationMessage = styled.div`
  font-size: 0.9rem;
  opacity: 0.9;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 1.2rem;
  cursor: pointer;
  padding: 0;
  opacity: 0.7;
  transition: opacity 0.2s;
  
  &:hover {
    opacity: 1;
  }
`;

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  const addNotification = (notification) => {
    const id = Date.now() + Math.random();
    const newNotification = {
      id,
      type: 'success',
      title: 'Success!',
      message: 'Operation completed successfully.',
      duration: 5000,
      ...notification
    };

    setNotifications(prev => [...prev, newNotification]);

    // Auto-remove notification after duration
    if (newNotification.duration > 0) {
      setTimeout(() => {
        removeNotification(id);
      }, newNotification.duration);
    }

    return id;
  };

  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  const showModuleCompletion = (moduleName, points) => {
    addNotification({
      type: 'success',
      title: '🎉 Module Completed!',
      message: `Congratulations! You've completed "${moduleName}" and earned ${points} points!`,
      duration: 6000,
      icon: '🏆'
    });
  };

  const showQuizCompletion = (score, totalQuestions) => {
    const percentage = Math.round((score / totalQuestions) * 100);
    let message = `You scored ${score}/${totalQuestions} (${percentage}%)`;
    
    if (percentage >= 90) {
      message += ' - Excellent work! 🌟';
    } else if (percentage >= 70) {
      message += ' - Great job! 🚀';
    } else {
      message += ' - Keep practicing! 💪';
    }

    addNotification({
      type: 'success',
      title: '📝 Quiz Completed!',
      message,
      duration: 5000,
      icon: '📊'
    });
  };

  const showProgressUpdate = (points, level) => {
    addNotification({
      type: 'info',
      title: '📈 Progress Update!',
      message: `You've earned ${points} points and reached level ${level}!`,
      duration: 4000,
      icon: '⭐'
    });
  };

  const value = {
    addNotification,
    removeNotification,
    showModuleCompletion,
    showQuizCompletion,
    showProgressUpdate
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
      <NotificationContainer>
        {notifications.map(notification => (
          <NotificationItem
            key={notification.id}
            type={notification.type}
            className={notification.removing ? 'removing' : ''}
          >
            <NotificationIcon>
              {notification.icon || 
                (notification.type === 'success' ? '✅' :
                 notification.type === 'error' ? '❌' :
                 notification.type === 'warning' ? '⚠️' : 'ℹ️')}
            </NotificationIcon>
            <NotificationContent>
              <NotificationTitle>{notification.title}</NotificationTitle>
              <NotificationMessage>{notification.message}</NotificationMessage>
            </NotificationContent>
            <CloseButton onClick={() => removeNotification(notification.id)}>
              ×
            </CloseButton>
          </NotificationItem>
        ))}
      </NotificationContainer>
    </NotificationContext.Provider>
  );
}; 