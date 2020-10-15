import React from 'react';

import { Link } from 'react-router-dom';
import styled from 'styled-components';

import AppName from './AppName.js';

const StyledContainer = styled.div`
  background-color: #f5f5f5;
  display: flex;
  justify-content: flex-start;
  flex-flow: column wrap;
  padding: 2rem 1rem;
  margin: 2rem;
`;

const linkStyle = { color: '#610000' };

const NoMatch = () => {
  return (
    <React.Fragment>
      <AppName />
      <StyledContainer>
        <h1>404 Page Not Found</h1>
        <Link to='/' style={linkStyle}>
          Go to Home
        </Link>
      </StyledContainer>
    </React.Fragment>
  );
};

export default NoMatch;
