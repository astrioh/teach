import { Button } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';

import RequireAuth from './components/RequireAuth';
import { COLORS } from './constants';
import { useSocket } from './hooks/useSocket';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';

function App() {
  const navigate = useNavigate();
  const socket = useSocket();

  return (
    <Routes>
      <Route
        exact
        path='/'
        element={
          <RequireAuth>
            <h1>Home</h1>
            {
              <Button
                colorScheme={COLORS.DEFAULT_COLOR_SCHEME}
                mt='5'
                onClick={() => {
                  navigate('/room/1234');
                }}
              >
                Подключиться
              </Button>
            }
          </RequireAuth>
        }
      />
      <Route exact path='/login' element={<LoginPage />} />
      <Route exact path='/profile' element={<ProfilePage />} />
      <Route exact path='/room/:id' element={<div>Hek</div>} />
    </Routes>
  );
}

export default App;
