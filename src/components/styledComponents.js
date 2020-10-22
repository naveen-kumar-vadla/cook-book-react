import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { extractInitials } from './helperFunctions.js';

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
`;

const BottomContainer = styled.div`
  background-color: white;
  padding: 3rem;
  height: 50%;
  display: flex;
  margin: 3rem;
`;

const PageHeader = styled.h1`
  text-align: center;
  color: #000000;
  margin: 0;
  text-transform: uppercase;
  background-color: #ffffff;
`;

const InfoTable = styled.div`
  width: 35vw;
  padding: 2rem;
  background-color: white;
`;

const InfoItem = ({ header, value, className }) => (
  <div className={className}>
    <span className='header'>{header}</span>
    <span>{value}</span>
  </div>
);

const StyledInfoItem = styled(InfoItem)`
  & {
    margin: 2.5%;
    border-bottom: 1px solid #dddddd;
    padding-bottom: 1%;
  }
  & .header {
    font-weight: bold;
    text-align: left;
  }
  & > span {
    text-align: left;
    text-transform: capitalize;
  }
`;

const ProfileImage = ({ profilePicUrl, name, className }) => (
  <div className={className}>
    {profilePicUrl ? (
      <img src={profilePicUrl} alt={name} />
    ) : (
      <span>{extractInitials(name)}</span>
    )}
  </div>
);

const MiniProfileImage = styled(ProfileImage)`
  & {
    position: relative;
    height: 3rem;
    width: 3rem;
    border: 1px solid #ffffff;
    border-radius: 100%;
    margin: 0 1rem;
    overflow: hidden;
    background-color: gray;
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
  }
`;

const BigProfileImage = styled(MiniProfileImage)`
  & {
    height: 15rem;
    width: 15rem;
  }
  & > span {
    font-size: 7rem;
  }
`;

const UserInfo = ({ className, isOnLeft, ...user }) => {
  const userName = (
    <Link to={`/profile/${user.username}`}>
      <span>{user.username}</span>
    </Link>
  );
  return (
    <div className={className}>
      {isOnLeft ? userName : <></>}
      <MiniProfileImage {...user} />
      {!isOnLeft ? userName : <></>}
    </div>
  );
};

const UserNameWithMiniProfilepic = styled(UserInfo)`
  & {
    display: flex;
  }
  & > a {
    margin: 1rem 0rem;
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

export {
  StyledContainer,
  TopContainer,
  BottomContainer,
  PageHeader,
  InfoTable,
  StyledInfoItem,
  MiniProfileImage,
  BigProfileImage,
  UserNameWithMiniProfilepic,
};
