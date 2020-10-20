import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import Recipes from './Recipes.js';
import RecipeAPI from './RecipeAPI.js';
import BlankPageWithMessage from './BlankPageWithMessage.js';
import {
  StyledContainer,
  TopContainer,
  PageHeader,
  InfoTable,
  StyledInfoItem,
} from './styledComponents.js';
import { extractInitials } from './helperFunctions.js';

const UserImage = styled.div`
  & {
    position: relative;
    height: 20rem;
    width: 20rem;
    border: 1px solid #ffffff;
    border-radius: 100%;
    margin-right: 1rem;
    overflow: hidden;
  }
  & > img {
    width: 100%;
    height: 100%;
  }
  & > span {
    color: #ffffff;
    text-align: center;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 10vh;
  }
`;

const ProfileInfo = ({ name, username }) => {
  return (
    <InfoTable>
      <StyledInfoItem header='Username : ' value={username}></StyledInfoItem>
      <StyledInfoItem header='Name : ' value={name}></StyledInfoItem>
    </InfoTable>
  );
};

const ProfileImage = ({ imageUrl, name }) => (
  <UserImage>
    {imageUrl ? (
      <img src={imageUrl} alt={name} />
    ) : (
      <span>{extractInitials(name)}</span>
    )}
  </UserImage>
);

const ProfilePage = () => {
  const { username } = useParams();
  const [user, setUser] = useState(null);
  useEffect(() => {
    RecipeAPI.fetchUserProfile(username).then(setUser);
  }, [username]);
  if (user == null) return <BlankPageWithMessage message='Loading ...' />;
  if (!user.username) return <BlankPageWithMessage message='User Not Found' />;
  return (
    <StyledContainer>
      <TopContainer>
        <ProfileImage {...user} />
        <ProfileInfo {...user} />
      </TopContainer>
      <PageHeader>Recipes</PageHeader>
      <Recipes recipes={user.recipes} />
    </StyledContainer>
  );
};

export default ProfilePage;
