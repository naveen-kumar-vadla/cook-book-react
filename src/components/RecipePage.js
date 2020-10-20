import React, { useState, useEffect } from 'react';

import styled from 'styled-components';
import { useParams, Link } from 'react-router-dom';

import RecipeAPI from './RecipeAPI.js';
import notCollectedIcon from '../images/not-collected.svg';
import CollectedIcon from '../images/collected.svg';
import BlankPageWithMessage from './BlankPageWithMessage.js';
import {
  StyledContainer,
  TopContainer,
  BottomContainer,
  PageHeader,
  InfoTable,
  StyledInfoItem,
} from './styledComponents.js';
import { extractInitials } from './helperFunctions.js';

const RecipeImage = styled.img`
  height: 30vh;
  width: 30vw;
  border-radius: 1vh;
  margin: 3rem;
`;

const MiniHeader = styled.h3`
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
    justify-content: space-between;
  }
  & > div {
    display: flex;
  }
  & .profile-pic {
    position: relative;
    height: 3rem;
    width: 3rem;
    border: 1px solid #ffffff;
    border-radius: 50%;
    margin-right: 1rem;
    background-color: gray;
    overflow: hidden;
  }
  & .profile-pic > img {
    width: 100%;
    height: 100%;
  }
  & .profile-pic > span {
    color: #ffffff;
    text-align: center;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  & > div > a {
    margin: 0.7rem 0rem;
    text-decoration: none;
  }
  & > div > a > span {
    color: #ffffff;
    text-transform: capitalize;
  }
  & .share-action {
    cursor: pointer;
    height: 3rem;
    width: 3rem;
    border-radius: 50%;
    color: white;
    margin: 0 1rem;
  }
  & .collect-action {
    cursor: pointer;
    height: 3rem;
    width: 3rem;
    margin: 0 1rem;
  }
`;

const copyUrl = setIsCopied => {
  setIsCopied(s => !s);
  var Url = document.getElementById('url');
  Url.style['display'] = 'block';
  Url.innerHTML = window.location.href;
  Url.select();
  document.execCommand('copy');
  Url.style['display'] = 'none';
};

const toggleCollect = (id, setIsRecipeCollected) => {
  RecipeAPI.toggleCollect(id).then(({ isCollected }) => {
    setIsRecipeCollected(isCollected);
  });
};

const RecipeInfo = ({
  category,
  serves,
  prepTime,
  cookTime,
  totalTime,
  user,
  isCollected,
  id,
  loggedUser,
}) => {
  const [isCopied, setIsCopied] = useState(false);
  const [isRecipeCollected, setIsRecipeCollected] = useState(isCollected);
  return (
    <div style={{ margin: '1rem 3rem 0 0' }}>
      <UserInfo>
        <div>
          <div className='profile-pic'>
            {user.imageUrl ? (
              <img src={user.imageUrl} alt={user.username}></img>
            ) : (
              <span>{extractInitials(user.name)}</span>
            )}
          </div>
          <Link to={`/profile/${user.username}`}>
            <span>{user.name}</span>
          </Link>
        </div>
        <div className='actions'>
          {isCopied ? (
            <img
              className='share-action'
              src='https://www.freepnglogos.com/uploads/tick-png/image-tick-mark-icon-png-good-luck-charlie-wiki-2.png'
              alt='copied'
            ></img>
          ) : (
            <img
              className='share-action'
              onClick={() => copyUrl(setIsCopied)}
              src='https://www.freepnglogos.com/uploads/share-png/android-blue-circle-network-share-sharing-social-icon-5.png'
              alt='copy'
            ></img>
          )}
          <textarea
            id='url'
            rows='3'
            cols='30'
            style={{ display: 'none' }}
          ></textarea>
          {loggedUser.username ? (
            isRecipeCollected ? (
              <img
                className='collect-action'
                onClick={() => toggleCollect(id, setIsRecipeCollected)}
                src={CollectedIcon}
                alt='collected'
              ></img>
            ) : (
              <img
                className='collect-action'
                onClick={() => toggleCollect(id, setIsRecipeCollected)}
                src={notCollectedIcon}
                alt='collect'
              ></img>
            )
          ) : (
            ''
          )}
        </div>
      </UserInfo>
      <InfoTable>
        <StyledInfoItem header='Category : ' value={category} />
        <StyledInfoItem header='Serves : ' value={serves} />
        <StyledInfoItem
          header='Preparation Time : '
          value={prepTime ? `${prepTime} minutes` : prepTime}
        />
        <StyledInfoItem
          header='Cooking Time : '
          value={cookTime ? `${cookTime} minutes` : cookTime}
        />
        <StyledInfoItem
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
      <StyledInfoItem value={ingredient} />
    </li>
  ));
  return (
    <IngredientsContainer>
      <MiniHeader>Ingredients</MiniHeader>
      <ol>{details}</ol>
    </IngredientsContainer>
  );
};

const Instructions = ({ instructions }) => {
  const details = instructions.map((instruction, i) => (
    <li key={`instruction-${i}`}>
      <StyledInfoItem value={instruction} />
    </li>
  ));
  return (
    <div style={{ width: '70%' }}>
      <MiniHeader>Instructions</MiniHeader>
      <ol>{details}</ol>
    </div>
  );
};

const RecipePage = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loggedUser, setUser] = useState(null);
  useEffect(() => {
    RecipeAPI.fetchUser().then(setUser);
    RecipeAPI.fetchRecipe(id).then(setRecipe);
  }, [id]);
  if (recipe == null || loggedUser == null)
    return <BlankPageWithMessage message='Loading ...' />;
  return (
    <StyledContainer>
      <PageHeader>{recipe.name}</PageHeader>
      <TopContainer>
        <RecipeImage src={recipe.imageUrl} alt={recipe.name} />
        <RecipeInfo {...recipe} loggedUser={loggedUser} />
      </TopContainer>
      <BottomContainer>
        <Ingredients {...recipe} />
        <Instructions {...recipe} />
      </BottomContainer>
    </StyledContainer>
  );
};

export default RecipePage;
