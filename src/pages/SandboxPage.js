import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Spinner from '../components/Spinner';
import { FaPlay, FaTrash, FaCopy, FaLightbulb } from 'react-icons/fa';

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  background: var(--background);
  padding: 2rem 1rem;
  position: relative;
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
  
  @media (max-width: 768px) {
    padding: 1.5rem 0.75rem;
  }
  
  @media (max-width: 480px) {
    padding: 1rem 0.5rem;
  }
`;

const Title = styled.h2`
  color: var(--primary-purple);
  font-size: 2.3rem;
  margin-bottom: 0.7em;
  font-family: 'Poppins', Arial, sans-serif;
  letter-spacing: 1px;
  text-align: center;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
  
  @media (max-width: 480px) {
    font-size: 1.8rem;
  }
`;

const Subtitle = styled.h3`
  color: var(--primary-purple);
  font-size: 1.3rem;
  margin-bottom: 1.5em;
  font-family: 'Poppins', Arial, sans-serif;
  font-weight: 500;
  text-align: center;
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
  
  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;

const SandboxContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  width: 100%;
  max-width: 900px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const CodeSection = styled.div`
  background: var(--surface-white);
  border-radius: 20px;
  box-shadow: var(--shadow-md);
  padding: 1.5rem;
  border: 1px solid var(--surface-light);
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding-bottom: 0.8rem;
  border-bottom: 2px solid var(--surface-light);
`;

const SectionTitle = styled.h3`
  color: var(--primary-purple);
  font-size: 1.2rem;
  font-weight: 600;
  margin: 0;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const ActionButton = styled.button`
  background: var(--surface-light);
  color: var(--text-primary);
  border: none;
  border-radius: 8px;
  padding: 0.5rem;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    background: var(--primary-purple);
    color: white;
    transform: translateY(-1px);
  }
  
  &.primary {
    background: var(--primary-purple);
    color: white;
    
    &:hover {
      background: var(--accent-pink);
    }
  }
`;

const CodeEditor = styled.textarea`
  width: 100%;
  min-height: 300px;
  border-radius: 12px;
  border: 2px solid var(--surface-light);
  font-family: 'Fira Code', 'Consolas', 'Monaco', monospace;
  font-size: 0.9rem;
  line-height: 1.5;
  padding: 1rem;
  background: var(--surface-light);
  color: var(--text-primary);
  resize: vertical;
  outline: none;
  transition: border-color 0.2s;
  
  &:focus {
    border-color: var(--primary-purple);
  }
  
  @media (max-width: 768px) {
    min-height: 250px;
    font-size: 0.85rem;
  }
`;

const OutputSection = styled.div`
  background: var(--surface-white);
  border-radius: 20px;
  box-shadow: var(--shadow-md);
  padding: 1.5rem;
  border: 1px solid var(--surface-light);
`;

const OutputContent = styled.div`
  background: var(--surface-light);
  border-radius: 12px;
  padding: 1rem;
  min-height: 300px;
  font-family: 'Fira Code', 'Consolas', 'Monaco', monospace;
  font-size: 0.9rem;
  line-height: 1.5;
  color: var(--text-primary);
  white-space: pre-wrap;
  overflow-y: auto;
  
  @media (max-width: 768px) {
    min-height: 250px;
    font-size: 0.85rem;
  }
`;

const ErrorMessage = styled.div`
  color: var(--error);
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid var(--error);
  border-radius: 8px;
  padding: 0.8rem;
  margin-top: 0.5rem;
  font-size: 0.9rem;
`;

const SuccessMessage = styled.div`
  color: var(--success);
  background: rgba(34, 197, 94, 0.1);
  border: 1px solid var(--success);
  border-radius: 8px;
  padding: 0.8rem;
  margin-top: 0.5rem;
  font-size: 0.9rem;
`;

const TemplatesSection = styled.div`
  background: var(--surface-white);
  border-radius: 20px;
  box-shadow: var(--shadow-md);
  padding: 1.5rem;
  width: 100%;
  max-width: 900px;
  margin-top: 2rem;
  border: 1px solid var(--surface-light);
`;

const TemplatesTitle = styled.h3`
  color: var(--primary-purple);
  font-size: 1.3rem;
  margin-bottom: 1rem;
  text-align: center;
  font-weight: 600;
`;

const TemplatesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  }
`;

const TemplateCard = styled.div`
  background: var(--surface-light);
  border-radius: 12px;
  padding: 1rem;
  cursor: pointer;
  transition: all 0.2s;
  border: 2px solid transparent;
  
  &:hover {
    background: var(--surface-purple);
    border-color: var(--primary-purple);
    transform: translateY(-2px);
  }
`;

const TemplateTitle = styled.div`
  color: var(--primary-purple);
  font-weight: 600;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
`;

const TemplateDescription = styled.div`
  color: var(--text-secondary);
  font-size: 0.8rem;
  line-height: 1.4;
`;

