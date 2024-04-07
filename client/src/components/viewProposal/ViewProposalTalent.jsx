import { useContext, useState } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, Typography, Grid, Divider } from '@mui/material';
import { Container, TextField } from '@mui/material';
import { makeStyles } from '@mui/styles';
import ProposalPreview from '../proposalPreview/ProposalPreview';
import ProposalPreviewTalent from '../proposalPreview/ProposalPreviewTalent'
import UserContext from '../../context/Usercontext';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    marginTop: '16px', 
  },
  section: {
    marginBottom: '32px', 
  },
});

const ProposalPreviewModal = ({proposal, title, author}) => {

  const [open, setOpen] = useState(false);
  const classes = useStyles();
  const {user} = useContext(UserContext)
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button variant="outlined" onClick={handleOpen} sx={{color: "#4cae9c", border: 0, "&:hover": {backgroundColor: "transparent", border: 0}}}>View Proposal</Button>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth={user.isCompany ? "xl" : "md"} >
        <DialogTitle>Overview</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
          {user.isCompany ? <ProposalPreview proposal={proposal} title={title} author={author} /> : <ProposalPreviewTalent proposal={proposal} /> }
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ProposalPreviewModal;
