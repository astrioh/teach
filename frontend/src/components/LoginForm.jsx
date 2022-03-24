import React from 'react';
import { useState } from 'react';
import { FormControl, FormLabel, Flex, Button, Input } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

import { COLORS } from '../constants';
import useAuth from '../hooks/useAuth';

const LoginForm = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const auth = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);

    auth.signin(email, password).then(() => {
      navigate('/');
    });
  };

  return (
    <Flex width='full'>
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
        <FormControl>
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
          isLoading={loading}
          type='submit'
        >
          Войти
        </Button>
      </form>
    </Flex>
  );
};

export default LoginForm;
