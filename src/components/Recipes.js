import React from 'react';
import { Link } from 'react-router-dom';

import styled from 'styled-components';

import BlankPageWithMessage from './BlankPageWithMessage.js';
import { StyledContainer } from './styledComponents.js';

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

const RecipesContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-flow: row wrap;
  padding: 2rem 1rem;
  margin: 2rem;
  width: 100%;
`;

const Recipes = ({ recipes }) => {
  if (recipes == null) return <BlankPageWithMessage message='Loading ...' />;
  const recipeCards = recipes.map(recipe => (
    <StyledRecipeCard {...recipe} key={recipe.id} />
  ));
  return (
    <StyledContainer>
      <RecipesContainer className='recipes'>{recipeCards}</RecipesContainer>
    </StyledContainer>
  );
};

export default Recipes;