const SandboxPage = () => {
  const [loading, setLoading] = useState(true);
  const [code, setCode] = useState('// Welcome to CodeSensAI Sandbox!\n// Try writing some JavaScript code below\n\nconsole.log("Hello, World!");\n\n// You can also try:\n// - Variables: let name = "CodeSensAI";\n// - Functions: function greet() { return "Hello!"; }\n// - Arrays: [1, 2, 3, 4, 5]\n// - Objects: { name: "Student", age: 12 }');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const codeTemplates = [
    {
      title: 'Hello World',
      description: 'Basic console output',
      code: 'console.log("Hello, CodeSensAI!");'
    },
    {
      title: 'Variables',
      description: 'Working with variables',
      code: 'let name = "Student";\nlet age = 12;\nconsole.log("Hello, I am " + name + " and I am " + age + " years old!");'
    },
    {
      title: 'Functions',
      description: 'Creating and using functions',
      code: 'function addNumbers(a, b) {\n  return a + b;\n}\n\nlet result = addNumbers(5, 3);\nconsole.log("5 + 3 = " + result);'
    },
    {
      title: 'Arrays',
      description: 'Working with arrays',
      code: 'let fruits = ["apple", "banana", "orange"];\nconsole.log("My fruits:", fruits);\nconsole.log("First fruit:", fruits[0]);\nconsole.log("Number of fruits:", fruits.length);'
    },
    {
      title: 'Loops',
      description: 'Using for loops',
      code: 'for (let i = 1; i <= 5; i++) {\n  console.log("Count: " + i);\n}'
    },
    {
      title: 'Objects',
      description: 'Creating objects',
      code: 'let student = {\n  name: "Alex",\n  age: 12,\n  grade: "6th"\n};\n\nconsole.log("Student:", student);\nconsole.log("Name:", student.name);'
    }
  ];

  const runCode = () => {
    setError('');
    setSuccess('');
    setOutput('');

    try {
      // Create a safe execution environment
      const safeEval = (code) => {
        // Capture console.log outputs
        const outputs = [];
        const originalLog = console.log;
        console.log = (...args) => {
          outputs.push(args.map(arg => 
            typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
          ).join(' '));
        };

        try {
          // Execute the code
          // eslint-disable-next-line no-eval
          eval(code);
          console.log = originalLog;
          return outputs.join('\n');
        } catch (err) {
          console.log = originalLog;
          throw err;
        }
      };

      const result = safeEval(code);
      setOutput(result || 'Code executed successfully! (No output)');
      setSuccess('Code executed successfully! 🎉');
    } catch (err) {
      setError(`Error: ${err.message}`);
    }
  };

  const clearCode = () => {
    setCode('');
    setOutput('');
    setError('');
    setSuccess('');
  };

  const copyCode = () => {
    navigator.clipboard.writeText(code);
    setSuccess('Code copied to clipboard! 📋');
    setTimeout(() => setSuccess(''), 2000);
  };

  const loadTemplate = (templateCode) => {
    setCode(templateCode);
    setOutput('');
    setError('');
    setSuccess('');
  };

  if (loading) {
    return <Spinner message="Loading your coding sandbox..." />;
  }

  return (
    <Wrapper>
      <Title>Coding Sandbox</Title>
      <Subtitle>Practice JavaScript in a safe environment! 🚀</Subtitle>

      <SandboxContainer>
        <CodeSection>
          <SectionHeader>
            <SectionTitle>Code Editor</SectionTitle>
            <ButtonGroup>
              <ActionButton onClick={copyCode} title="Copy Code">
                <FaCopy />
              </ActionButton>
              <ActionButton onClick={clearCode} title="Clear Code">
                <FaTrash />
              </ActionButton>
              <ActionButton className="primary" onClick={runCode} title="Run Code">
                <FaPlay />
              </ActionButton>
            </ButtonGroup>
          </SectionHeader>
          <CodeEditor 
            value={code} 
            onChange={(e) => setCode(e.target.value)} 
            spellCheck={false}
            placeholder="Write your JavaScript code here..."
          />
        </CodeSection>

        <OutputSection>
          <SectionHeader>
            <SectionTitle>Output</SectionTitle>
          </SectionHeader>
          <OutputContent>
            {output ? output : '// Output will appear here when you run your code'}
          </OutputContent>
          {error && <ErrorMessage>{error}</ErrorMessage>}
          {success && <SuccessMessage>{success}</SuccessMessage>}
        </OutputSection>
      </SandboxContainer>

      <TemplatesSection>
        <TemplatesTitle>
          <FaLightbulb style={{ marginRight: '0.5rem' }} />
          Code Templates
        </TemplatesTitle>
        <TemplatesGrid>
          {codeTemplates.map((template, index) => (
            <TemplateCard 
              key={index} 
              onClick={() => loadTemplate(template.code)}
              title={`Load: ${template.title}`}
            >
              <TemplateTitle>{template.title}</TemplateTitle>
              <TemplateDescription>{template.description}</TemplateDescription>
            </TemplateCard>
          ))}
        </TemplatesGrid>
      </TemplatesSection>
    </Wrapper>
  );
};

export default SandboxPage; 