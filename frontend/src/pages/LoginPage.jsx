import React from 'react';
import { Heading, Flex, Box } from '@chakra-ui/react';

import LoginForm from '../components/LoginForm';

const LoginPage = () => {
  return (
    <Flex
      width='100%'
      height='100%'
      align='center'
      justifyContent='center'
      bgColor='#EDF2F7'
    >
      <Box p={2} width={640} height={492} bgColor='#fff'>
        <Box textAlign='center'>
          <Heading>Вход в Teach</Heading>
        </Box>
        <Box my={4} textAlign='left'>
          <LoginForm />
        </Box>
      </Box>
    </Flex>
  );
};

export default LoginPage;
