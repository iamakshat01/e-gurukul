import React, {useState, useEffect} from 'react'
import { useParams } from "react-router-dom";
import {call,setToken} from '../services/api';
import Circle from './Loading';
import { DataGrid } from '@mui/x-data-grid';
import {Grid,Container,Typography,Divider} from '@mui/material';

export default function SingleBatch(props) {
    let { batch_id } = useParams();
    const [batchdetails,setDetails] = useState();
    const [isLoading, setLoading] = useState(true);
    useEffect(() => {
        setToken(localStorage.getItem('jwtToken'));
        call('get','admin/batch/'+batch_id).then((data) => {
            setDetails(data);
            setLoading(false);
            console.log(data);
        }).catch((err) => {
            console.log(err);
        })
    }, [batch_id])
    const columns = [
        { field: 'roll_no', headerName: 'Roll No', width: 160 },
        {
          field: 'first_name',
          headerName: 'Name',
          width: 130,
          valueFormatter: (params) => params.row?.personal_info?.first_name
        },
        {
          field: 'mobile',
          headerName: 'Mobile',
          width: 130,
          valueFormatter: (params) => params.row?.personal_info?.mobile
        },
        {
            field: 'email',
            headerName: 'Email',
            width: 160,
            valueFormatter: (params) => params.row?.personal_info?.email
        }
    ];
    if(isLoading) {
        return (
            <Circle/>
        )
    }
    return (
        <Container maxWidth="xl" >
            <Grid container mt={4}>
                <Grid item xs={12} >
                    <Typography align='center' color='gray' fontWeight='bold' variant='h4' component='h1'>
                        Students
                    </Typography>
                    <Divider />
                </Grid>
            </Grid>
            <Grid container justifyContent="center" sx={{height: "65vh"}} mt={4}>
                <Grid item xs={12} sm={12} lg={5} xl={5} >
                    <DataGrid
                        rows={batchdetails.students}
                        columns={columns}
                        pageSize={10}
                        rowsPerPageOptions={[10]}
                        getRowId={(row) => row._id}
                    />
                </Grid>
            </Grid>
        </Container>
    )
}