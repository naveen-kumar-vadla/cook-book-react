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

const NoMatch = () => {
  return (
    <StyledContainer>
      <h1>404 Page Not Found</h1>
    </StyledContainer>
  );
};

export default NoMatch;
