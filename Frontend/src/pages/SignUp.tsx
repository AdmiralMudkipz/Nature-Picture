import React from 'react';
import styled from 'styled-components';

const SignUp: React.FC = () => {
  return (
    <Container>
      <Header>Sign Up</Header>
      <Content>
        <p>Create a new account to start selling or buying artwork.</p>
      </Content>
    </Container>
  );
};

const Container = styled.div` 
  padding: 20px;
  color: #ffffff;
`;

const Header = styled.h1`
  text-align: center;
  margin-bottom: 20px;
`;

const Content = styled.div`
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
`;

export default SignUp; 