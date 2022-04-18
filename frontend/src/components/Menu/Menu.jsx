import { VStack } from '@chakra-ui/react';
import React from 'react';
import UserPanel from './UserPanel';

const Menu = () => {
  return (
    <VStack
      minWidth='385px'
      p='30px 20px'
      alignItems='flex-start'
      height='100%'
      backgroundColor='#1A202C'
    >
      <UserPanel />
    </VStack>
  );
};

export default Menu;
