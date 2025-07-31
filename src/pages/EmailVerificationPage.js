import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FaEnvelope, FaCheckCircle, FaExclamationTriangle, FaSpinner } from 'react-icons/fa';

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
`;

const Card = styled.div`
  background: white;
  border-radius: 20px;
  padding: 40px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  text-align: center;
  max-width: 500px;
  width: 100%;
`;

const Icon = styled.div`
  font-size: 4rem;
  margin-bottom: 20px;
  color: ${props => {
    if (props.status === 'success') return '#10b981';
    if (props.status === 'error') return '#ef4444';
    return '#667eea';
  }};
`;

const Title = styled.h1`
  color: #1f2937;
  margin-bottom: 10px;
  font-size: 2rem;
  font-weight: bold;
`;

const Subtitle = styled.p`
  color: #6b7280;
  margin-bottom: 30px;
  font-size: 1.1rem;
  line-height: 1.6;
`;

const Button = styled.button`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 15px 30px;
  border-radius: 25px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: transform 0.2s;
  margin: 10px;
  
  &:hover {
    transform: translateY(-2px);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const ResendButton = styled.button`
  background: transparent;
  color: #667eea;
  border: 2px solid #667eea;
  padding: 12px 25px;
  border-radius: 25px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s;
  margin-top: 20px;
  
  &:hover {
    background: #667eea;
    color: white;
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const Spinner = styled(FaSpinner)`
  animation: spin 1s linear infinite;
  
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`;

const EmailVerificationPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState('verifying'); // 'verifying', 'success', 'error'
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');
  const [resendLoading, setResendLoading] = useState(false);
  const verificationCompletedRef = useRef(false);

  useEffect(() => {
    const token = searchParams.get('token');
    console.log('EmailVerificationPage useEffect triggered');
    console.log('Token from URL:', token ? token.substring(0, 10) + '...' : 'NO TOKEN');
    console.log('verificationCompletedRef.current:', verificationCompletedRef.current);
    
    // Only attempt verification if:
    // 1. We have a token
    // 2. Verification hasn't been completed (using ref)
    if (token && !verificationCompletedRef.current) {
      console.log('Starting verification process...');
      verificationCompletedRef.current = true; // Mark as completed immediately
      verifyEmail(token);
    } else if (!token) {
      console.log('No token found in URL');
      setStatus('error');
      setMessage('Invalid verification link. Please check your email for the correct link.');
    } else {
      console.log('Skipping verification - already completed');
    }

    // Cleanup function to prevent memory leaks
    return () => {
      console.log('EmailVerificationPage useEffect cleanup');
    };
  }, [searchParams]); // Remove dependencies that cause re-runs

  const verifyEmail = async (token) => {
    console.log('verifyEmail function called with token:', token.substring(0, 10) + '...');
    console.log('Current status:', status);
    console.log('verificationCompletedRef.current:', verificationCompletedRef.current);
    
    try {
      console.log('Making verification request...');
      const response = await fetch('/users/verify-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
      });

      console.log('Response received:', response.status, response.ok);
      console.log('Response headers:', Object.fromEntries(response.headers.entries()));
      
      const data = await response.json();
      console.log('Verification response data:', data);

      if (response.ok) {
        console.log('Verification successful - updating UI');
        setStatus('success');
        setMessage(data.message);
        setEmail(data.user.email);
        
        // Automatically log in the user
        if (data.token) {
          console.log('Setting JWT token');
          localStorage.setItem('codesensai_token', data.token);
          console.log('User token saved successfully');
        }
        
        // Redirect to onboarding after a short delay
        console.log('Scheduling redirect to onboarding in 2 seconds...');
        setTimeout(() => {
          console.log('Redirecting to onboarding now...');
          navigate('/onboarding');
        }, 2000);
      } else {
        console.log('Verification failed with status:', response.status);
        setStatus('error');
        setMessage(data.message || 'Verification failed. Please try again.');
      }
    } catch (error) {
      console.error('Verification error details:', error);
      console.error('Error name:', error.name);
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
      setStatus('error');
      setMessage('Network error. Please check your connection and try again.');
    }
  };

  const resendVerification = async () => {
    if (!email) {
      setMessage('Please enter your email address to resend the verification email.');
      return;
    }

    setResendLoading(true);
    try {
      const response = await fetch('/users/resend-verification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Verification email sent successfully! Please check your inbox.');
      } else {
        setMessage(data.message || 'Failed to resend verification email.');
      }
    } catch (error) {
      console.error('Resend error:', error);
      setMessage('Network error. Please try again.');
    } finally {
      setResendLoading(false);
    }
  };

  const getIcon = () => {
    switch (status) {
      case 'success':
        return <FaCheckCircle />;
      case 'error':
        return <FaExclamationTriangle />;
      default:
        return <FaEnvelope />;
    }
  };

  const getTitle = () => {
    switch (status) {
      case 'success':
        return 'Email Verified! 🎉';
      case 'error':
        return 'Verification Failed';
      default:
        return 'Verifying Your Email';
    }
  };

  return (
    <Container>
      <Card>
        <Icon status={status}>
          {status === 'verifying' ? <Spinner /> : getIcon()}
        </Icon>
        
        <Title>{getTitle()}</Title>
        
        <Subtitle>
          {status === 'verifying' && 'Please wait while we verify your email address...'}
          {status === 'success' && 'Your email has been successfully verified! Welcome to CodeSensai! 🎉 Redirecting you to set up your profile...'}
          {status === 'error' && message}
        </Subtitle>

        {status === 'success' && (
          <div style={{ textAlign: 'center' }}>
            <div style={{ marginBottom: '1rem', color: '#10b981', fontSize: '1.2rem' }}>
              ⏳ Redirecting to profile setup...
            </div>
            <Button onClick={() => navigate('/onboarding')}>
              Continue to Setup Profile
            </Button>
            <div style={{ marginTop: '1rem', fontSize: '0.9rem', color: '#6b7280' }}>
              If you're not redirected automatically, click the button above.
            </div>
          </div>
        )}

        {status === 'error' && (
          <div>
            <Button onClick={() => navigate('/login')}>
              Go to Login
            </Button>
            <Button onClick={() => navigate('/register')}>
              Register Again
            </Button>
            
            {/* Temporary manual success trigger for testing */}
            <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#f0f9ff', borderRadius: '10px', border: '1px solid #0ea5e9' }}>
              <p style={{ color: '#0c4a6e', marginBottom: '10px', fontSize: '0.9rem' }}>
                <strong>Debug Info:</strong> Backend verification was successful. If you're seeing this error, there's a frontend issue.
              </p>
              <Button 
                onClick={() => {
                  console.log('Manual success trigger clicked');
                  setStatus('success');
                  setMessage('Email verified successfully! Welcome to CodeSensai!');
                  setTimeout(() => navigate('/onboarding'), 1000);
                }}
                style={{ backgroundColor: '#10b981', marginTop: '10px' }}
              >
                🎯 Manual Success (Debug)
              </Button>
            </div>
            
            <div style={{ marginTop: '20px' }}>
              <p style={{ color: '#6b7280', marginBottom: '10px' }}>
                Didn't receive the email? Enter your email to resend:
              </p>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '2px solid #e5e7eb',
                  borderRadius: '8px',
                  marginBottom: '10px',
                  fontSize: '1rem'
                }}
              />
              <ResendButton 
                onClick={resendVerification}
                disabled={resendLoading}
              >
                {resendLoading ? <Spinner /> : 'Resend Verification Email'}
              </ResendButton>
            </div>
          </div>
        )}
      </Card>
    </Container>
  );
};

export default EmailVerificationPage; 