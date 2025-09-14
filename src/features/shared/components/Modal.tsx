'use client';

import React from 'react';
import { Modal, Box, Typography } from '@mui/material';

interface CommonModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children?: React.ReactNode;
  width?: number;
}

const CommonModal: React.FC<CommonModalProps> = ({
  open,
  onClose,
  title,
  description,
  children,
  width = 400,
}) => {
  const style = {
    position: 'absolute' as const,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width,
    bgcolor: 'background.paper',
    borderRadius: 2,
    boxShadow: 24,
    p: 4,
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby='common-modal-title'
      aria-describedby='common-modal-description'
    >
      <Box sx={style}>
        {title && (
          <Typography id='common-modal-title' variant='h6' component='h2'>
            {title}
          </Typography>
        )}
        {description && (
          <Typography id='common-modal-description' sx={{ mt: 2 }}>
            {description}
          </Typography>
        )}
        {children}
      </Box>
    </Modal>
  );
};

export default CommonModal;
