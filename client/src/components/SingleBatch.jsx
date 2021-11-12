import React, {useState, useEffect} from 'react'
import { useParams } from "react-router-dom";
import {call,setToken} from '../services/api';
import Circle from './Loading';
import { DataGrid } from '@mui/x-data-grid';
import {Grid,Container,Typography,Divider,IconButton} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import Notification from './Utility/Notifications';
import ConfirmDialog from './Utility/ConfirmDialog';

export default function SingleBatch(props) {
    
    let { batch_id } = useParams();
    const [batchdetails,setDetails] = useState();
    const [isLoading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const [userId, setuserId] = useState('');
    const [notify, setNotify] = useState({ isOpen:false, message:'', type:''});

    const handleDeleteClick = (Id) => {
        setOpen(true);
        setuserId(Id)
    }
    
    const onConfirm = () => {
        
        setOpen(false);

        // server call

        call('delete','admin/'+userId).then((data)=>{
            setNotify({
                isOpen: true,
                message: 'User Deleted Successfully',
                type: 'success'
            })
        }).catch((err)=>{
            console.log(err);
        })

    }

    const onCancel = () => {
        setOpen(false);
    }


    useEffect(() => {
        setToken(localStorage.getItem('jwtToken'));
        call('get','admin/batch/'+batch_id).then((data) => {
            setDetails(data);
            setLoading(false);
            console.log(data);
        }).catch((err) => {
            console.log(err);
        })
    }, [batch_id,open])

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
        },
        {
            field: "actions",
            headerName: "Actions",
            sortable: false,
            width: 130,
            disableClickEventBubbling: true,
            renderCell: (params) => {
                return (
                    <div>
                        <IconButton onClick={() => handleDeleteClick(params.row.user_id)} >
                            <DeleteIcon fontSize="small" />
                        </IconButton>
                     </div>
                );
             }
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
            <Notification
                notify={notify}
                setNotify={setNotify}
            />
            <Grid container justifyContent="center" sx={{height: "65vh"}} mt={4}>
                <ConfirmDialog open={open} onConfirm={onConfirm} onCancel={onCancel} message={"Delete User"} type={"warning"}/>
                <Grid item xs={12} sm={12} lg={6} xl={6} >
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