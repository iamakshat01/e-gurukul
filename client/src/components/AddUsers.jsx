import { Card, Container, Grid,Typography,TextField,FormControl,FormControlLabel,FormLabel,Radio,RadioGroup,Button,Box,LinearProgress } from "@mui/material";
import React, {useEffect, useState} from "react";
import Notification from './Utility/Notifications';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { formcall,call } from "../services/api";

const initialValues = {
    'batch_code':'',
    'role':'',
    'file': null,
}

export default function AddUsers() {
    
    const [values,setValues] = useState(initialValues);
    const [notify, setNotify] = useState({ isOpen:false, message:'', type:''});
    const [batches, setBatches] = useState('');
    const [isUploading,setUploading] = useState(false);
    
    const handleInputChange = e => {
        const { name, value } = e.target
        setValues({...values,[name]: value})
    }

    const onFileChange = e =>
    {
        setValues({...values,file: e.target.files[0]})
    }

    const handleSubmit = e => {

        e.preventDefault();
        setUploading(true); 
        const formData = new FormData();

        formData.append('batch', values.batch_code);
        formData.append(values.role, values.file);
        


        formcall('post','admin/register/'+values.role,formData).then((data)=>{
            
            setUploading(false);

            setNotify({
                isOpen: true,
                message: 'Users Added Successfully',
                type: 'success'
            })

        }).catch(err => {

            setNotify({
                isOpen: true,
                message: 'Users Cannot be Added',
                type: 'error'
            })
        })
    }

    useEffect(()=>{
        call('get','admin/batch').then((data)=>{

            setBatches(data);
            setValues({...values,batch_code:data[0].batch_code})

        }).catch((err) => {
            console.log(err);
        })

    },[]);


    return (

        <Container maxWidth="xl">
            
            <Grid container mt={2} justifyContent="center">
                
                <Grid item sm={8} xl={6}>

                    <Card variant="outlined">

                        <Typography align="center" component="h1" variant="h5" mt={2}>
                            Add Users
                        </Typography>
                        
                        {isUploading && (
                            <Box sx={{ width: '80%',margin:'auto' }} >
                            <LinearProgress sx={{marginTop: '20px'}} />
                            </Box>)
                        }

                        <Notification
                            notify={notify}
                            setNotify={setNotify}
                        />

                        <form onSubmit={handleSubmit}>
                        <Grid container spacing={6} mt={2} justifyContent="center">

                            <Grid item xs={10} sm={10} md={10} lg={5}>

                                <TextField
                                        fullWidth
                                        label="Batch"
                                        name="batch_code"
                                        onChange={handleInputChange}
                                        required
                                        select
                                        SelectProps={{ native: true }}
                                        value={values.batch_code}
                                        variant="outlined"
                                        InputLabelProps={{ required: false }}
                                    >

                                    {batches.length!=0 && batches.map((option) => (
                                        <option
                                            key={option.batch_code}
                                            value={option.batch_code}
                                        >
                                            {option.batch_code}
                                        </option>
                                    ))}    

                                </TextField>

                            </Grid>


                            <Grid item xs={10} sm={10} md={10} lg={5}>

                                <FormControl>
                                    <FormLabel>Role</FormLabel>
                                    <RadioGroup
                                        name="role"
                                        value={values.role}
                                        onChange={handleInputChange}
                                        row
                                    >
                                        <FormControlLabel
                                            key="student"
                                            value="student"
                                            control={<Radio size="small" />}
                                            label="Student"
                                        />
                                        <FormControlLabel
                                            key="faculty"
                                            value="faculty"
                                            control={<Radio size="small" />}
                                            label="Faculty"
                                        />
                                    </RadioGroup>
                                </FormControl>

                            </Grid>

                        </Grid>

                        <Grid container spacing={4} justifyContent="center" mt={2}>

                            <Grid item xs={10} sm={10} md={10} lg={5}>

                                <label htmlFor="btn-upload">
                                    <input
                                        id="btn-upload"
                                        name="file"
                                        style={{ display: 'none' }}
                                        type="file"
                                        onChange={onFileChange} />
                                    <Button
                                        variant="outlined"
                                        component="span" 
                                        startIcon={<UploadFileIcon />}
                                    >
                                        Upload File
                                    </Button>
                                </label>


                                <Typography component="span" variant="body1" style={{marginLeft:'7px'}}>
                                    {values.file && values.file!=null ? values.file.name : null}
                                </Typography>

                            </Grid>


                            <Grid item xs={10} md={5} mb={4} xs={{align:"center"}}>
                                
                                <Button variant="contained" type="submit" sx={{color:'white'}}>
                                    Submit
                                </Button>
                                
                            </Grid>

                        </Grid>

                    
                        </form>
                    </Card>

                </Grid>

            </Grid>
            

        </Container>
        
    )
}