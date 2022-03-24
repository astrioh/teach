import { Box, Heading } from '@chakra-ui/react';
import React from 'react';
import useAuth from '../hooks/useAuth';

const ProfilePage = () => {
  const auth = useAuth();
  const currentUser = auth.user;

  return (
    <Box textAlign='center'>
      <Heading>{currentUser.username}</Heading>
      <p>
        <strong>Token:</strong> {currentUser.accessToken.substring(0, 20)} ...{' '}
        {currentUser.accessToken.substr(currentUser.accessToken.length - 20)}
      </p>
      <p>
        <strong>Id:</strong> {currentUser.id}
      </p>
      <p>
        <strong>Email:</strong> {currentUser.email}
      </p>
      <strong>Authorities:</strong>
      <ul>
        {currentUser.roles &&
          currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
      </ul>
    </Box>
  );
};

export default ProfilePage;
