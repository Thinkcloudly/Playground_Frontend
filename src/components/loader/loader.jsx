import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

export default function Loader({ showLoader, message }) {

  return (
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1, display: 'flex', flexDirection: 'row', gap: 2 }}
        open={showLoader}
      >
        <CircularProgress color="inherit" />
        <p>{message || "Loading..."}</p>
      </Backdrop>
  );
}
