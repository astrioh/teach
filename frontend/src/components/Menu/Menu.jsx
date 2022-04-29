import { Box, Flex, VStack } from '@chakra-ui/react';
import React from 'react';
import Navbar from './Navbar';
import UserPanel from './UserPanel';

const Menu = () => {
  return (
    <Flex
      flexDirection='column'
      minWidth='385px'
      p='30px 20px'
      alignItems='flex-start'
      height='100%'
      backgroundColor='#1A202C'
    >
      <UserPanel />
      <Box marginTop='70px' w='100%'>
        <Navbar />
      </Box>
    </Flex>
  );
};

export default Menu;
