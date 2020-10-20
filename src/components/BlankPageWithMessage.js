import React from 'react';

import styled from 'styled-components';
import { StyledContainer } from './styledComponents.js';

const Header = styled.h1`
  padding: 2rem 1rem;
  margin: 2rem;
  color: #ffffff;
  text-align: center;
`;

const BlankPageWithMessage = ({ message }) => {
  return (
    <StyledContainer>
      <Header>{message}</Header>
    </StyledContainer>
  );
};

export default BlankPageWithMessage;
