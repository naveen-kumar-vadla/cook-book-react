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
  BigProfileImage,
} from './styledComponents.js';

const BigStyledInfoItem = styled(StyledInfoItem)`
  & .header {
    font-size: 2rem;
  }
  & > span {
    font-size: 1.5rem;
  }
`;

const ProfileInfo = ({ name, username }) => {
  return (
    <InfoTable>
      <BigStyledInfoItem
        header='Username : '
        value={username}
      ></BigStyledInfoItem>
      <BigStyledInfoItem header='Name : ' value={name}></BigStyledInfoItem>
    </InfoTable>
  );
};

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
        <BigProfileImage {...user} />
        <ProfileInfo {...user} />
      </TopContainer>
      <PageHeader>Recipes</PageHeader>
      <Recipes recipes={user.recipes} />
    </StyledContainer>
  );
};

export default ProfilePage;
