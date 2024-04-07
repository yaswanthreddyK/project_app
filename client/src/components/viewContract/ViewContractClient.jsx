import { useState } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, Typography, Grid, Divider } from '@mui/material';

const ContractPreviewModal = ({contract}) => {


  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button variant="outlined" onClick={handleOpen} sx={{color: "#4cae9c", border: 0, "&:hover": {backgroundColor: "transparent", border: 0}}}>View Contract</Button>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md" >
        <DialogTitle>Contract Preview</DialogTitle>
        <DialogContent>
        <DialogContent>
            <div className='proposal-preview-data-container'>
        <div className='proposal-content'>
        <div>
                <div className='heading '>Job Title</div>
                <p className='light cover-letter'>{contract.job_details[0].title}</p>
            </div>
        <div>
                <div className='heading '>Description</div>
                <p className='light cover-letter'>{contract.job_details[0].description}</p>
            </div>
            <div>
                <div className='heading '>Professional</div>
                <div className='light cover-letter flex'>
                  <div>
                  <img src={contract.employee_details[0].profileImage} alt=""  className="invites-image"/>
                  </div>
                  {contract.employee_details[0].fullName}
                  </div>
            </div>
            <div >
                <div className='heading'>Payment Amount</div>
                <div className='light bid-amount'>$ {contract.paymentType === "hourly" ? contract.amount+" /hr" : contract.amount}</div>
            </div>
           
            <div>
                <div className='heading'>Start Date</div>
                <div className='light bid-amount'>
                {new Date(contract.startDate).toLocaleString('en', {day: 'numeric', month: 'long', year: 'numeric'})}
                </div>
            </div>
            <div>
                <div className='heading'>Deadline</div>
                <div className='light bid-amount'>
                {new Date(contract.deadline).toLocaleString('en', {day: 'numeric', month: 'long', year: 'numeric'})}
                </div>
            </div>
            <div>
                <div className='heading '>Message</div>
                <p className='light cover-letter'>{contract.message}</p>
            </div>
        </div>
    </div>

            </DialogContent>
           
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ContractPreviewModal;
