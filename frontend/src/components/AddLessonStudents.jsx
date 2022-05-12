import {
  Avatar,
  Button,
  Checkbox,
  Flex,
  HStack,
  Icon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { BiPlus } from 'react-icons/bi';
import students from '../api/students';
import { COLORS } from '../constants';
import CircleCheckbox from './CircleCheckbox';

const AddLessonStudents = ({ addedStudents, addStudentsToLesson }) => {
  const [studentsToAdd, setStudentsToAdd] = useState([]);

  useEffect(() => {
    students.getAllStudents().then((studentsData) => {
      studentsData.forEach((studentData) => {
        let checked = false;

        for (const addedStudent of addedStudents) {
          if (addedStudent.id === studentData.id) {
            checked = true;
            break;
          }
        }
        studentData.checked = checked;
      });
      setStudentsToAdd(studentsData);
    });
  }, []);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleStudentSelection = (studentToAdd, index) => {
    let selectedStudent = {
      ...studentToAdd,
      checked: !studentToAdd.checked,
    };
    let newStudentsToAdd = [...studentsToAdd];
    newStudentsToAdd[index] = selectedStudent;
    setStudentsToAdd(newStudentsToAdd);
  };

  const addStudentsHandler = () => {
    addStudentsToLesson(studentsToAdd.filter((student) => student.checked));
    onClose();
  };

  return (
    <>
      <VStack alignItems='flex-start'>
        {addedStudents.map((student) => (
          <Flex key={student.id} alignItems='center'>
            <Avatar size='md' marginRight='15px' name={student.fullName} />
            <span style={{ fontWeight: 500 }}>{student.fullName}</span>
          </Flex>
        ))}
      </VStack>
      <Flex
        marginTop='10px'
        alignItems='center'
        color={COLORS.DEFAULT_COLOR_SCHEME}
        fontWeight='500'
        onClick={onOpen}
        cursor='pointer'
      >
        <Icon as={BiPlus} w='18px' h='18px' marginRight='5px' />
        Добавить
      </Flex>

      <Modal isOpen={isOpen} onClose={onClose} isCentered size='xl'>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Добавить ученика</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack alignItems='flex-start' spacing='10px'>
              {studentsToAdd.map((studentToAdd, index) => (
                <HStack
                  key={studentToAdd.id}
                  spacing='15px'
                  alignItems='center'
                  justifyContent='flex-start'
                >
                  <Checkbox
                    size='lg'
                    checked={studentToAdd.checked}
                    onChange={handleStudentSelection.bind(
                      null,
                      studentToAdd,
                      index,
                    )}
                  />
                  <Avatar name={studentToAdd.fullName} />
                  <span style={{ fontWeight: 500 }}>
                    {studentToAdd.fullName}
                  </span>
                </HStack>
              ))}
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme={COLORS.DEFAULT_COLOR_SCHEME}
              mr={3}
              onClick={addStudentsHandler}
            >
              Добавить
            </Button>
            <Button variant='ghost' onClick={onClose}>
              Отменить
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddLessonStudents;
