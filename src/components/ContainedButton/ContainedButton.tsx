import React from 'react';

import { Button, ButtonProps, SxProps, Theme } from '@mui/material';

const ContainedButton: React.FC<ButtonProps> = (props) => {
  const { sx, ...otherProps } = props;

  const defaultStyles: SxProps<Theme> = {
    height: '40px',
    borderRadius: '0.5rem',
    textTransform: 'none',
    fontWeight: 500,
    fontSize: '14px',
    ...sx,
  };

  return (
    <Button variant="contained" sx={defaultStyles} disableElevation {...otherProps}>
      {props.children}
    </Button>
  );
};

export default ContainedButton;
