import {
  Button,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import moment from 'moment';
import React from 'react';
import { Link } from 'react-router-dom';
import { COLORS, DEFAULT_DATE_FORMAT } from '../constants';

const LessonTable = ({ lessons }) => {
  return (
    <TableContainer w='100%'>
      <Table size='lg' variant='simple'>
        <Thead>
          <Tr>
            <Th>Название</Th>
            <Th>Количество участников</Th>
            <Th>Дата</Th>
            <Th>Время</Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          {lessons.map((lesson) => {
            const startTime = moment(lesson.startTime);
            const endTime = moment(lesson.endTime);
            const didStart =
              moment().isSameOrAfter(startTime) &&
              moment().isSameOrBefore(endTime);

            return (
              <Tr key={lesson.id}>
                <Td>{lesson.name}</Td>
                <Td>{lesson.students.length}</Td>
                <Td>{moment(lesson.date).format(DEFAULT_DATE_FORMAT)}</Td>
                <Td>
                  {startTime.format('HH:mm')} &#8211; {endTime.format('HH:mm')}
                </Td>
                <Td>
                  {didStart && (
                    <Link to={`/room/${lesson.id}`}>
                      <Button colorScheme={COLORS.DEFAULT_COLOR_SCHEME}>
                        Подключиться
                      </Button>
                    </Link>
                  )}
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default LessonTable;
