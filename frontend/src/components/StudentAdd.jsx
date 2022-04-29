import { Button } from '@chakra-ui/react';
import React, { useState } from 'react';
import { COLORS } from '../constants';
import User from './Users/User';

const StudentAdd = ({ student, addStudent }) => {
  const [isLoading, setIsLoading] = useState(false);

  const addStudentHandler = () => {
    setIsLoading(true);

    addStudent(student.id).catch(() => {
      setIsLoading(false);
    });
  };

  return (
    <User
      name={student.fullName}
      controls={
        <Button
          colorScheme={COLORS.DEFAULT_COLOR_SCHEME}
          variant='outline'
          w='180px'
          h='38px'
          onClick={addStudentHandler}
          isLoading={isLoading}
        >
          Добавить
        </Button>
      }
    />
  );
};

export default StudentAdd;
