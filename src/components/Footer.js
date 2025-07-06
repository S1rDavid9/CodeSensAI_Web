import React from 'react';
import styled from 'styled-components';

const FooterBar = styled.footer`
  background: var(--accent);
  color: var(--primary-purple);
  text-align: center;
  padding: 1rem 0;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  font-size: 1rem;
  margin-top: 2rem;
`;

const Footer = () => (
  <FooterBar>
    &copy; {new Date().getFullYear()} CodeSensAI. All rights reserved.
  </FooterBar>
);

export default Footer; 