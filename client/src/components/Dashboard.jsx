import React, { useState, useEffect } from 'react';
import {call,setToken} from '../services/api';
import { makeStyles } from '@mui/styles';
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


function SingleCard(props) {
    const {info}=props;
    return (
        <Grid item sm={6} xl={2}>
            <Card variant="outlined">
                <CardContent>
                    <Grid container direction="row" alignItems="center">
                        <ClassIcon /> 
                        <Typography variant="h5">
                        {" "} {info.batch_code}
                        </Typography>
                    </Grid>
                    <Grid container direction="row" alignItems="center" mt={2}>
                        <TodayIcon /> 
                        <Typography>
                        {" "} {info.start_year} - {info.end_year}
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
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        setToken(localStorage.getItem('jwtToken'));
        call('get','admin/batch').then((data) => {
            setBatches(data);
            setLoading(false);
            console.log(data);
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
        const cardList = batches.map( (batch) => <SingleCard info={batch} /> )
        return (
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2} m={2}>
                    {cardList}
                </Grid>
            </Box>
            
        )
    }
    
}
