import { Flex, IconButton } from '@chakra-ui/react';
import React, { useState } from 'react';
import { IoTrashOutline } from 'react-icons/io5';
import User from './Users/User';

const Teacher = ({ teacher, deleteTeacher }) => {
  const [isLoading, setIsLoading] = useState(false);

  const deleteTeacherHandler = () => {
    setIsLoading(true);
  };

  return (
    <User
      name={teacher.fullName}
      controls={
        <Flex
          direction='row'
          alignItems='center'
          display='none'
          transition='all 0.5s ease-in'
          _groupHover={{ display: 'block' }}
        >
          <IconButton
            display='contents'
            w='30px'
            h='30px'
            color='black'
            isDisabled={isLoading}
            cursor='pointer'
            _hover={{ color: 'red' }}
            onClick={deleteTeacherHandler}
            icon={<IoTrashOutline />}
          />
        </Flex>
      }
    />
  );
};

export default Teacher;
