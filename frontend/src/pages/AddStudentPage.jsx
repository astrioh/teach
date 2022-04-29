import { Box, Flex, Heading, StackDivider, VStack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import SearchBar from '../components/SearchBar';

import studentsApi from '../api/students';
import teachersApi from '../api/teachers';
import useAuth from '../hooks/useAuth';
import StudentAdd from '../components/StudentAdd';

const AddStudentPage = () => {
  const [students, setStudents] = useState([]);

  const auth = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    studentsApi.getAllStudents().then((studentsData) => {
      setStudents(studentsData);
    });
  }, []);

  const addStudent = (studentId) => {
    return teachersApi.addStudent(studentId, auth.user.id).then(() => {
      navigate('/students');
    });
  };

  return (
    <Flex direction='column' alignItems='flex-start'>
      <Heading>Добавить ученика</Heading>
      <Flex justifyContent='space-between' marginTop='30px' width='100%'>
        <Box width='510px'>
          <SearchBar />
        </Box>
      </Flex>

      <Box marginTop='80px' w='100%'>
        <VStack w='100%' divider={<StackDivider />}>
          {students.map((student) => (
            <StudentAdd
              key={student.id}
              student={student}
              addStudent={addStudent}
            />
          ))}
        </VStack>
      </Box>
    </Flex>
  );
};

export default AddStudentPage;
