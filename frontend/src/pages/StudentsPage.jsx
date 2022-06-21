import {
  Box,
  Button,
  Flex,
  Heading,
  StackDivider,
  VStack,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';

import SearchBar from '../components/SearchBar';

import teachersApi from '../api/teachers';
import useAuth from '../hooks/useAuth';
import { COLORS } from '../constants';
import { useNavigate } from 'react-router-dom';
import Student from '../components/Student';

const StudentsPage = () => {
  const [students, setStudents] = useState([]);

  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    teachersApi.getTeachersStudents(auth.user.id).then((studentsData) => {
      setStudents(studentsData);
    });
  }, [auth.user.id]);

  return (
    <Flex direction='column' alignItems='flex-start'>
      <Heading>Ученики</Heading>
      <Flex justifyContent='space-between' marginTop='30px' width='100%'>
        <Box width='510px'>
          <SearchBar placeholder='Введите ФИО или номер ученика' />
        </Box>
        <Button
          colorScheme={COLORS.DEFAULT_COLOR_SCHEME}
          color='white'
          onClick={() => navigate('/students/add-student')}
        >
          Добавить ученика
        </Button>
      </Flex>

      <Box marginTop='80px' w='100%'>
        <VStack w='100%' divider={<StackDivider />}>
          {students.map((student) => (
            <Student key={student.id} student={student} />
          ))}
        </VStack>
      </Box>
    </Flex>
  );
};

export default StudentsPage;
