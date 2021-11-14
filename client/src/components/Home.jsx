import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import Front from '../front.svg'
const useStyles = makeStyles((theme) => console.log(theme) || ({
    home: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '60vh',
        padding: '0 9%',
        [theme.breakpoints.down('md')]: {
            flexFlow: 'column',
            textAlign: 'center',
            minHeight: '80vh'
        },
    },
    head: {
        fontSize: '2.5rem',
        color: '#333',
        textTransform: 'uppercase'
    },
    para: {
        fontSize: '1.3rem',
        color: '#666',
        padding: '0.2rem 0'
    },
    name: {
        color: theme.palette.secondary.main,
        textTransform: 'uppercase'
    },
    img: {
        marginTop: '20vh',
        [theme.breakpoints.down('md')]: {
            marginTop: '10vh',
        },
        
    },
    image: {
        width: '32vw',
        [theme.breakpoints.down('md')]: {
            width: '90%'
        },
    },
    btn: {
        display: 'inline-block',
        marginTop: '1rem',
        padding: '.4rem 1.1rem',
        borderRadius: '2rem',
        background: theme.palette.secondary.main,
        fontSize: '1.4rem',
        color: '#fff',
        cursor: 'pointer',
        transition: 'all .3s linear',
        borderColor: '#ff3399',
        "&:hover":{
            transform: 'scale(1.1)'
        }
    },
    // btnwrap: {
    //     display: 'flex',
    //     justifyContent: 'center',
    //     marginRight: '9vw',
    //     [theme.breakpoints.down('md')]: {
    //          marginRight: '0vw'
    //     },
    // }
    
    
}));

const Home = (props) => {

    const classes=useStyles();

    return (
        <div className={classes.home}>
            
            <div className={classes.content}> 
                <h3 className={classes.head}>Simplifying online learning with <span className={classes.name}>E-Gurukul</span></h3>
                <p className={classes.para}>A complete learning management portal for students and educational institutions</p>
                <div className={classes.btnwrap}>
                    <button className={classes.btn}>Sign In</button>
                 </div>
            </div>

            <div className={classes.img}>
                <img className={classes.image} src={Front} alt="front page"/>
            </div>   
            
        </div>
    );
};

export default Home;