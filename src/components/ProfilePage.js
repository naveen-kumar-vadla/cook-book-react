import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import Recipes from './Recipes.js';
import RecipeAPI from './RecipeAPI.js';
import BlankPageWithMessage from './BlankPageWithMessage.js';

const StyledContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-flow: column wrap;
`;

const TopContainer = styled.div`
  padding: 3rem;
  height: 40%;
  display: flex;
  justify-content: space-around;
  background-color: #222324;
  border-bottom: 1px solid #ffffff;
`;

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

const InfoTable = styled.div`
  width: 35vw;
  padding: 2rem;
  background-color: white;
`;

const StyledInfoItem = styled.div`
  & {
    margin: 2.5%;
    border-bottom: 1px solid #dddddd;
    padding-bottom: 1%;
  }
  & > h4 {
    font-weight: bold;
    text-align: left;
    font-size: 1.7rem;
  }
  & > span {
    text-align: left;
    font-size: 1.5rem;
    text-transform: capitalize;
  }
`;

const RecipesHeader = styled.h1`
  text-align: center;
  color: #000000;
  margin: 0;
  margin-top: 1rem;
  text-transform: uppercase;
  background-color: #ffffff;
  width: 30vw;
  align-self: center;
`;

const InfoItem = ({ header, value }) => (
  <StyledInfoItem>
    <h4>{header}</h4>
    <span>{value}</span>
  </StyledInfoItem>
);

const ProfileInfo = ({ name, username }) => {
  return (
    <InfoTable>
      <InfoItem header='Username : ' value={username}></InfoItem>
      <InfoItem header='Name : ' value={name}></InfoItem>
    </InfoTable>
  );
};

const extractInitials = function (name) {
  const firstLetterIdx = 0;
  const [firstName, secondName] = name.split(' ');
  const firstLetter = firstName[firstLetterIdx];
  const profileName = secondName
    ? firstLetter + secondName[firstLetterIdx]
    : firstLetter;
  return profileName.toUpperCase();
};

const ProfilePage = () => {
  const { username } = useParams();
  const [user, setUser] = useState(null);
  useEffect(() => {
    RecipeAPI.fetchUserProfile(username).then(setUser);
  }, [username]);
  console.log('user', user);
  if (user == null) return <BlankPageWithMessage message='Loading ...' />;
  if (!user.username) return <BlankPageWithMessage message='User Not Found' />;
  return (
    <StyledContainer>
      <TopContainer>
        <UserImage>
          {user.imageUrl ? (
            <img src={user.imageUrl} alt={user.username} />
          ) : (
            <span>{extractInitials(user.name)}</span>
          )}
        </UserImage>
        <ProfileInfo {...user} />
      </TopContainer>
      <RecipesHeader>Recipes</RecipesHeader>
      <Recipes recipes={user.recipes} />
    </StyledContainer>
  );
};

export default ProfilePage;
