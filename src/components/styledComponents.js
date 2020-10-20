import React from 'react';
import styled from 'styled-components';

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

export {
  StyledContainer,
  TopContainer,
  BottomContainer,
  PageHeader,
  InfoTable,
  StyledInfoItem,
};
