import { Box, HStack } from '@chakra-ui/react';
import React from 'react';
import { Outlet } from 'react-router-dom';
import Menu from './Menu/Menu';

const PageLayout = () => {
  return (
    <HStack height='100vh' align='top'>
      <Menu />
      <Box p='50px 120px' w='100%' h='100%'>
        <Outlet />
      </Box>
    </HStack>
  );
};

export default PageLayout;
