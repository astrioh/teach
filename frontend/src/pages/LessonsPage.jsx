import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  StackDivider,
  VStack,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';

import SearchBar from '../components/SearchBar';

import lessonsApi from '../api/lessons';
import useAuth from '../hooks/useAuth';
import { COLORS, ROLES } from '../constants';
import { useNavigate } from 'react-router-dom';
import LessonTable from '../components/LessonTable';

const LessonsPage = () => {
  const [lessons, setLessons] = useState([]);

  const auth = useAuth();
  const navigate = useNavigate();

  const role = auth.user.role.id;

  useEffect(() => {
    if (role === ROLES.TEACHER) {
      lessonsApi.getTeacherLessons(auth.user.id).then((lessonsData) => {
        setLessons(lessonsData);
      });
    } else {
      lessonsApi.getStudentsLessons(auth.user.id).then((lessonsData) => {
        setLessons(lessonsData);
      });
    }
  }, [auth.user, role]);

  return (
    <Flex direction='column' alignItems='flex-start'>
      <Heading>Занятия</Heading>
      <Flex justifyContent='space-between' marginTop='30px' width='100%'>
        <Box width='510px'>
          <SearchBar placeholder='Введите название занятия' />
        </Box>
        {role === ROLES.TEACHER && (
          <HStack spacing='20px'>
            <Button
              colorScheme={COLORS.DEFAULT_COLOR_SCHEME}
              variant='outline'
              onClick={alert.bind(null, 'Занятие начинается...')}
            >
              Провести сейчас
            </Button>
            <Button
              colorScheme={COLORS.DEFAULT_COLOR_SCHEME}
              color='white'
              onClick={() => navigate('/lessons/create')}
            >
              Запланировать
            </Button>
          </HStack>
        )}
      </Flex>

      <Box marginTop='80px' w='100%'>
        <LessonTable lessons={lessons} />
      </Box>
    </Flex>
  );
};

export default LessonsPage;
