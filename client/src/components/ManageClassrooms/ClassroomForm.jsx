import { useEffect, useState } from 'react';
import {
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    Divider,
    Grid,
    Switch,
    TextField
} from '@mui/material';
import { call } from '../../services/api';
import Notification from '../Utility/Notifications';
import { useParams } from 'react-router';

const initialDetails = {
    batch: '',
    subject: '',
    meet_link: '',
    alternate_link: '',
    status: true
}

const ClassroomForm = ({ auth, handleUpdate }) => {
    handleUpdate = handleUpdate || (() => { });
    const { class_id } = useParams();

    const edit = Boolean(class_id);

    const disabled = (auth.role !== 'faculty');

    const [init, setInit] = useState(initialDetails)
    const [values, setValues] = useState(init);
    const [batches, setBatches] = useState([]);
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' });
    const [info, setInfo] = useState({ loading: false, classroom: null });

    const handleChange = (event) => {
        if (event.target.name === 'status') {
            setValues((values) => ({
                ...values,
                [event.target.name]: event.target.checked
            }));
        }
        else {
            setValues((values) => ({
                ...values,
                [event.target.name]: event.target.value
            }));
        }
    };

    const handleReset = () => {
        setValues({ ...init });
    }

    const handleEdit = () => {
        const form = new FormData();
        form.append('batch', values.batch);
        form.append('subject', values.subject);
        form.append('meet_link', values.meet_link);
        form.append('alternate_link', values.alternate_link);
        form.append('status', (values.status ? 'active' : 'inactive'));
        call('put', `faculty/classrooms/${class_id}`, form).then(data => {
            setNotify({ isOpen: true, message: 'Classroom updated successfully!', type: 'success' });
            fetchInfo();
        }).catch(err => {
            if (err.response) {
                setNotify({ isOpen: true, message: err.response.data.error, type: 'error' });
            }
            else {
                setNotify({ isOpen: true, message: 'Could not update the classroom!', type: 'error' });
            }
        });
        handleUpdate();
    }

    const handleCreate = () => {
        const form = new FormData();
        form.append('batch', values.batch);
        form.append('subject', values.subject);
        form.append('meet_link', values.meet_link);
        form.append('alternate_link', values.alternate_link);

        call('post', 'faculty/classrooms/', form).then(data => {
            setNotify({ isOpen: true, message: 'Classroom created successfully!', type: 'success' });
            handleReset();
        }).catch(err => {
            if (err.response) {
                setNotify({ isOpen: true, message: err.response.data.error, type: 'error' });
            }
            else {
                setNotify({ isOpen: true, message: 'Could not create the classroom!', type: 'error' });
            }
        });
        handleUpdate();
    };

    const handleSubmit = (evt) => {
        evt.preventDefault();
        if (edit) {
            handleEdit();
        }
        else {
            handleCreate();
        }
    };
    const fetchBatches = () => {
        call('get', 'faculty/activeBatches').then(data => {
            setBatches(data);
            setValues((values) => {
                return {
                    ...values,
                    batch: values.batch || data[0]._id
                }
            });
            setInit((values) => {
                return {
                    ...values,
                    batch: values.batch || data[0]._id
                }
            });
        }).catch(err => {
            setBatches([]);
            if (err.response) {
                setNotify({ isOpen: true, message: err.response.data.error, type: 'error' });
            }
            else {
                setNotify({ isOpen: true, message: 'Could not fetch the batches!', type: 'error' });
            }
        });
    };

    const fetchInfo = () => {
        setInfo({ loading: true, classroom: null });
        call('get', `faculty/classrooms/${class_id}`).then(data => {
            setInfo({ loading: false, classroom: data });
            let newState = {
                batch: data.batch._id,
                subject: data.subject,
                meet_link: data.meet_link,
                alternate_link: data.alternate_link,
                status: (data.status === 'active')
            };
            setValues(newState);
            setInit(newState);
        }).catch(err => {
            setInfo({ loading: false, classroom: null });
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
        if (edit) {
            fetchInfo();
        }
    }, []);

    return (
        <>
            <form
                onSubmit={handleSubmit}
            >
                <Card>
                    <CardHeader
                        title={"Classroom Details"}
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
                                    disabled={disabled}
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
                                    disabled={disabled}
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
                                    name="meet_link"
                                    onChange={handleChange}
                                    disabled={disabled}
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
                                    disabled={disabled}
                                    onChange={handleChange}
                                    value={values.alternate_link}
                                    variant="outlined"
                                />
                            </Grid>
                            {edit ? (
                                <Grid
                                    item
                                    md={6}
                                    xs={12}
                                >
                                    <Switch
                                        checked={values.status}
                                        onChange={handleChange}
                                        disabled={disabled}
                                        inputProps={{ name: 'status' }}
                                    />
                                </Grid>
                            ) : null}
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
                        <Grid
                            container
                            spacing={3}
                        >
                            <Grid
                                item
                                md={6}
                                xs={12}
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
                            </Grid>
                            <Grid
                                item
                                md={6}
                                xs={12}
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-evenly',
                                    p: 2
                                }}
                            >
                                <Button
                                    color="primary"
                                    variant="contained"
                                    color="success"
                                    type='submit'
                                >
                                    {edit ? 'Save' : 'Create'}
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>
                </Card>
            </form>
            <Notification notify={notify} setNotify={setNotify} />
        </>
    );
};
export default ClassroomForm;