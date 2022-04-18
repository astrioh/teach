import React from 'react';
import { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Text,
  Button,
  Input,
  Link,
} from '@chakra-ui/react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

import { COLORS } from '../constants';
import useAuth from '../hooks/useAuth';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const auth = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);

    auth
      .signIn(email, password)
      .then(() => {
        navigate('/');
      })
      .catch(() => {
        setLoading(false);
      });
  };

  return (
    <form onSubmit={handleLogin}>
      <FormControl>
        <FormLabel htmlFor='email'>E-mail</FormLabel>
        <Input
          id='email'
          type='text'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>
      <FormControl mt='16px'>
        <FormLabel htmlFor='password'>Пароль</FormLabel>
        <Input
          id='password'
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </FormControl>
      <Button
        colorScheme={COLORS.DEFAULT_COLOR_SCHEME}
        w='100%'
        mt='16px'
        isLoading={loading}
        type='submit'
      >
        Войти
      </Button>
      <Text mt='16px' size='lg' color={COLORS.GRAY} align='center'>
        Новый пользователь?{' '}
        <Link
          as={RouterLink}
          to='/register'
          style={{ color: 'black', fontWeight: 'bold' }}
        >
          Регистрация
        </Link>
      </Text>
    </form>
  );
};

export default LoginForm;
