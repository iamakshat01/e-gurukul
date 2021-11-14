import React from 'react';
import { Breadcrumbs, Button } from '@mui/material';
import ArrowBackIos from '@mui/icons-material/ArrowBackIos';
import { useNavigate } from 'react-router';

const BreadCrumb = ({to}) => {
    const navigate = useNavigate();
    return (
        <Breadcrumbs sx={{margin: 2}} aria-label="breadcrumb">
            <Button
                startIcon={<ArrowBackIos sx={{ mr: 0.5 }} fontSize="inherit" />}
                onClick={() => navigate(to || -1)}
                color='info'
            >
                Back
            </Button>
        </Breadcrumbs>
    )
};

export default BreadCrumb;