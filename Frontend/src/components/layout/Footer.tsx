import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background-color: #1a1a1a;
  color: #ffffff;
  padding: 2rem 0;
  margin-top: auto;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  text-align: center;
`;

const Footer: React.FC = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <p>&copy; {new Date().getFullYear()} Nature Picture. All rights reserved.</p>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer; 