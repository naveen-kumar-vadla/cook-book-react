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
  MiniProfileImage,
} from './styledComponents.js';

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

const getCopyAction = (isCopied, setIsCopied) => {
  const copyAction = {};
  copyAction.src = isCopied
    ? 'https://www.freepnglogos.com/uploads/tick-png/image-tick-mark-icon-png-good-luck-charlie-wiki-2.png'
    : 'https://www.freepnglogos.com/uploads/share-png/android-blue-circle-network-share-sharing-social-icon-5.png';
  copyAction.alt = isCopied ? 'copied' : 'copy';
  copyAction.onClick = isCopied ? () => {} : () => copyUrl(setIsCopied);
  return copyAction;
};

const getCollectAction = (id, isRecipeCollected, setIsRecipeCollected) => {
  const collectAction = {};
  collectAction.src = isRecipeCollected ? CollectedIcon : notCollectedIcon;
  collectAction.alt = isRecipeCollected ? 'collected' : 'collect';
  collectAction.onClick = () => toggleCollect(id, setIsRecipeCollected);
  return collectAction;
};

const UserActions = ({ isCollected, id, loggedUser }) => {
  const [isCopied, setIsCopied] = useState(false);
  const [isRecipeCollected, setIsRecipeCollected] = useState(isCollected);
  const copyAction = getCopyAction(isCopied, setIsCopied);
  const collectAction = getCollectAction(
    id,
    isRecipeCollected,
    setIsRecipeCollected
  );
  return (
    <div className='actions'>
      <img className='share-action' alt='' {...copyAction}></img>
      <textarea
        id='url'
        rows='3'
        cols='30'
        style={{ display: 'none' }}
      ></textarea>
      {loggedUser.username ? (
        <img className='collect-action' alt='' {...collectAction}></img>
      ) : (
        <></>
      )}
    </div>
  );
};

const PostedUserInfo = ({ className, ...user }) => {
  return (
    <div className={className}>
      <MiniProfileImage {...user} />
      <Link to={`/profile/${user.username}`}>
        <span>{user.name}</span>
      </Link>
    </div>
  );
};

const StyledUserInfo = styled(PostedUserInfo)`
  & {
    display: flex;
  }
  & > a {
    margin: 0.7rem 0rem;
    text-decoration: none;
  }
  & > a > span {
    color: #ffffff;
    text-transform: capitalize;
    font-weight: bold;
  }
  & > a > span:hover {
    text-decoration: underline;
  }
`;

const UserRow = ({ user, isCollected, id, loggedUser, className }) => {
  return (
    <div className={className}>
      <StyledUserInfo {...user} />
      <UserActions {...{ isCollected, id, loggedUser }} />
    </div>
  );
};

const StyledUserRow = styled(UserRow)`
  & {
    display: flex;
    justify-content: space-between;
    margin-bottom: 1rem;
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

const RecipeStats = ({ category, serves, prepTime, cookTime, totalTime }) => {
  return (
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
        <div style={{ margin: '1rem 3rem 0 0' }}>
          <StyledUserRow {...recipe} loggedUser={loggedUser} />
          <RecipeStats {...recipe} />
        </div>
      </TopContainer>
      <BottomContainer>
        <Ingredients {...recipe} />
        <Instructions {...recipe} />
      </BottomContainer>
    </StyledContainer>
  );
};

export default RecipePage;
