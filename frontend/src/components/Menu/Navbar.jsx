import { Box, VStack } from '@chakra-ui/react';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { COLORS, ROLES } from '../../constants';
import useAuth from '../../hooks/useAuth';

const Navbar = () => {
  const auth = useAuth();

  const navUrls = [
    {
      name: 'Ученики',
      path: '/students',
      icon: '',
      roles: [ROLES.TEACHER],
    },
    {
      name: 'Репетиторы',
      path: '/teachers',
      icon: '',
      roles: [ROLES.STUDENT],
    },
    {
      name: 'Занятия',
      path: '/lessons',
      icon: '',
      roles: [ROLES.TEACHER, ROLES.STUDENT],
    },
    {
      name: 'Календарь',
      path: '/calendar',
      icon: '',
      roles: [ROLES.TEACHER, ROLES.STUDENT],
    },
    {
      name: 'Задания',
      path: '/assignments',
      icon: '',
      roles: [ROLES.TEACHER, ROLES.STUDENT],
    },
  ];

  let defaultStyle = {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: '50px',
    color: 'white',
    borderRadius: '5px',
    padding: '10px',
  };
  let activeStyle = {
    backgroundColor: COLORS.ACTIVE_LINK_BACKGROUND,
  };

  return (
    <VStack w='100%'>
      {navUrls.map((navUrl) => {
        const userHasRequiredRole =
          auth.user && navUrl.roles.includes(auth.user.role.id);
        if (userHasRequiredRole) {
          return (
            <Box
              w='100%'
              h='100%'
              borderRadius='5px'
              _hover={{ backgroundColor: COLORS.GRAY }}
              key={navUrl.path}
            >
              <NavLink
                style={({ isActive }) => {
                  return isActive
                    ? { ...defaultStyle, ...activeStyle }
                    : defaultStyle;
                }}
                to={navUrl.path}
              >
                {navUrl.name}
              </NavLink>
            </Box>
          );
        } else {
          return '';
        }
      })}
    </VStack>
  );
};

export default Navbar;
