import React from 'react'
import Snackbar from '@mui/material/Snackbar';
import { makeStyles } from '@mui/styles';
import Alert from '@mui/material/Alert';

const useStyles = makeStyles(theme => ({
    root: {
        top: theme.spacing(9)
    }
}))

// Reusable component to provide notification to user for actions performed
export default function Notification(props) {

    const { notify, setNotify } = props;
    const classes = useStyles()

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setNotify({
            ...notify,
            isOpen: false
        })
    }

    return (
        <Snackbar
            className={classes.root}
            open={notify.isOpen}
            autoHideDuration={3000}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            onClose={handleClose}>
            <Alert
                severity={notify.type}
                onClose={handleClose}>
                {notify.message}
            </Alert>
        </Snackbar>
    )
}