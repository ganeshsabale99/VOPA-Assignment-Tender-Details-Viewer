import React from 'react';
import { Modal, Box, Typography, IconButton, Divider, CircularProgress } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  borderRadius: '12px',
  boxShadow: 24,
  p: 4,
  maxHeight: '80vh',
  overflowY: 'auto',
};

const headerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '16px',
};

const TenderModal = ({ open, handleClose, tender }) => {
  if (!tender) {
    return (
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Typography>Loading tender details...</Typography>
          <CircularProgress />
        </Box>
      </Modal>
    );
  }

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
       
        <div style={headerStyle}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            Tender Details <span style={{ fontSize: '14px', color: 'gray' }}>  :- {tender.id}</span>
          </Typography>
          <IconButton onClick={handleClose} aria-label="close">
            <CloseIcon />
          </IconButton>
        </div>

        
        <Typography variant="h6" gutterBottom>{tender.title || 'No title available.'}</Typography>
        <Divider sx={{ marginBottom: 2 }} />

        <Typography><strong>Buyer:</strong> {tender.buyer_name || 'No buyer information available.'}</Typography>
        <Typography><strong>Procedure:</strong> {tender.procedure_type || 'No procedure type available.'}</Typography>
        <Typography><strong>Estimated Value:</strong> {tender.estimated_value || 'No estimated value available.'}</Typography>
        <Typography><strong>Deadline:</strong> {tender.deadline_date || 'No deadline available.'}</Typography>
        <Typography><strong>Date Published:</strong> {tender.date || 'No date available.'}</Typography>
        <Typography><strong>Deadline Length:</strong> {tender.deadline_length_days ? `${tender.deadline_length_days} days` : 'No deadline length available.'}</Typography>

        <Divider sx={{ marginY: 2 }} />

        
        <Typography sx={{ mt: 1 }}>
          <strong>Description:</strong> {tender.description || 'No description available.'}
        </Typography>

        
        <Divider sx={{ marginY: 2 }} />
        <Typography><strong>Additional Details:</strong></Typography>
        <ul>
          {tender.additional_details && tender.additional_details.length > 0 ? (
            tender.additional_details.map((detail, index) => (
              <li key={index}>{detail || 'No detail available.'}</li>
            ))
          ) : (
            <Typography variant="body2">No additional details available.</Typography>
          )}
        </ul>

      </Box>
    </Modal>
  );
};

export default TenderModal;
