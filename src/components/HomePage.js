import React, { useState, useEffect } from 'react';

import Recipies from './Recipies.js';
import RecipeAPI from './RecipeAPI.js';

const HomePage = () => {
  const [recipies, setRecipies] = useState(null);
  useEffect(() => {
    RecipeAPI.fetchRecipies().then(setRecipies);
  }, []);
  return <Recipies recipies={recipies} />;
};

export default HomePage;
