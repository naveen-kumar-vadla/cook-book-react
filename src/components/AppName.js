import React, { useState, useEffect } from 'react';

import styled from 'styled-components';
import { Link } from 'react-router-dom';

import RecipeAPI from './RecipeAPI.js';
import { MiniProfileImage } from './styledComponents.js';

const AppNameContainer = styled.div`
  border-bottom: 1px solid white;
  display: flex;
  justify-content: space-between;
`;

const Header = styled.h1`
  & {
    margin: 1rem 0rem 1rem 3rem;
  }
  & > a {
    color: #ffffff;
    text-decoration: none;
  }
`;

const LogInLink = ({ className }) => (
  <h4 className={className}>
    <a href='http://localhost:7000/api/signin'>Log In</a>
  </h4>
);

const StyledLogInLink = styled(LogInLink)`
  & {
    margin: 2rem;
  }
  & > a {
    color: #ffffff;
    text-decoration: none;
  }
`;

const UserOptions = ({ user, className }) => (
  <div className={`dropup ${className}`}>
    <div className='dropupbtn'>
      <MiniProfileImage {...user} />
    </div>
    <div className='dropup-content'>
      <Link to={`/profile/${user.username}`}>Profile</Link>
      <Link to='/collection'>Collection</Link>
      <a href='http://localhost:7000/api/logout'>Logout</a>
    </div>
  </div>
);

const StyledUserOptions = styled(UserOptions)`
  & {
    position: relative;
    display: inline-block;
  }
  & .dropupbtn {
    margin: 1rem;
  }
  & .dropup-content {
    display: none;
    position: absolute;
    background-color: #f1f1f1;
    top: 7vh;
    z-index: 1;
    right: 1vh;
  }
  & .dropup-content a {
    color: black;
    padding: 12px 16px;
    text-decoration: none;
    display: block;
  }
  & .dropup-content a:hover {
    background-color: #ccc;
  }
  &:hover .dropup-content {
    display: block;
  }
  &:hover .dropbtn {
    background-color: #2980b9;
  }
`;

const AppName = () => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    RecipeAPI.fetchUser().then(setUser);
  }, []);
  return (
    <AppNameContainer>
      <Header>
        <Link to='/'>Cook Book</Link>
      </Header>
      {user == null || !user.id ? (
        <StyledLogInLink />
      ) : (
        <StyledUserOptions user={user} />
      )}
    </AppNameContainer>
  );
};

export default AppName;
