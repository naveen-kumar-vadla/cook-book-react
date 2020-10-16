import React, { useState, useEffect } from 'react';

import styled from 'styled-components';
import { useParams, Link } from 'react-router-dom';

import RecipeAPI from './RecipeAPI.js';

const StyledContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-flow: column wrap;
`;

const TopContainer = styled.div`
  height: 40%;
  display: flex;
  justify-content: space-between;
  background-color: #222324;
`;

const BottomContainer = styled.div`
  background-color: white;
  padding: 3rem;
  height: 50%;
  display: flex;
  margin: 3rem;
`;

const RecipeName = styled.h1`
  text-align: center;
  color: #000000;
  margin: 0;
  text-transform: uppercase;
  background-color: #ffffff;
`;

const RecipeImage = styled.img`
  height: 30vh;
  width: 30vw;
  border-radius: 1vh;
  margin: 3rem;
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

const UserInfo = styled.h3`
  & {
    display: flex;
  }
  & > div {
    position: relative;
    height: 3rem;
    width: 3rem;
    border: 1px solid #ffffff;
    border-radius: 50%;
    margin-right: 1rem;
    background-color: gray;
    overflow: hidden;
  }
  & > div > img {
    width: 100%;
    height: 100%;
  }
  & > div > span {
    color: #ffffff;
    text-align: center;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  & > a {
    margin: 0.7rem 0rem;
    text-decoration: none;
  }
  & > a > span {
    color: #ffffff;
    text-transform: capitalize;
  }
`;

const InfoItem = ({ header, value }) => (
  <StyledInfoItem>
    <InfoItemHeader>{header}</InfoItemHeader>
    <span>{value}</span>
  </StyledInfoItem>
);

const extractInitials = function (name) {
  const firstLetterIdx = 0;
  const [firstName, secondName] = name.split(' ');
  const firstLetter = firstName[firstLetterIdx];
  const profileName = secondName
    ? firstLetter + secondName[firstLetterIdx]
    : firstLetter;
  return profileName.toUpperCase();
};

const RecipeInfo = ({
  category,
  serves,
  prepTime,
  cookTime,
  totalTime,
  user,
}) => {
  return (
    <div style={{ margin: '1rem 3rem 0 0' }}>
      <UserInfo>
        <div>
          {user.imageUrl ? (
            <img src={user.imageUrl} alt={user.username}></img>
          ) : (
            <span>{extractInitials(user.name)}</span>
          )}
        </div>
        <Link to={`/profile/${user.username}`}>
          <span>{user.name}</span>
        </Link>
      </UserInfo>
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
    </div>
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
