import { VStack } from '@chakra-ui/react';
import React from 'react';

const UserList = ({ users }) => {
  return <VStack w='100%'>{users.map((user) => {})}</VStack>;
};

export default UserList;
