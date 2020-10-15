import React from 'react';

const RecipeCard = ({ name, imageUrl }) => (
  <div className='recipe-card'>
    <img src={imageUrl} alt={name} className='recipe-image'></img>
    <h3 className='recipe-name'>{name}</h3>
  </div>
);

const Recipies = ({ recipies }) => {
  let recipeCards = <h1>Loading ...</h1>;
  if (recipies != null) {
    recipeCards = recipies.map(recipe => (
      <RecipeCard {...recipe} key={recipe.id} />
    ));
  }
  return <div className='recipe-container'>{recipeCards}</div>;
};

export default Recipies;
