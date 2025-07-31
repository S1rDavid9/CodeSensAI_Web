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
  background: #f7f7fa;
  padding: 2rem 1rem;
  position: relative;
`;

const Title = styled.h2`
  color: #4B2995;
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
  color: #4B2995;
  font-weight: 600;
  margin-bottom: 0.3em;
`;

const Input = styled.input`
  padding: 0.7em 1em;
  border-radius: 12px;
  border: 1px solid #bbb;
  font-size: 1rem;
  outline: none;
  margin-bottom: 0.5em;
`;

const SubmitButton = styled.button`
  background: #4B2995;
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
    background: #6d28d9;
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
`;

const LoginLink = styled.div`
  color: #4B2995;
  font-size: 1rem;
  margin-top: 1em;
  text-align: center;
`;

const ParentRegisterPage = () => {
  const [form, setForm] = useState({ username: '', email: '', password: '', confirmPassword: '' });
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
      setError('Please fill in all fields.');
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (form.password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const result = await registerUser({ ...form, role: 'parent' });
      if (result.success) {
        setSuccess(true);
        setTimeout(() => {
          navigate('/parent-login');
        }, 1500);
      } else {
        setError(result.error || 'Registration failed.');
      }
    } catch (err) {
      setError('Registration failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Wrapper>
      <Title>Parent Registration</Title>
      <Form onSubmit={handleSubmit}>
        <Label htmlFor="username">Username</Label>
        <Input id="username" name="username" type="text" value={form.username} onChange={handleChange} placeholder="Enter username" required />
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" value={form.email} onChange={handleChange} placeholder="Enter email" required />
        <Label htmlFor="password">Password</Label>
        <Input id="password" name="password" type="password" value={form.password} onChange={handleChange} placeholder="Enter password" required />
        <Label htmlFor="confirmPassword">Confirm Password</Label>
        <Input id="confirmPassword" name="confirmPassword" type="password" value={form.confirmPassword} onChange={handleChange} placeholder="Confirm password" required />
        <SubmitButton type="submit" disabled={loading}>
          {loading ? 'Registering...' : 'Register'}
        </SubmitButton>
      </Form>
      <LoginLink>
        Already have an account? <Link to="/parent-login">Login here!</Link>
      </LoginLink>
      {error && <ErrorMsg>{error}</ErrorMsg>}
      {success && <SuccessMsg>Registration successful! Redirecting to login...</SuccessMsg>}
    </Wrapper>
  );
};

export default ParentRegisterPage; 