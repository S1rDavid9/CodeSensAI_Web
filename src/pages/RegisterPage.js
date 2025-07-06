import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate, Link } from 'react-router-dom';
import { registerUser } from '../api';

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

const LoginLink = styled.div`
  color: var(--primary-purple);
  font-size: 1rem;
  margin-top: 1em;
  text-align: center;
`;

const RegisterPage = () => {
  const [form, setForm] = useState({ username: '', email: '', password: '', confirmPassword: '', role: 'student' });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!form.username || !form.email || !form.password || !form.confirmPassword) {
      setError('Oopsie! Please fill in all the fields to join our coding family! 🌟');
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError('Oh no! Your passwords do not match. Let us try again! 🔐');
      return;
    }

    if (form.password.length < 6) {
      setError('Your password needs to be at least 6 characters long to keep you safe! 🛡️');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const result = await registerUser(form);
      if (result.success) {
        setSuccess(true);
        setTimeout(() => {
          navigate('/login');
        }, 1500);
      } else {
        setError(result.error || 'Oops! Something went wrong. Let us try again! 🔧');
      }
    } catch (err) {
      console.error('Registration error:', err);
      setError('Oh no! Something went wrong. Let us try again! 🔧');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Wrapper>
      <Title>Join Our Amazing Coding Family! 🎉</Title>
      <MascotTip>🌟 Ready to start your incredible coding adventure? Let us create your account!</MascotTip>
      <Form onSubmit={handleSubmit}>
        <Label htmlFor="username">Choose Your Username</Label>
        <Input
          id="username"
          name="username"
          type="text"
          value={form.username}
          onChange={handleChange}
          placeholder="Pick a cool username"
          required
        />

        <Label htmlFor="email">Your Email Address</Label>
        <Input
          id="email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Enter your email address"
          required
        />

        <Label htmlFor="password">Create a Secret Password</Label>
        <Input
          id="password"
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Make it super secure!"
          required
        />

        <Label htmlFor="confirmPassword">Confirm Your Password</Label>
        <Input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          value={form.confirmPassword}
          onChange={handleChange}
          placeholder="Type it again to be sure"
          required
        />

        <Label htmlFor="role">I am a...</Label>
        <Select id="role" name="role" value={form.role} onChange={handleChange}>
          <option value="student">Student 👧👦</option>
          <option value="teacher">Teacher 👩‍🏫👨‍🏫</option>
          <option value="parent">Parent 👩👨</option>
        </Select>

        <SubmitButton type="submit" disabled={loading}>
          {loading ? 'Creating your account... ✨' : 'Join the Adventure! 🚀'}
        </SubmitButton>
      </Form>
      <LoginLink>
        Already have an account? <Link to="/login">Welcome back! 🏠</Link>
      </LoginLink>
      {error && <ErrorMsg>{error}</ErrorMsg>}
      {success && <SuccessMsg>Yay! Your account is ready! Taking you to login... 🎉✨</SuccessMsg>}
    </Wrapper>
  );
};

export default RegisterPage; 