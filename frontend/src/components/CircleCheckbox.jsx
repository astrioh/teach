import { Checkbox, Icon } from '@chakra-ui/react';
import { BsCheckCircle, BsCheckCircleFill } from 'react-icons/bs';
import React from 'react';
import { COLORS } from '../constants';

const CircleIcon = ({ isIndeterminate, ...rest }) => {
  const icon = isIndeterminate ? BsCheckCircle : BsCheckCircleFill;

  return <Icon as={icon} viewBox='0 0 24 24' {...rest} />;
};
const CircleCheckbox = (props) => {
  return (
    <Checkbox
      size='lg'
      {...props}
      icon={<CircleIcon />}
      iconColor={COLORS.DEFAULT_COLOR_SCHEME}
    />
  );
};

export default CircleCheckbox;
