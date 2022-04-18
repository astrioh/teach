import { Box, Flex, Heading, VStack } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import { API_URL } from '../constants';

const TeachersPage = () => {
  useEffect(() => {
    axios.get(API_URL + '');
  }, []);

  return (
    <Flex direction='column' alignItems='flex-start'>
      <Heading>Репетиторы</Heading>
      {/* <Box width='510px' marginTop='30px'>
        <SearchBar />
      </Box> */}
    </Flex>
  );
};

export default TeachersPage;
