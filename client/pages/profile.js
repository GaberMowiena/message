import React from 'react';
import styled from 'styled-components';

import AuthNav from '../components/AuthNav/AuthNav';
import Profile from '../components/Profile/Profile';

const ProfilePageWrapper = styled.div`
  height: 100%;
  width: 100%;
`;
const ProfilePage = () => {
  return (
    <ProfilePageWrapper>
      <AuthNav />
      <Profile />
    </ProfilePageWrapper>
  );
};

export default ProfilePage;
