import { Box, Flex, Heading, StackDivider, VStack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';

import students from '../api/students';
import Teacher from '../components/Teacher';
import useAuth from '../hooks/useAuth';

const TeachersPage = () => {
  const [teachers, setTeachers] = useState([]);

  const auth = useAuth();

  useEffect(() => {
    students.getStudentTeachers(auth.user.id).then((teachersData) => {
      setTeachers(teachersData);
    });
  }, [auth.user.id]);

  return (
    <Flex direction='column' alignItems='flex-start'>
      <Heading>Репетиторы</Heading>
      <Box marginTop='80px' w='100%'>
        <VStack w='100%' divider={<StackDivider />}>
          {teachers.map((teacher) => (
            <Teacher key={teacher.id} teacher={teacher} />
          ))}
        </VStack>
      </Box>
    </Flex>
  );
};

export default TeachersPage;
