import React from 'react';
import styled from 'styled-components';

const FooterBar = styled.footer`
  background: var(--accent);
  color: var(--text-primary);
  text-align: center;
  padding: 1rem 0;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  font-size: 1rem;
  margin-top: 2rem;
  position: relative;
  z-index: 1;
  width: 100%;
  bottom: 0;
  font-weight: 600;
`;

const Footer = () => (
  <FooterBar>
    &copy; {new Date().getFullYear()} CodeSensAI. All rights reserved.
  </FooterBar>
);

export default Footer; 