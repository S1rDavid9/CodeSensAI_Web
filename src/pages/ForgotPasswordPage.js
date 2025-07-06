import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  min-width: 300px;
`;

const Label = styled.label`
  color: var(--primary-purple);
  font-weight: 600;
  margin-bottom: 0.3em;
`;

const Input = styled.input`
  padding: 0.7em 1em;
  border-radius: 12px;
  border: 1px solid var(--accent);
  font-size: 1rem;
  outline: none;
  margin-bottom: 0.5em;
`;

const SubmitButton = styled.button`
  background: var(--primary-purple);
  color: #fff;
  border: none;
  border-radius: 20px;
  padding: 0.8em 1.5em;
  font-size: 1.1rem;
  font-weight: 600;
  margin-top: 1em;
  cursor: pointer;
  transition: background 0.2s;
  &:hover {
    background: var(--secondary-purple);
  }
`;

const MascotTip = styled.div`
  color: var(--secondary-purple);
  font-size: 1rem;
  margin-bottom: 1.5em;
  text-align: center;
`;

const BackToLogin = styled.div`
  margin-top: 1.2em;
  text-align: center;
  font-size: 1rem;
  color: var(--primary-purple);
  a {
    color: var(--secondary-purple);
    text-decoration: underline;
    font-weight: 600;
  }
`;

const Message = styled.div`
  position: fixed;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  background: ${props => (props.success ? '#e8f5e8' : '#ffeaea')};
  color: ${props => (props.success ? '#2e7d32' : '#d32f2f')};
  border: 3px solid ${props => (props.success ? '#4caf50' : '#f44336')};
  border-radius: 20px;
  padding: 1rem 2rem;
  font-size: 1.1rem;
  font-weight: 700;
  text-align: center;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  animation: slideUp 0.5s ease-out;
  
  @keyframes slideUp {
    0% {
      transform: translateX(-50%) translateY(100%);
      opacity: 0;
    }
    100% {
      transform: translateX(-50%) translateY(0);
      opacity: 1;
    }
  }
`;

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      setMessage('Oopsie! Please enter your email address! 📧');
      setSuccess(false);
      return;
    }

    setLoading(true);
    
    // Simulate password reset request
    setTimeout(() => {
      setMessage('Yay! We sent you a magic link to reset your password! Check your email! ✨📬');
      setSuccess(true);
      setLoading(false);
    }, 2000);
  };

  return (
    <Wrapper>
      <Title>Forgot Your Password? 🔑</Title>
      <MascotTip>🌟 Do not worry! We will help you get back to coding!</MascotTip>
      <Form onSubmit={handleSubmit}>
        <Label htmlFor="email">Your Email Address</Label>
        <Input
          id="email"
          name="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email address"
          required
        />

        <SubmitButton type="submit" disabled={loading}>
          {loading ? 'Sending magic link... ✨' : 'Send Reset Link! 🚀'}
        </SubmitButton>
      </Form>
      <BackToLogin>
        Remember your password? <Link to="/login">Back to login! 🔙</Link>
      </BackToLogin>
      {message && <Message success={success}>{message}</Message>}
    </Wrapper>
  );
};

export default ForgotPasswordPage; 