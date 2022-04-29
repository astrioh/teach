import { Avatar, Flex } from '@chakra-ui/react';
import React from 'react';

const User = ({ name, image, controls }) => {
  return (
    <Flex
      direction='row'
      justifyContent='space-between'
      alignItems='center'
      w='100%'
      role='group'
    >
      <Flex direction='row' alignItems='center'>
        <Avatar size='lg' name={name} marginRight='30px' />
        <span style={{ fontWeight: '500', fontSize: '18px' }}>{name}</span>
      </Flex>
      {controls}
    </Flex>
  );
};

export default User;
