import React from 'react';
import './css/App.css';

import AppName from './components/AppName.js';

const recipies = [
  {
    id: 1,
    name: 'spring green alaska cod-potato cakes',
    imageUrl:
      'https://www.shopfamilyfare.com/sites/default/files/styles/recipe_thumbnail_responsive_2x/public/recipes/Cod-Potato-Cakes-Catalog.jpg?itok=5F76CM_B',
  },
  {
    id: 2,
    name: 'roasted alaska cod with kale pesto and tomato jam',
    imageUrl:
      'https://www.shopfamilyfare.com/sites/default/files/styles/recipe_thumbnail_responsive_2x/public/recipes/ROASTED-ALASKA-COD-Catalog.jpg?itok=xa5cPIMB',
  },
  {
    id: 3,
    name: 'hot ham and cheese roll-ups ',
    imageUrl:
      'https://www.shopfamilyfare.com/sites/default/files/styles/recipe_thumbnail_responsive_2x/public/recipes/KraftHeinz_SpartanNash_Hockeyville_Recipe_Image_1.jpg?itok=u1d_gVIP',
  },
  {
    id: 4,
    name: 'double oreo mug cake',
    imageUrl:
      'https://www.shopfamilyfare.com/sites/default/files/styles/recipe_thumbnail_responsive_2x/public/recipes/Oreo-Mug-Cake-R.jpg?itok=7T8NbInq',
  },
  {
    id: 5,
    name: 'oreo strawberries and cream',
    imageUrl:
      'https://www.shopfamilyfare.com/sites/default/files/styles/recipe_thumbnail_responsive_2x/public/recipes/Oreo-Strawberries-N-Cream-R_0.jpg?itok=Q9RTcmGa',
  },
  {
    id: 6,
    name: 'oreo peanut butter jingle balls',
    imageUrl:
      'https://www.shopfamilyfare.com/sites/default/files/styles/recipe_thumbnail_responsive_2x/public/recipes/Oreo-Peanut-Butter-Jingle-Balls-R.jpg?itok=8kOnwa5W',
  },
];
const Recipe = ({ name, imageUrl }) => (
  <div className='recipe-card'>
    <img src={imageUrl} alt={name} className='recipe-image'></img>
    <h3 className='recipe-name'>{name}</h3>
  </div>
);

const Recipies = ({ recipies }) => {
  const recepiesList = recipies.map((recipe, i) => (
    <Recipe {...recipe} key={i} />
  ));
  return <div className='recipe-container'>{recepiesList}</div>;
};

const App = () => (
  <React.Fragment>
    <AppName />
    <Recipies recipies={recipies} />
  </React.Fragment>
);

export default App;
