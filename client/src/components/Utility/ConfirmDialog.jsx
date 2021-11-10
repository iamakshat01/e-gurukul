import React from 'react';
import {Dialog, DialogTitle, DialogActions, Button} from '@mui/material';

const ConfirmDialog = ({onConfirm, onCancel, open}) => {
    return (
        <Dialog
            open={open}
            onClose={onCancel}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {`Are your sure you want to deactivate this classroom?`}
            </DialogTitle>
            <DialogActions>
                <Button onClick={onCancel}>Cancel</Button>
                <Button onClick={onConfirm} autoFocus>
                    Confirm
                </Button>
            </DialogActions>
        </Dialog>
    )
};

export default ConfirmDialog;