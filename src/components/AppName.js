import React from 'react';

import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Heading = styled.h1`
  & {
    color: #ffffff;
    text-align: center;
    background-color: #222323;
    margin: 0;
    padding: 1.5vh;
  }
  & > a {
    color: #ffffff;
    text-decoration: none;
  }
`;

const AppName = () => (
  <Heading>
    <Link to='/'>Cook Book</Link>
  </Heading>
);

export default AppName;
