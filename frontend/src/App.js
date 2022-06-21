import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import PageLayout from './components/PageLayout';

import RequireAuth from './components/RequireAuth';
import { ROLES } from './constants';
import AddStudentPage from './pages/AddStudentPage';
import CreateLessonPage from './pages/CreateLessonPage';
import LessonsPage from './pages/LessonsPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import RoomPage from './pages/RoomPage';
import StudentsPage from './pages/StudentsPage';
import TeachersPage from './pages/TeachersPage';

function App() {
  return (
    <Routes>
      <Route exact path='/login' element={<LoginPage />} />
      <Route exact path='/register' element={<RegisterPage />} />
      <Route element={<RequireAuth roles={[ROLES.STUDENT, ROLES.TEACHER]} />}>
        <Route element={<PageLayout />}>
          <Route
            exact
            path='/teachers'
            element={
              <RequireAuth roles={[ROLES.STUDENT]}>
                <TeachersPage />
              </RequireAuth>
            }
          />
          <Route
            exact
            path='/students'
            element={
              <RequireAuth roles={[ROLES.TEACHER]}>
                <StudentsPage />
              </RequireAuth>
            }
          />
          <Route
            exact
            path='/students/add-student'
            element={
              <RequireAuth roles={[ROLES.TEACHER]}>
                <AddStudentPage />
              </RequireAuth>
            }
          />
          <Route
            exact
            path='/lessons'
            element={
              <RequireAuth roles={[ROLES.TEACHER, ROLES.STUDENT]}>
                <LessonsPage />
              </RequireAuth>
            }
          />
          <Route
            exact
            path='/lessons/create'
            element={
              <RequireAuth roles={[ROLES.TEACHER]}>
                <CreateLessonPage />
              </RequireAuth>
            }
          />
        </Route>
      </Route>
      <Route exact path='/room/:roomId' element={<RoomPage />} />
      <Route path='*' element={<Navigate to='/lessons' replace />} />
    </Routes>
  );
}

export default App;
