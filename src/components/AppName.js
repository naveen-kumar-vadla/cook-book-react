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
  & h3 {
    display: flex;
  }
  & h3 > div {
    position: relative;
    height: 3rem;
    width: 3rem;
    border: 1px solid #ffffff;
    border-radius: 50%;
    margin-right: 1rem;
    overflow: hidden;
  }
  & h3 > div > img {
    width: 100%;
    height: 100%;
  }
  & h3 > div > span {
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

  & .dropup {
    position: relative;
    display: inline-block;
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

  & .dropup:hover .dropup-content {
    display: block;
  }

  & .dropup:hover .dropbtn {
    background-color: #2980b9;
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
      <div className='dropup'>
        <h3 className='dropupbtn'>
          <div>
            {user.imageUrl ? (
              <img src={user.imageUrl} alt={user.username}></img>
            ) : (
              <span>{extractInitials(user.name)}</span>
            )}
          </div>
        </h3>
        <div class='dropup-content'>
          <Link to={`/profile/${user.username}`}>Profile</Link>
          <a href='http://localhost:7000/api/logout'>Logout</a>
        </div>
      </div>
    </Heading>
  );
};

export default AppName;
