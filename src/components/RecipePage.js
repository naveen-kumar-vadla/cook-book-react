import React, { useState, useEffect } from 'react';

import styled from 'styled-components';
import { useParams } from 'react-router-dom';

import RecipeAPI from './RecipeAPI.js';

const StyledContainer = styled.div`
  background-color: #f5f5f5;
  display: flex;
  justify-content: flex-start;
  flex-flow: column wrap;
  padding: 2rem 1rem;
  margin: 2rem;
`;

const TopContainer = styled.div`
  padding: 3rem;
  height: 40%;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #dddddd;
`;

const BottomContainer = styled.div`
  background-color: white;
  padding: 3rem;
  height: 50%;
  display: flex;
  border-radius: 1vh;
`;

const RecipeName = styled.h1`
  text-align: center;
  color: #610000;
  margin: 0;
  text-transform: uppercase;
  border-bottom: 1px solid #dddddd;
`;

const RecipeImage = styled.img`
  height: 30vh;
  border-radius: 1vh;
`;

const InfoTable = styled.div`
  width: 35vw;
  border-radius: 1vh;
  padding: 2rem;
  background-color: white;
`;

const StyledInfoItem = styled.div`
  margin: 2.5%;
  border-bottom: 1px solid #dddddd;
  padding-bottom: 1%;
`;

const InfoItemHeader = styled.span`
  font-weight: bold;
  text-align: left;
`;

const Header = styled.h3`
  text-align: center;
  color: #610000;
`;

const IngredientsContainer = styled.div`
  width: 30vw;
  border-right: 1px solid #dddddd;
  padding-right: 3%;
`;

const InfoItem = ({ header, value }) => (
  <StyledInfoItem>
    <InfoItemHeader>{header}</InfoItemHeader>
    <span>{value}</span>
  </StyledInfoItem>
);

const RecipeInfo = ({ category, serves, prepTime, cookTime, totalTime }) => {
  return (
    <InfoTable>
      <InfoItem header='Category : ' value={category} />
      <InfoItem header='Serves : ' value={serves} />
      <InfoItem
        header='Preparation Time : '
        value={prepTime ? `${prepTime} minutes` : prepTime}
      />
      <InfoItem
        header='Cooking Time : '
        value={cookTime ? `${cookTime} minutes` : cookTime}
      />
      <InfoItem
        header='Ready In : '
        value={totalTime ? `${totalTime} minutes` : totalTime}
      />
    </InfoTable>
  );
};

const Ingredients = ({ ingredients }) => {
  const details = ingredients.map((ingredient, i) => (
    <li key={`ingredient-${i}`}>
      <InfoItem value={ingredient} />
    </li>
  ));
  return (
    <IngredientsContainer>
      <Header>Ingredients</Header>
      <ol>{details}</ol>
    </IngredientsContainer>
  );
};

const Instructions = ({ instructions }) => {
  const details = instructions.map((instruction, i) => (
    <li key={`instruction-${i}`}>
      <InfoItem value={instruction} />
    </li>
  ));
  return (
    <div style={{ width: '70%' }}>
      <Header>Instructions</Header>
      <ol>{details}</ol>
    </div>
  );
};

const RecipePage = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  useEffect(() => {
    RecipeAPI.fetchRecipe(id).then(setRecipe);
  }, [id]);
  if (recipe == null) {
    return (
      <React.Fragment>
        <StyledContainer>
          <h1>Loading ...</h1>
        </StyledContainer>
      </React.Fragment>
    );
  }
  return (
    <StyledContainer>
      <RecipeName>{recipe.name}</RecipeName>
      <TopContainer>
        <RecipeImage src={recipe.imageUrl} alt={recipe.name} />
        <RecipeInfo {...recipe} />
      </TopContainer>
      <BottomContainer>
        <Ingredients {...recipe} />
        <Instructions {...recipe} />
      </BottomContainer>
    </StyledContainer>
  );
};

export default RecipePage;
