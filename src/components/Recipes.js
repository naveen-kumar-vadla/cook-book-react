import React from 'react';

const RecipeCard = ({ name, imageUrl }) => (
  <div className='recipe-card'>
    <img src={imageUrl} alt={name} className='recipe-image'></img>
    <h3 className='recipe-name'>{name}</h3>
  </div>
);

const Recipies = ({ recipies }) => {
  const recipeCards = recipies.map((recipe, i) => (
    <RecipeCard {...recipe} key={i} />
  ));
  return <div className='recipe-container'>{recipeCards}</div>;
};

export default Recipies;
