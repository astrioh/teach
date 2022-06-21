import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Radio,
  RadioGroup,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TimePicker from 'react-time-picker';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import lessonsApi from '../api/lessons';
import useAuth from '../hooks/useAuth';
import { COLORS, LESSON_RECURRENCE } from '../constants';
import AddLessonStudents from '../components/AddLessonStudents';
import BackButton from '../components/BackButton';

const CreateLessonPage = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  const [inputs, setInputs] = useState({
    name: '',
    date: new Date(),
    startTime: moment().toDate(),
    endTime: moment().add(1, 'hour').toDate(),
    students: [],
    recurrence: LESSON_RECURRENCE.NO_RECURRENCE,
    recurrenceDate: moment().add(1, 'week').toDate(),
  });

  const createLessonHandler = (event) => {
    event.preventDefault();
    const studentIds = inputs.students.map((student) => student.id);
    lessonsApi
      .createLesson({
        name: inputs.name,
        date: inputs.date.toISOString(),
        startTime: inputs.startTime.toISOString(),
        endTime: inputs.endTime.toISOString(),
        students: studentIds,
        userId: auth.user.id,
      })
      .then(() => navigate('/lessons'));
  };

  const handleInputChange = (event) => {
    setInputs((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const handleTimeChange = (fieldName, value) => {
    setInputs((prevState) => ({
      ...prevState,
      [fieldName]: moment(
        prevState.date.toISOString().split('T')[0] + ' ' + value,
      ).toDate(),
    }));
  };

  const handleComponentInputChange = (name, value) => {
    setInputs((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const addStudentsToLesson = (studentsToAdd) => {
    setInputs((prevState) => ({
      ...prevState,
      students: studentsToAdd,
    }));
  };

  return (
    <Flex direction='column' alignItems='flex-start'>
      <HStack spacing='15px'>
        <BackButton to='/' />
        <Heading>Создание занятия</Heading>
      </HStack>

      <Box marginTop='50px' w='400px'>
        <form onSubmit={createLessonHandler}>
          <FormControl>
            <FormLabel htmlFor='name'>Название</FormLabel>
            <Input
              id='name'
              name='name'
              type='text'
              required
              value={inputs.email}
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl mt='16px'>
            <FormLabel htmlFor='date'>Дата проведения</FormLabel>
            <DatePicker
              id='date'
              name='date'
              required
              selected={inputs.date}
              dateFormat='dd.MM.yyyy'
              customInput={<Input />}
              onChange={(value) => handleComponentInputChange('date', value)}
            />
          </FormControl>
          <FormControl mt='16px'>
            <FormLabel htmlFor='startTime'>Время</FormLabel>
            <TimePicker
              id='startTime'
              name='startTime'
              required
              value={inputs.startTime}
              disableClock
              format='HH:mm'
              style={{
                border: '1px solid black',
                borderRadius: '5px',
              }}
              onChange={(value) => handleTimeChange('startTime', value)}
            />{' '}
            &#8211;{' '}
            <TimePicker
              id='endTime'
              name='endTime'
              required
              value={inputs.endTime}
              disableClock
              format='HH:mm'
              style={{
                border: '1px solid black',
                padding: '5px 16px',
                height: '40px',
                borderRadius: '5px',
              }}
              onChange={(value) => handleTimeChange('endTime', value)}
            />
          </FormControl>
          <FormControl mt='16px'>
            <FormLabel htmlFor='date'>Ученики</FormLabel>
            <AddLessonStudents
              addedStudents={inputs.students}
              addStudentsToLesson={addStudentsToLesson}
            />
          </FormControl>
          <FormControl mt='16px'>
            <FormLabel htmlFor='date'>Повторение</FormLabel>
            <RadioGroup
              colorScheme={COLORS.DEFAULT_COLOR_SCHEME}
              onChange={(value) => {
                setInputs((prevState) => ({
                  ...prevState,
                  recurrence: Number.parseInt(value),
                }));
              }}
              value={inputs.recurrence}
            >
              <HStack spacing='15px'>
                <Radio value={LESSON_RECURRENCE.NO_RECURRENCE}>
                  Не повторяется
                </Radio>
                <Radio value={LESSON_RECURRENCE.EVERY_WEEK}>
                  Каждую неделю
                </Radio>
              </HStack>
            </RadioGroup>
          </FormControl>
          {inputs.recurrence === LESSON_RECURRENCE.EVERY_WEEK && (
            <>
              <FormControl mt='16px'>
                <FormLabel htmlFor='recurrenceDate'>Интервал</FormLabel>
                <DatePicker
                  id='recurrenceDate'
                  name='recurrenceDate'
                  required
                  selected={inputs.recurrenceDate}
                  dateFormat='dd.MM.yyyy'
                  customInput={<Input />}
                  onChange={(value) =>
                    handleComponentInputChange('recurrenceDate', value)
                  }
                />
              </FormControl>
              <FormControl mt='16px'>
                <FormLabel htmlFor='recurrenceDate'>
                  Повторять каждую неделю до
                </FormLabel>
                <DatePicker
                  id='recurrenceDate'
                  name='recurrenceDate'
                  required
                  selected={inputs.recurrenceDate}
                  dateFormat='dd.MM.yyyy'
                  customInput={<Input />}
                  onChange={(value) =>
                    handleComponentInputChange('recurrenceDate', value)
                  }
                />
              </FormControl>
            </>
          )}
          <Button
            colorScheme={COLORS.DEFAULT_COLOR_SCHEME}
            mt='50px'
            type='submit'
          >
            Создать
          </Button>
        </form>
      </Box>
    </Flex>
  );
};

export default CreateLessonPage;
