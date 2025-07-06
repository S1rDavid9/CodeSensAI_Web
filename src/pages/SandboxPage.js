import React, { useState } from 'react';
import styled from 'styled-components';

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 70vh;
  background: var(--background);
  padding: 2rem 1rem;
`;

const Mascot = styled.div`
  font-size: 3rem;
  margin-bottom: 1em;
`;

const Title = styled.h2`
  color: var(--primary-purple);
  font-size: 2rem;
  margin-bottom: 0.5em;
  font-family: 'Poppins', Arial, sans-serif;
`;

const Message = styled.p`
  color: var(--secondary-purple);
  font-size: 1.2rem;
  text-align: center;
  margin-bottom: 1.5em;
`;

const CodeArea = styled.textarea`
  width: 350px;
  min-height: 120px;
  border-radius: 12px;
  border: 1.5px solid var(--primary-purple);
  font-family: 'Fira Mono', 'Consolas', monospace;
  font-size: 1.05rem;
  padding: 1em;
  margin-bottom: 1em;
  background: #fff;
  color: var(--primary-purple);
  resize: vertical;
`;

const RunButton = styled.button`
  background: var(--primary-purple);
  color: #fff;
  border: none;
  border-radius: 20px;
  padding: 0.7em 1.5em;
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 1em;
  cursor: pointer;
  transition: background 0.2s;
  &:hover {
    background: var(--secondary-purple);
  }
`;

const OutputBox = styled.div`
  background: var(--accent);
  color: var(--primary-purple);
  border-radius: 12px;
  padding: 1em;
  min-height: 40px;
  width: 350px;
  margin-top: 0.5em;
  font-family: 'Fira Mono', 'Consolas', monospace;
  font-size: 1.05rem;
`;

const SandboxPage = () => {
  const [code, setCode] = useState('// Write some JavaScript!\nconsole.log("Hello, CodeSensAI!");');
  const [output, setOutput] = useState('');

  const runCode = () => {
    // Mock output for now
    if (code.includes('console.log')) {
      const match = code.match(/console\.log\((.*)\)/);
      if (match) {
        // eslint-disable-next-line no-eval
        try { setOutput(eval(match[1])); } catch { setOutput('Error in code!'); }
      } else {
        setOutput('No output.');
      }
    } else {
      setOutput('No output.');
    }
  };

  return (
    <Wrapper>
      <Mascot>🧑‍💻</Mascot>
      <Title>Coding Sandbox</Title>
      <Message>Try out your code below! More features coming soon. 🚀</Message>
      <CodeArea value={code} onChange={e => setCode(e.target.value)} spellCheck={false} />
      <RunButton onClick={runCode}>Run</RunButton>
      <OutputBox><b>Output:</b> {output}</OutputBox>
    </Wrapper>
  );
};

export default SandboxPage; 