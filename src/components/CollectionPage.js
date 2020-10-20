import React, { useState, useEffect } from 'react';

import styled from 'styled-components';

import Recipes from './Recipes.js';
import RecipeAPI from './RecipeAPI.js';
import { PageHeader } from './styledComponents.js';

const HomePage = () => {
  const [collection, setcollection] = useState(null);
  useEffect(() => {
    RecipeAPI.fetUserCollection().then(setcollection);
  }, []);
  return (
    <div>
      <PageHeader>Collection</PageHeader>
      <Recipes recipes={collection} />
    </div>
  );
};

export default HomePage;
