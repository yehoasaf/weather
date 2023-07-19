import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';


///error modal, handles api error/ overuse///

export function Error({isLight}) {

    const backdropStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: `2px solid ${isLight ? '#000' : '#fff'}`,
        boxShadow: 24,
        p: 4,
      };

  return (
    <div className="error-modal-container" style={{marginTop: '35px'}}>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={true}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={true}>
          <Box sx={backdropStyle} style={{backgroundColor: !isLight && 'black'}}>
            <Typography id="transition-modal-title" variant="h6" component="h2" style={{color: !isLight && 'white'}}>
              Error
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }} style={{color: !isLight && 'white'}}>
            Maximum requests to the API have been exceeded.
            </Typography>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}