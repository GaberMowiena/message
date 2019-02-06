import React from 'react';
import styled from 'styled-components';
import Card from '../Card/Card';

const ProfileStyle = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  /* grid-template-rows: 1fr 1fr; */
  grid-gap: 60px;
  width: 100%;
  height: calc(100% - 50px);
`;

const Profile = () => {
  return (
    <ProfileStyle>
      <Card />
      <Card />
      <Card />
      <Card />
    </ProfileStyle>
  );
};

export default Profile;
