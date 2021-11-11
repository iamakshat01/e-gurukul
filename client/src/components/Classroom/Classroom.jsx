import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { call } from '../../services/api';

const Classroom = ({auth}) => {
    const params = useParams();
    const [classroom, setClassroom] = useState({loading: false, classroomInfo: null});

    useEffect(() => {
        setClassroom({loading: true, classroomInfo: null});
        // call()
    });


    return (<h1>Classroom</h1>)
};

export default Classroom;