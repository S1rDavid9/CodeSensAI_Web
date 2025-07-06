import styled from 'styled-components';

export const FormContainer = styled.div`
  background: var(--surface-white);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-lg);
  padding: 2.5rem;
  max-width: 500px;
  width: 100%;
  margin: 0 auto;
  border: 1px solid var(--surface-light);
`;

export const FormTitle = styled.h2`
  color: var(--text-primary);
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  text-align: center;
  font-family: 'Fredoka', 'Poppins', Arial, sans-serif;
`;

export const FormSubtitle = styled.p`
  color: var(--text-secondary);
  font-size: 1.1rem;
  margin-bottom: 2rem;
  text-align: center;
  line-height: 1.5;
`;

export const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

export const Label = styled.label`
  display: block;
  color: var(--text-primary);
  font-weight: 600;
  margin-bottom: 0.5rem;
  font-size: 1rem;
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.875rem 1rem;
  border: 2px solid var(--surface-light);
  border-radius: var(--radius-lg);
  font-size: 1rem;
  font-family: inherit;
  transition: all 0.3s ease;
  background: var(--surface-white);
  color: var(--text-primary);
  
  &:focus {
    outline: none;
    border-color: var(--primary-purple);
    box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.1);
  }
  
  &::placeholder {
    color: var(--text-light);
  }
  
  &:hover {
    border-color: var(--primary-purple);
  }
`;

export const Select = styled.select`
  width: 100%;
  padding: 0.875rem 1rem;
  border: 2px solid var(--surface-light);
  border-radius: var(--radius-lg);
  font-size: 1rem;
  font-family: inherit;
  transition: all 0.3s ease;
  background: var(--surface-white);
  color: var(--text-primary);
  cursor: pointer;
  
  &:focus {
    outline: none;
    border-color: var(--primary-purple);
    box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.1);
  }
  
  &:hover {
    border-color: var(--primary-purple);
  }
`;

export const TextArea = styled.textarea`
  width: 100%;
  padding: 0.875rem 1rem;
  border: 2px solid var(--surface-light);
  border-radius: var(--radius-lg);
  font-size: 1rem;
  font-family: inherit;
  transition: all 0.3s ease;
  background: var(--surface-white);
  color: var(--text-primary);
  resize: vertical;
  min-height: 100px;
  
  &:focus {
    outline: none;
    border-color: var(--primary-purple);
    box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.1);
  }
  
  &::placeholder {
    color: var(--text-light);
  }
  
  &:hover {
    border-color: var(--primary-purple);
  }
`;

export const SubmitButton = styled.button`
  width: 100%;
  background: var(--gradient-primary);
  color: white;
  border: none;
  border-radius: var(--radius-lg);
  padding: 1rem 2rem;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 1rem;
  box-shadow: var(--shadow-md);
  
  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: var(--shadow-lg);
  }
  
  &:active:not(:disabled) {
    transform: translateY(0);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

export const SecondaryButton = styled.button`
  width: 100%;
  background: transparent;
  color: var(--primary-purple);
  border: 2px solid var(--primary-purple);
  border-radius: var(--radius-lg);
  padding: 1rem 2rem;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 1rem;
  
  &:hover:not(:disabled) {
    background: var(--primary-purple);
    color: white;
    transform: translateY(-2px);
    box-shadow: var(--shadow-md);
  }
  
  &:active:not(:disabled) {
    transform: translateY(0);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

export const ErrorMessage = styled.div`
  color: var(--error);
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.2);
  border-radius: var(--radius-md);
  padding: 0.75rem 1rem;
  margin-bottom: 1rem;
  font-size: 0.95rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const SuccessMessage = styled.div`
  color: var(--success);
  background: rgba(16, 185, 129, 0.1);
  border: 1px solid rgba(16, 185, 129, 0.2);
  border-radius: var(--radius-md);
  padding: 0.75rem 1rem;
  margin-bottom: 1rem;
  font-size: 0.95rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const FormFooter = styled.div`
  text-align: center;
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--surface-light);
  color: var(--text-secondary);
  font-size: 0.95rem;
`;

export const FormLink = styled.a`
  color: var(--primary-purple);
  text-decoration: none;
  font-weight: 600;
  transition: color 0.2s ease;
  
  &:hover {
    color: var(--secondary-purple);
    text-decoration: underline;
  }
`;

export const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
`;

export const Checkbox = styled.input`
  width: 1.25rem;
  height: 1.25rem;
  accent-color: var(--primary-purple);
  cursor: pointer;
`;

export const CheckboxLabel = styled.label`
  color: var(--text-primary);
  font-size: 0.95rem;
  cursor: pointer;
  user-select: none;
`;

export const InputGroup = styled.div`
  display: flex;
  gap: 1rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const InputGroupItem = styled.div`
  flex: 1;
`; 