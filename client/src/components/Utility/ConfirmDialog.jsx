import React, { useRef } from 'react';
import { Dialog, DialogTitle, DialogActions, Button } from '@mui/material';
import PropTypes from 'prop-types';

const ConfirmDialog = ({ onConfirm, onCancel, message, open, type }) => {
    const confirm = useRef();
    const cancel = useRef();

    const handleConfirm = () => {
        confirm.current.disabled = true;
        cancel.current.disabled = true;
        onConfirm();
    }

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
                <Button color='info' ref={confirm} onClick={onCancel}>Cancel</Button>
                <Button color={type || 'info'} ref={cancel} onClick={handleConfirm} autoFocus>
                    Confirm
                </Button>
            </DialogActions>
        </Dialog>
    )
};

ConfirmDialog.propTypes = {
    onConfirm: PropTypes.func,
    onCancel: PropTypes.func,
    message: PropTypes.string,
    open: PropTypes.bool,
    type: PropTypes.oneOf(['info', 'warning', 'error', 'success'])
};

export default ConfirmDialog;