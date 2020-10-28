import React, { useState, useEffect } from 'react';

import Recipes from './Recipes.js';
import RecipeAPI from './RecipeAPI.js';
import { PageHeader } from './styledComponents.js';
import { useParams } from 'react-router-dom';

const HomePage = () => {
  const { userId } = useParams();
  const [collection, setcollection] = useState(null);
  useEffect(() => {
    RecipeAPI.fetUserCollection(userId).then(setcollection);
  }, [userId]);
  return (
    <div>
      <PageHeader>Collection</PageHeader>
      <Recipes recipes={collection} />
    </div>
  );
};

export default HomePage;
