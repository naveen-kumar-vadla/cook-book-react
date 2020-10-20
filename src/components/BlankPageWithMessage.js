import React from 'react';

import styled from 'styled-components';

const StyledContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-flow: column wrap;
  padding: 2rem 1rem;
  margin: 2rem;
  color: #ffffff;
  text-align: center;
`;

const BlankPageWithMessage = ({ message }) => {
  return (
    <StyledContainer>
      <h1>{message}</h1>
    </StyledContainer>
  );
};

export default BlankPageWithMessage;
