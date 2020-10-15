import React from 'react';
import { Link } from 'react-router-dom';

import styled from 'styled-components';

const RecipeCard = ({ className, id, name, imageUrl }) => {
  const recipeName = name.length > 50 ? `${name.slice(0, 50)} ...` : name;
  return (
    <div className={className}>
      <img src={imageUrl} alt={name}></img>
      <Link to={`/recipe/${id}`}>
        <h3>{recipeName}</h3>
      </Link>
    </div>
  );
};

const StyledRecipeCard = styled(RecipeCard)`
  & {
    background-color: #ffffff;
    border: 1px solid #ffffff;
    height: 30vh;
    width: 15vw;
    margin: 2rem;
    align-items: center;
  }
  & > img {
    height: 80%;
    width: 100%;
  }
  & > a {
    text-decoration: none;
  }
  & > a > h3 {
    color: black;
    margin: 0;
    text-transform: uppercase;
    font-size: 0.8rem;
    padding: 1rem;
    text-overflow: ellipsis;
  }
`;

const StyledContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-flow: row wrap;
  padding: 2rem 1rem;
  margin: 2rem;
`;

const Recipies = ({ recipies }) => {
  let recipeCards = <h1>Loading ...</h1>;
  if (recipies != null) {
    recipeCards = recipies.map(recipe => (
      <StyledRecipeCard {...recipe} key={recipe.id} />
    ));
  }
  return <StyledContainer>{recipeCards}</StyledContainer>;
};

export default Recipies;
