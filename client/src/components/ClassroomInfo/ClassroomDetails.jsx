import React from 'react';

import ClassroomForm from '../ManageClassrooms/ClassroomForm';

export const ClassroomDetails = ({ auth, handleUpdate }) => {
    return (
        <ClassroomForm auth={auth} handleUpdate={handleUpdate} />
    );
};

export default ClassroomDetails;