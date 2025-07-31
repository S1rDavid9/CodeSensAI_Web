import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate, Link } from 'react-router-dom';
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

const StudentLoginPage = () => {
  const [form, setForm] = useState({ identifier: '', password: '' });
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
      setError('Please enter your username/email and password!');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const result = await loginUser(form);
      if (result.success) {
        login(result.user);
        navigate('/dashboard');
      } else {
        setError(result.error || 'Login failed.');
      }
    } catch (err) {
      setError('Login failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Wrapper>
      <Title>Student Login</Title>
      <Form onSubmit={handleSubmit}>
        <Label htmlFor="identifier">Username or Email</Label>
        <Input id="identifier" name="identifier" type="text" value={form.identifier} onChange={handleChange} placeholder="Enter your username or email" required />
        <Label htmlFor="password">Password</Label>
        <Input id="password" name="password" type="password" value={form.password} onChange={handleChange} placeholder="Enter your password" required />
        <SubmitButton type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </SubmitButton>
      </Form>
      <div style={{color:'var(--primary-purple)', fontSize:'1rem', marginTop:'1em', textAlign:'center'}}>
        Don’t have an account? <Link to="/student-register">Register here!</Link>
      </div>
      {error && <ErrorMsg>{error}</ErrorMsg>}
    </Wrapper>
  );
};

export default StudentLoginPage; 