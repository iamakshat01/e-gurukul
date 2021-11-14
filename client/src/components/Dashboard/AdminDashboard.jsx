import React, { useState, useEffect } from 'react';
import {Box,Card,CardActions,Tabs,Tab, Grid,Container, Avatar, CardHeader,IconButton} from '@mui/material';
import ClassIcon from '@mui/icons-material/Class';
import { DataGrid } from '@mui/x-data-grid';
import pickColor from '../../services/colorPicker';
import DeleteIcon from '@mui/icons-material/Delete';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Circle from '../Utility/Loading';
import { useNavigate } from 'react-router';
import {call,setToken} from '../../services/api';
import ConfirmDialog from '../Utility/ConfirmDialog';
import Notification from '../Utility/Notifications';
// taken from docs
function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            {children}
          </Box>
        )}
      </div>
    );
}

function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
}


function SingleCard({info,handleDeleteClick}) {

    const navigate = useNavigate();
    return (
        <Grid item xs={11} sm={6} lg={3} xl={3}>
            <Card variant="outlined">
                <CardHeader
                        avatar={
                            <Avatar sx={{bgcolor: pickColor(info.batch_code) }} >
                                <ClassIcon/>
                            </Avatar>
                        }
                        title={info.batch_code}
                        subheader={info.start_year + "-" + info.end_year}
                        titleTypographyProps={{ variant: 'h6', fontWeight: 'bold' }}
                        subheaderTypographyProps={{ variant: 'p' }}
                />

                <CardActions sx={{ paddingX: 2 }} disableSpacing>
                    <IconButton onClick={() => handleDeleteClick(info._id)}>
                        <DeleteIcon fontSize="small"/>
                    </IconButton>

                    <IconButton
                        sx={{ marginLeft: 'auto' }}
                        onClick={()=>navigate('/dashboard/batch/'+info._id)}
                    >
                        <NavigateNextIcon />
                    </IconButton>
                </CardActions>
            </Card>
        </Grid>
    )
}


function FacultyList(props) {

    const [faculties, setFaculty] = useState([]);
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
            
            setNotify({
                isOpen: true,
                message: 'User Deletion Failed',
                type: 'error'
            })
            console.log(err);
        })

    }

    const onCancel = () => {
        setOpen(false);
    }

    useEffect(() => {
        setToken(localStorage.getItem('jwtToken'));
        call('get','admin/faculty').then((data) => {
            setFaculty(data);
            setLoading(false);
        }).catch((err) => {
            console.log(err);
        })
    }, [notify])

    const columns = [
        { field: 'faculty_code', headerName: 'Faculty Code', width: 160 },
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
            width: 130,
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
        <Grid container justifyContent="center" sx={{height: "65vh"}}>
            <Notification
                notify={notify}
                setNotify={setNotify}
            />
            <Grid item xs={12} sm={12} lg={5} xl={4}>
                <ConfirmDialog open={open} onConfirm={onConfirm} onCancel={onCancel} message={"Delete User"} type={"warning"}/>
                <DataGrid
                    rows={faculties}
                    columns={columns}
                    pageSize={10}
                    rowsPerPageOptions={[10]}
                    getRowId={(row) => row._id}
                />
            </Grid>
        </Grid>
    )

}

function BatchesList(props) {

    const [batches, setBatches] = useState('');
    const [isLoading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const [batchId, setbatchId] = useState('');
    const [notify, setNotify] = useState({ isOpen:false, message:'', type:''});

    const handleDeleteClick = (Id) => {
        setOpen(true);
        setbatchId(Id);
    }
    
    const onConfirm = () => {
        
        setOpen(false);

        // server call

        call('delete','admin/batch/'+batchId).then((data)=>{
            setNotify({
                isOpen: true,
                message: 'Batch Deleted Successfully',
                type: 'success'
            })
        }).catch((err)=>{
            setNotify({
                isOpen: true,
                message: 'Batch Deletion Failed',
                type: 'error'
            })
        })

    }

    const onCancel = () => {
        setOpen(false);
    }

    useEffect(() => {
        setToken(localStorage.getItem('jwtToken'));
        call('get','admin/batch').then((data) => {
            setBatches(data);
            setLoading(false);
        }).catch((err) => {
            console.log(err);
        })

    }, [notify])

    if(isLoading) {
        return (
            <Circle/>
        )
    }
    else {
        const cardList = batches.map( batch => <SingleCard handleDeleteClick={handleDeleteClick} info={batch} key={batch._id}/> )
        return (
            <Container maxWidth="lg" sx={{ flexGrow: 1 }}>
                <Notification
                notify={notify}
                setNotify={setNotify}
                />
                <ConfirmDialog open={open} onConfirm={onConfirm} onCancel={onCancel} message={"Delete Batch"} type={"warning"}/>
                <Grid container direction="row" spacing={1} m={2}>
                    {cardList}
                </Grid>
            </Container>
            
        )
    }
    
}

export default function Admin(props) {

    
    const [tabvalue, setValue] = useState(0);

    const handleTabChange = (event, newValue) => {
        setValue(newValue);
    };
        
    const getVisibilityStyle = (hiddenCondition) => {
        if (hiddenCondition) {
            return {
                visibility: 'hidden',
                height: 0,
            };
        }
        return {
            visibility: 'visible',
            height: 'inherit',
        };
    };

    return (
        <Box sx={{ width: '100%',marginTop:'10px' }}>
            <Box sx={{display: 'flex',justifyContent: 'center', borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={tabvalue} onChange={handleTabChange} aria-label="basic tabs example">
                <Tab label="Batches" {...a11yProps(0)} />
                <Tab label="Faculty" {...a11yProps(1)} />
                </Tabs>
            </Box>

            <div style={getVisibilityStyle(tabvalue !== 0)}>
                <BatchesList />
            </div>

            <div style={getVisibilityStyle(tabvalue !== 1)}>
                <FacultyList />
            </div>

            {/* <TabPanel value={tabvalue} index={0}>
                <BatchesList/>
            </TabPanel>
            <TabPanel value={tabvalue} index={1}>
                <FacultyList/> 
            </TabPanel> */}
        </Box>
    )
}
