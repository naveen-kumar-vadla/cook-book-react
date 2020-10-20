import React from 'react';
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

const ProfileImage = ({ imageUrl, name, className }) => (
  <div className={className}>
    {imageUrl ? (
      <img src={imageUrl} alt={name} />
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
    margin-right: 1rem;
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

export {
  StyledContainer,
  TopContainer,
  BottomContainer,
  PageHeader,
  InfoTable,
  StyledInfoItem,
  MiniProfileImage,
  BigProfileImage,
};
