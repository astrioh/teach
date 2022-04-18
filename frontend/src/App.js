import { Stack } from '@chakra-ui/react';
import React from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Menu from './components/Menu/Menu';
import PageLayout from './components/PageLayout';

import RequireAuth from './components/RequireAuth';
import { ROLES } from './constants';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import RoomPage from './pages/RoomPage';
import TeachersPage from './pages/TeachersPage';

function App() {
  return (
    <Routes>
      <Route exact path='/login' element={<LoginPage />} />
      <Route exact path='/register' element={<RegisterPage />} />

      <Route element={<RequireAuth roles={[ROLES.STUDENT, ROLES.TEACHER]} />}>
        <Route element={<PageLayout />}>
          <Route exact path='/' element={<h1>Home</h1>} />
          <Route
            exact
            path='/teachers'
            element={
              <RequireAuth roles={[ROLES.STUDENT]}>
                <TeachersPage />
              </RequireAuth>
            }
          />
          <Route exact path='/room/:roomId' element={<RoomPage />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
