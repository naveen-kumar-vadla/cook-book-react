import React, { useState, useEffect } from 'react';

import styled from 'styled-components';

import Recipies from './Recipies.js';
import RecipeAPI from './RecipeAPI.js';

const Header = styled.h1`
  text-align: center;
  color: #000000;
  margin: 0;
  text-transform: uppercase;
  background-color: #ffffff;
`;

const HomePage = () => {
  const [collection, setcollection] = useState(null);
  useEffect(() => {
    RecipeAPI.fetUserCollection().then(setcollection);
  }, []);
  return (
    <div>
      <Header>Collection</Header>
      <Recipies recipies={collection} />
    </div>
  );
};

export default HomePage;
