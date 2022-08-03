import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {Modal, CircularProgress } from '@mui/material';
import { customFlex } from './../../globalStyles/flexStyling';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

export default function BasicMessageModal({ showModal, message, handleClose }) {

  return (
    <div>
      <Modal
        open={showModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <p>
            {message}
          </p>
          <div style={customFlex('center', 'center')}>

          <CircularProgress />
          </div>

        </Box>
      </Modal>
    </div>
  );
}
