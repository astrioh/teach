import { Avatar, HStack, Icon, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import { BsBoxArrowRight } from 'react-icons/bs';
import { COLORS } from '../../constants';
import useAuth from '../../hooks/useAuth';

const UserPanel = () => {
  const auth = useAuth();
  const handleSignOut = () => {
    auth.signOut();
  };

  return (
    <HStack width='100%' spacing='10px' justifyContent='flex-start'>
      <Avatar size='md' name={auth.user.fullName} />
      <VStack alignItems='flex-start' flex='1'>
        <Text width='215px' size='sm' isTruncated color='white'>
          {auth.user.fullName}
        </Text>
        <span style={{ fontSize: '16px', color: COLORS.GRAY, margin: 0 }}>
          #{auth.user.id}
        </span>
      </VStack>
      <Icon
        w='24px'
        h='24px'
        color='white'
        cursor='pointer'
        as={BsBoxArrowRight}
        onClick={handleSignOut}
      />
    </HStack>
  );
};

export default UserPanel;
