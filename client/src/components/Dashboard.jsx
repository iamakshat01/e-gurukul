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
            <Typography>{children}</Typography>
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
                <CardContent>
                    <Grid container direction="row" alignItems="center">
                        <ClassIcon /> 
                        <Typography variant="h5">
                        {info.batch_code}
                        </Typography>
                    </Grid>
                    <Grid container direction="row" alignItems="center" mt={2}>
                        <TodayIcon fontSize="small"/> 
                        <Typography variant="p">
                        {info.start_year} - {info.end_year}
                        </Typography>
                    </Grid>
                </CardContent>
                <CardActions>
                    <Button size="small">Manage Batch</Button>
                </CardActions>
            </Card>
        </Grid>
    )
}

export default function Dashboard(props) {

    const [batches, setBatches] = useState([]);
    const [faculties, setFaculty] = useState([]);
    const [tabvalue, setValue] = React.useState(0);
    const [isLoading, setLoading] = useState(true);

    const handleTabChange = (event, newValue) => {
        setValue(newValue);
    };

    useEffect(() => {

        try {
            async function fetchData() {
                setToken(localStorage.getItem('jwtToken'));
                const batch = await call('get','admin/batch');
                const faculty = await call('get','admin/faculty');
                console.log(faculty);
                setBatches(batch);
                setFaculty(faculty);
                setLoading(false);
            }
            
            fetchData()
        } 
        catch(err) {
            console.log(err);
        }

    }, [])

    if(isLoading) {
        return (
            <Circle/>
        )
    }
    else {

        const cardList = batches.map( (batch) => <SingleCard info={batch} key={batch.batch_code}/> )
        
        
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
          
        
        return (
            <Box sx={{ width: '100%',marginTop:'10px' }}>
                <Box sx={{display: 'flex',justifyContent: 'center', borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={tabvalue} onChange={handleTabChange} aria-label="basic tabs example">
                    <Tab label="Batches" {...a11yProps(0)} />
                    <Tab label="Faculty" {...a11yProps(1)} />
                    </Tabs>
                </Box>
                <TabPanel value={tabvalue} index={0}>
                    <Box sx={{ flexGrow: 1 }}>
                        <Grid container direction="row" spacing={1} m={2}>
                            {cardList}
                        </Grid>
                    </Box>
                </TabPanel>
                <TabPanel value={tabvalue} index={1}>
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
                </TabPanel>
            </Box>
        )
    }
    
}
