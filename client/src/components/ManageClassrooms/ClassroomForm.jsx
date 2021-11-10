import { useEffect, useState } from 'react';
import {
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    Divider,
    Grid,
    TextField
} from '@mui/material';
import { call } from '../../services/api';
import Notification from '../Utility/Notifications';

const initialDetails = {
    batch: '',
    subject: '',
    meet_link: '',
    alternate_link: ''
}

const ClassroomForm = ({ edit, data }) => {
    const initialState = (edit ? data : initialDetails);
    const [values, setValues] = useState(initialState);
    const [batches, setBatches] = useState([]);
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' });

    const handleChange = (event) => {
        setValues((values) => ({
            ...values,
            [event.target.name]: event.target.value
        }));
    };

    const handleReset = () => {
        setValues((values) => ({
            ...values,
            subject: '',
            meet_link: '',
            alternate_link: ''
        }));
    }

    const handleSubmit = (evt) => {
        evt.preventDefault();
        const form = new FormData();
        form.append('batch',values.batch);
        form.append('subject',values.subject);
        form.append('meet_link',values.meet_link);
        form.append('alternate_link',values.alternate_link);

        call('post', 'faculty/classrooms/', form).then(data => {
            setNotify({ isOpen: true, message: 'Classroom created successfully!', type: 'success' });
            handleReset();
        }).catch(err => {
            if (err.response) {
                setNotify({ isOpen: true, message: err.response.data.error, type: 'error' });
            }
            else {
                setNotify({ isOpen: true, message: 'Could not fetch the batches!', type: 'error' });
            }
        });
    }

    const fetchBatches = () => {
        call('get', 'faculty/activeBatches').then(data => {
            setBatches(data);
            setValues((values) => ({
                ...values,
                batch: data[0]._id
            }));
        }).catch(err => {
            if (err.response) {
                setNotify({ isOpen: true, message: err.response.data.error, type: 'error' });
            }
            else {
                setNotify({ isOpen: true, message: 'Could not fetch the batches!', type: 'error' });
            }
        });
    };

    useEffect(() => {
        fetchBatches();
    }, []);

    return (
        <>
            <form
                noValidate
                onSubmit={handleSubmit}
            >
                <Card>
                    <CardHeader
                        title={(edit ? "Edit": "Create") + " Classroom"}
                    />
                    <Divider />
                    <CardContent>
                        <Grid
                            container
                            spacing={3}
                        >
                            <Grid
                                item
                                md={6}
                                xs={12}
                            >
                                <TextField
                                    fullWidth
                                    helperText="Please specify the subject"
                                    label="Subject"
                                    name="subject"
                                    onChange={handleChange}
                                    required
                                    value={values.subject}
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid
                                item
                                md={6}
                                xs={12}
                            >
                                <TextField
                                    fullWidth
                                    label="Batch"
                                    name="batch"
                                    onChange={handleChange}
                                    required
                                    select
                                    SelectProps={{ native: true }}
                                    value={values.batch}
                                    variant="outlined"
                                >
                                    {batches.map((option) => (
                                        <option
                                            key={option._id}
                                            value={option._id}
                                        >
                                            {option.batch_code}
                                        </option>
                                    ))}
                                </TextField>
                            </Grid>
                            <Grid
                                item
                                md={6}
                                xs={12}
                            >
                                <TextField
                                    fullWidth
                                    label="Meet Link"
                                    name="Meet Link"
                                    onChange={handleChange}
                                    value={values.meet_link}
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid
                                item
                                md={6}
                                xs={12}
                            >
                                <TextField
                                    fullWidth
                                    label="alternate_link"
                                    name="alternate_link"
                                    onChange={handleChange}
                                    value={values.alternate_link}
                                    variant="outlined"
                                />
                            </Grid>
                        </Grid>
                    </CardContent>
                    <Divider />
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-evenly',
                            p: 2
                        }}
                    >
                        <Button
                            color="primary"
                            variant="contained"
                            onClick={handleReset}
                        >
                            Reset
                        </Button>
                        <Button
                            color="primary"
                            variant="contained"
                            color="success"
                            type='submit'
                        >
                            Save details
                        </Button>
                    </Box>
                </Card>
            </form>
            <Notification notify={notify} setNotify={setNotify} />
        </>
    );
};
export default ClassroomForm;