import React, {useState} from 'react'
import {Container,TextField,Grid,InputAdornment,Typography, Button, Card} from '@mui/material'
import ClassIcon from '@mui/icons-material/Class';
import DateRangeIcon from '@mui/icons-material/DateRange';
import { makeStyles } from '@mui/styles';
import Notification from './Utility/Notifications';
import { call } from '../services/api';

const initialValues = {
    'start_year':'',
    'end_year':'',
    'batch_code':''
}

const useStyles = makeStyles((theme) => ({
    root: {
    
    },
    form: {
        
    }
}));

export default function CreateBatch(props) {
    
    const [values,setValues] = useState(initialValues);
    const [notify, setNotify] = useState({ isOpen:false, message:'', type:''});

    const handleInputChange = e => {
        const { name, value } = e.target
        setValues({...values,[name]: value})
    }

    const handleSubmit = e => {

        e.preventDefault();
        call('post','admin/batch/register',values).then((data) => {
            setValues(initialValues);

            setNotify({
                isOpen: true,
                message: 'Batch Created Successfully',
                type: 'success'
            })
            
        }).catch((err)=>{   
            console.log(err);
            setNotify({
                isOpen: true,
                message: 'Batch Creation Failed',
                type: 'error'
            })
        })
    }

    const classes = useStyles();

    return (
        <Container maxWidth="xl" >
            
            <Grid container alignItems="center" justifyContent="center" mt={4} className={classes.root} >

                <Card variant="outlined" >
                    
                    <Notification
                        notify={notify}
                        setNotify={setNotify}
                    />

                    <form className={classes.form} onSubmit={handleSubmit} >

                        <Typography align="center" component="h1" variant="h5" mt={2}>
                        Create Batch
                        </Typography>

                        <Grid container justifyContent="center">
                            
                            <Grid item xs={10} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    placeholder="Batch Code"
                                    margin="normal"
                                    variant="outlined"
                                    name="batch_code"
                                    value={values.batch_code}
                                    onChange={handleInputChange}
                                    InputProps={{
                                        startAdornment: (
                                        <InputAdornment position="start">
                                            <ClassIcon/>
                                        </InputAdornment>
                                        ),
                                    }}
                                    InputLabelProps={{ required: false }}
                            />
                            </Grid>

                            <Grid container spacing={1} justifyContent="center">
                                <Grid item xs={5} sm={3}>
                                    <TextField
                                        required
                                        placeholder="Start Year"
                                        margin="normal"
                                        type="number"
                                        fullWidth
                                        variant="outlined"
                                        name="start_year"
                                        value={values.start_year}
                                        onChange={handleInputChange}
                                        InputProps={{
                                            startAdornment: (
                                            <InputAdornment position="start">
                                                <DateRangeIcon/>
                                            </InputAdornment>
                                            ),
                                        
                                        }}
                                        InputLabelProps={{ required: false }}
                                    /> 
                                </Grid>
                                <Grid item xs={5} sm={3}>
                                    <TextField
                                        required
                                        placeholder="End Year"
                                        margin="normal"
                                        type="number"
                                        fullWidth
                                        variant="outlined"
                                        name="end_year"
                                        value={values.end_year}
                                        onChange={handleInputChange}
                                        InputProps={{
                                            startAdornment: (
                                            <InputAdornment position="start">
                                                <DateRangeIcon/>
                                            </InputAdornment>
                                            ),
                                        }}
                                        InputLabelProps={{ required: false }}
                                    />  
                                </Grid>

                            </Grid>
                            
                            <Grid item mt={3} mb={3}>
                                <Button variant="contained" type="submit" sx={{color:'white'}}>
                                    Submit
                                </Button>
                            </Grid>
                            

                        </Grid>

                    </form>
                </Card>
            </Grid>
        </Container>
        
    )
}