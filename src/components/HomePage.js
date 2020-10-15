import React, { useState, useEffect } from 'react';

import AppName from './AppName.js';
import Recipies from './Recipies.js';
import RecipeAPI from './RecipeAPI.js';

const HomePage = () => {
  const [recipies, setRecipies] = useState(null);
  useEffect(() => {
    RecipeAPI.fetchRecipies().then(setRecipies);
  }, []);
  return (
    <React.Fragment>
      <AppName />
      <Recipies recipies={recipies} />
    </React.Fragment>
  );
};

export default HomePage;
