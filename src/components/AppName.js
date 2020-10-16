import React, { useState, useEffect } from 'react';

import styled from 'styled-components';
import { Link } from 'react-router-dom';

import RecipeAPI from './RecipeAPI.js';

const Heading = styled.div`
  & {
    border-bottom: 1px solid white;
    display: flex;
    justify-content: space-between;
  }
  & > h1 {
    margin: 1rem 0rem 1rem 3rem;
  }
  & > h3 {
    display: flex;
  }
  & > h3 > a {
    position: relative;
    height: 3rem;
    width: 3rem;
    border: 1px solid #ffffff;
    border-radius: 50%;
    margin-right: 1rem;
    overflow: hidden;
  }
  & > h3 > a > img {
    width: 100%;
    height: 100%;
  }
  & > h3 > a > span {
    color: #ffffff;
    text-align: center;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  & > h1 > a,
  & > h4 > a {
    color: #ffffff;
    text-decoration: none;
  }
  & > h4 > a {
    margin: 2rem;
  }
`;

const extractInitials = function (name) {
  const firstLetterIdx = 0;
  const [firstName, secondName] = name.split(' ');
  const firstLetter = firstName[firstLetterIdx];
  const profileName = secondName
    ? firstLetter + secondName[firstLetterIdx]
    : firstLetter;
  return profileName.toUpperCase();
};

const AppName = () => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    RecipeAPI.fetchUser().then(setUser);
  }, []);
  if (user == null || !user.id) {
    return (
      <Heading>
        <h1>
          <Link to='/'>Cook Book</Link>
        </h1>
        <h4>
          <a href='http://localhost:7000/api/signin'>Sign In</a>
        </h4>
      </Heading>
    );
  }
  return (
    <Heading>
      <h1>
        <Link to='/'>Cook Book</Link>
      </h1>
      <h3>
        <Link to={`/profile/${user.username}`}>
          {user.imageUrl ? (
            <img src={user.imageUrl} alt={user.username}></img>
          ) : (
            <span>{extractInitials(user.name)}</span>
          )}
        </Link>
      </h3>
    </Heading>
  );
};

export default AppName;
