import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../api';
import { useUser } from '../UserContext';

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
  background: #fff;
  border-radius: 20px;
  box-shadow: 0 2px 12px rgba(142, 68, 173, 0.08);
  padding: 2rem 2.5rem;
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

const Select = styled.select`
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

const RegisterLink = styled.div`
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

const ForgotPassword = styled(Link)`
  color: var(--primary-purple);
  font-size: 0.98rem;
  margin-bottom: 0.5em;
  text-align: right;
  text-decoration: underline;
  align-self: flex-end;
  &:hover {
    color: var(--secondary-purple);
  }
`;

const ErrorMsg = styled.div`
  position: fixed;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  color: #d32f2f;
  background: #ffeaea;
  border: 3px solid #f44336;
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

const SuccessMsg = styled.div`
  position: fixed;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  color: #2e7d32;
  background: #e8f5e8;
  border: 3px solid #4caf50;
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

const LoginPage = () => {
  const [form, setForm] = useState({ identifier: '', password: '', role: 'student' });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useUser();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!form.identifier || !form.password) {
      setError('Oopsie! Please fill in your username/email and password! 🔐');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const result = await loginUser(form);
      if (result.success) {
        login(result.user);
        setSuccess(true);
        setTimeout(() => {
          navigate('/onboarding');
        }, 1500);
      } else {
        setError(result.error || 'Oops! That username or password is not quite right. Try again! 🔍');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Oh no! Something went wrong. Let us try again! 🔧');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Wrapper>
      <Title>Welcome Back, Little Coder! 🎉</Title>
      <MascotTip>🌟 Ready to continue your amazing coding adventure?</MascotTip>
      <Form onSubmit={handleSubmit}>
        <Label htmlFor="identifier">Username or Email</Label>
        <Input
          id="identifier"
          name="identifier"
          type="text"
          value={form.identifier}
          onChange={handleChange}
          placeholder="Enter your username or email"
          required
        />

        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Enter your secret password"
          required
        />
        <ForgotPassword to="/forgot-password">Forgot your password? 🔑</ForgotPassword>

        <Label htmlFor="role">I am a...</Label>
        <Select id="role" name="role" value={form.role} onChange={handleChange}>
          <option value="student">Student 👧👦</option>
          <option value="teacher">Teacher 👩‍🏫👨‍🏫</option>
          <option value="parent">Parent 👩👨</option>
        </Select>

        <SubmitButton type="submit" disabled={loading}>
          {loading ? 'Logging you in... ✨' : 'Let us Start Coding! 🚀'}
        </SubmitButton>
      </Form>
      <RegisterLink>
        Do not have an account yet? <Link to="/register">Join our coding family! 🏠</Link>
      </RegisterLink>
      {error && <ErrorMsg>{error}</ErrorMsg>}
      {success && <SuccessMsg>Yay! Welcome back! Taking you to set up your profile... 🎉✨</SuccessMsg>}
    </Wrapper>
  );
};

export default LoginPage; 