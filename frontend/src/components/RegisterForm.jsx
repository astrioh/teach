import React from 'react';
import { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Text,
  Button,
  Input,
  Textarea,
  RadioGroup,
  Stack,
  Radio,
  Link,
} from '@chakra-ui/react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

import { COLORS, ROLES } from '../constants';
import useAuth from '../hooks/useAuth';

const RegisterForm = () => {
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
    repeatPassword: '',
    fullName: '',
    bio: '',
    role: ROLES.TEACHER,
  });

  const [loading, setLoading] = useState(false);

  const auth = useAuth();
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    setInputs((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const handleRoleChange = (value) => {
    console.log(value);
    console.log(ROLES);
    setInputs((prevState) => ({
      ...prevState,
      role: Number.parseInt(value),
    }));
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setLoading(true);

    auth
      .signUp({
        email: inputs.email,
        password: inputs.password,
        repeatPassword: inputs.repeatPassword,
        fullName: inputs.fullName,
        bio: inputs.bio,
        roleId: inputs.role,
      })
      .then(() => {
        navigate('/');
      })
      .catch(() => setLoading(false));
  };

  return (
    <form onSubmit={handleRegister}>
      <FormControl>
        <FormLabel htmlFor='email'>E-mail</FormLabel>
        <Input
          id='email'
          name='email'
          type='text'
          required
          value={inputs.email}
          onChange={handleInputChange}
        />
      </FormControl>
      <FormControl mt='16px'>
        <FormLabel htmlFor='password'>Пароль</FormLabel>
        <Input
          id='password'
          name='password'
          type='password'
          required
          value={inputs.password}
          onChange={handleInputChange}
        />
      </FormControl>
      <FormControl mt='16px'>
        <FormLabel htmlFor='repeatPassword'>Повторите пароль</FormLabel>
        <Input
          id='repeatPassword'
          name='repeatPassword'
          type='password'
          required
          value={inputs.repeatPassword}
          onChange={handleInputChange}
        />
      </FormControl>
      <FormControl mt='16px'>
        <FormLabel htmlFor='fullName'>ФИО</FormLabel>
        <Input
          id='fullName'
          name='fullName'
          type='text'
          required
          value={inputs.fullName}
          onChange={handleInputChange}
        />
      </FormControl>
      <FormControl mt='16px'>
        <FormLabel htmlFor='description'>
          Описание профиля{' '}
          <Text style={{ display: 'inline' }} color={COLORS.GRAY}>
            (необязательно)
          </Text>
        </FormLabel>
        <Textarea
          id='bio'
          name='bio'
          value={inputs.bio}
          onChange={handleInputChange}
        ></Textarea>
      </FormControl>
      <FormControl mt='16px'>
        <RadioGroup onChange={handleRoleChange} name='role' value={inputs.role}>
          <Stack direction='row'>
            <Radio
              value={ROLES.TEACHER}
              colorScheme={COLORS.DEFAULT_COLOR_SCHEME}
            >
              Репетитор
            </Radio>
            <Radio
              value={ROLES.STUDENT}
              colorScheme={COLORS.DEFAULT_COLOR_SCHEME}
            >
              Ученик
            </Radio>
          </Stack>
        </RadioGroup>
      </FormControl>
      <Button
        colorScheme={COLORS.DEFAULT_COLOR_SCHEME}
        w='100%'
        mt='16px'
        isLoading={loading}
        type='submit'
      >
        Зарегистрироваться
      </Button>
      <Text mt='16px' size='lg' color={COLORS.GRAY} align='center'>
        Уже зарегистрированы?{' '}
        <Link as={RouterLink} to='/login' color='black' fontWeight='bold'>
          Вход
        </Link>
      </Text>
    </form>
  );
};

export default RegisterForm;
