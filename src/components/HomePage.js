import React, { useState, useEffect } from 'react';

import Recipes from './Recipes.js';
import RecipeAPI from './RecipeAPI.js';

const HomePage = () => {
  const [recipes, setRecipes] = useState(null);
  useEffect(() => {
    RecipeAPI.fetchRecipes().then(setRecipes);
  }, []);
  return <Recipes recipes={recipes} />;
};

export default HomePage;
