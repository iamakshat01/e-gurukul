import React, { useState, useEffect } from 'react';
import {call,setToken} from '../services/api';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Circle from './Loading'
import Grid from '@mui/material/Grid';
import ClassIcon from '@mui/icons-material/Class';
import TodayIcon from '@mui/icons-material/Today';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { DataGrid } from '@mui/x-data-grid';
import { Container, Avatar, CardHeader } from '@material-ui/core';
import { deepOrange, deepPurple } from '@mui/material/colors';

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


function SingleCard(props) {
    const {info}=props;
    return (
        <Grid item xs={11} sm={3} xl={2}>
            <Card variant="outlined">
                <CardHeader
                        avatar = {
                            <Avatar  sx={{ bgcolor: deepOrange[500] }} >
                                <ClassIcon />
                            </Avatar>
                        }
                        title={info.batch_code}
                        subheader={info.start_year + "-" + info.end_year}
                />
                    {/* <Grid container direction="row" alignItems="center">
                        <Typography variant="h5">
                        {info.batch_code}
                        </Typography>
                    </Grid>

                    <Grid container direction="row" alignItems="center" mt={2}>
                        <TodayIcon fontSize="small"/> 
                        <Typography variant="p">
                        {info.start_year} - {info.end_year}
                        </Typography>
                    </Grid> */}

                <CardActions>
                    <Button>Manage Batch</Button>
                </CardActions>
            </Card>
        </Grid>
    )
}

function FacultyList(props) {

    const [faculties, setFaculty] = useState([]);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        setToken(localStorage.getItem('jwtToken'));
        call('get','admin/faculty').then((data) => {
            setFaculty(data);
            setLoading(false);
        }).catch((err) => {
            console.log(err);
        })
    }, [])

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
        }
    ];

    if(isLoading) {
        return (
            <Circle/>
        )
    }
    return (
        <Grid container justifyContent="center" sx={{height: "65vh"}}>
            <Grid item xs={12} sm={12} lg={5} xl={4}>
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

    useEffect(() => {
        setToken(localStorage.getItem('jwtToken'));
        call('get','admin/batch').then((data) => {
            setBatches(data);
            setLoading(false);
        }).catch((err) => {
            console.log(err);
        })

    }, [])

    if(isLoading) {
        return (
            <Circle/>
        )
    }
    else {
        const cardList = batches.map( (batch) => <SingleCard info={batch} key={batch._id}/> )
        return (
            <Container maxWidth="lg" sx={{ flexGrow: 1 }}>
                        <Grid container direction="row" spacing={1} m={2}>
                            {cardList}
                        </Grid>
            </Container>
            
        )
    }
    
}

export default function Dashboard(props) {

    const [batches, setBatches] = useState([]);
    const [faculties, setFaculty] = useState([]);
    const [tabvalue, setValue] = React.useState(0);
    const [isLoading, setLoading] = useState(true);

    const handleTabChange = (event, newValue) => {
        setValue(newValue);
    };
        
        
    return (
        <Box sx={{ width: '100%',marginTop:'10px' }}>
            <Box sx={{display: 'flex',justifyContent: 'center', borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={tabvalue} onChange={handleTabChange} aria-label="basic tabs example">
                <Tab label="Batches" {...a11yProps(0)} />
                <Tab label="Faculty" {...a11yProps(1)} />
                </Tabs>
            </Box>
            <TabPanel value={tabvalue} index={0}>
                <BatchesList/>
            </TabPanel>
            <TabPanel value={tabvalue} index={1}>
                <FacultyList/> 
            </TabPanel>
        </Box>
    )
}
