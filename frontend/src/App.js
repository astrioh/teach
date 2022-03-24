import { Button } from '@chakra-ui/react';
import React from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';

import RequireAuth from './components/RequireAuth';
import { COLORS } from './constants';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import RoomPage from './pages/RoomPage';

function App() {
  const navigate = useNavigate();

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
      <Route exact path='/room/:id' element={<RoomPage />} />
    </Routes>
  );
}

export default App;
