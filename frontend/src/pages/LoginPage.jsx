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
      <Box
        p='35px 120px'
        width={640}
        bgColor='#fff'
        borderRadius='5px'
        boxShadow={
          '0px 1px 3px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.06)'
        }
      >
        <Box textAlign='center'>
          <Heading fontSize='30px'>Вход в Teach</Heading>
        </Box>
        <Box my={4} marginTop='35px' w='100%'>
          <LoginForm />
        </Box>
      </Box>
    </Flex>
  );
};

export default LoginPage;
