import { HStack, Icon, Input } from '@chakra-ui/react';
import React from 'react';
import { BiSearch } from 'react-icons/bi';

const SearchBar = () => {
  return (
    <HStack justifyContent={'flex-start'} width='100%'>
      <Input
        placeholder='Введите ФИО или номер репетитора'
        marginRight='10px'
      />
      <Icon as={BiSearch} w={30} h={30} cursor='pointer' />
    </HStack>
  );
};

export default SearchBar;
