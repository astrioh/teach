import { Box, HStack, IconButton } from '@chakra-ui/react';
import { IoTrashOutline, IoDocumentOutline } from 'react-icons/io5';
import React, { useState } from 'react';

import { COLORS } from '../constants';
import User from './Users/User';

const Student = ({ student, deleteStudent }) => {
  const [isAddingMemo, setIsAddingMemo] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const addMemoHandler = () => {
    setIsAddingMemo(true);
  };
  const deleteStudentHandler = () => {
    setIsDeleting(true);
  };

  return (
    <User
      name={student.fullName}
      controls={
        <HStack
          spacing='10px'
          alignItems='center'
          display='none'
          transition='all 0.5s ease-in'
          _groupHover={{ display: 'flex' }}
        >
          <Box>
            <IconButton
              display='contents'
              fontSize='30px'
              marginRight='10px'
              color='black'
              cursor='pointer'
              isDisabled={isAddingMemo}
              _hover={{ color: COLORS.DEFAULT_COLOR_SCHEME }}
              variant='unstyled'
              icon={<IoDocumentOutline />}
            />
          </Box>

          <Box>
            <IconButton
              display='contents'
              fontSize='30px'
              color='black'
              cursor='pointer'
              isDisabled={isDeleting}
              _hover={{ color: 'red' }}
              onClick={deleteStudentHandler}
              icon={<IoTrashOutline />}
            />
          </Box>
        </HStack>
      }
    />
  );
};

export default Student;
