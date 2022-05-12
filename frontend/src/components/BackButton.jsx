import { Icon, IconButton } from '@chakra-ui/react';
import React from 'react';
import { BsChevronLeft } from 'react-icons/bs';
import { Link } from 'react-router-dom';

const BackButton = ({ to, ...rest }) => {
  return (
    <Link to={to}>
      <IconButton {...rest} icon={<Icon as={BsChevronLeft} />} />
    </Link>
  );
};

export default BackButton;
