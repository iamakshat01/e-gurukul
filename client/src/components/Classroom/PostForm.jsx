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
import { useNavigate, useParams } from 'react-router';
import ConfirmDialog from '../Utility/ConfirmDialog';

const initialDetails = {
    title: '',
    subtitle: '',
    info: ''
}

const PostForm = ({ auth, handleUpdate }) => {
    handleUpdate = handleUpdate || (() => { });
    const { class_id, post_id } = useParams();
    const edit = Boolean(post_id);
    const navigate = useNavigate();

    const [init, setInit] = useState(initialDetails)
    const [values, setValues] = useState(init);
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' });
    const [isOpen, setOpen] = useState(false);
    const [info, setInfo] = useState({ loading: false, post: null });

    const handleChange = (event) => {
        setValues((values) => ({
            ...values,
            [event.target.name]: event.target.value
        }));
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    }

    const handleReset = () => {
        setValues({ ...init });
    }

    const handleEdit = () => {
        const form = new FormData();
        form.append('info', values.info);
        form.append('title', values.title);
        form.append('subtitle', values.subtitle);
        call('put', `faculty/classrooms/${class_id}/posts/${post_id}`, form).then(data => {
            setNotify({ isOpen: true, message: 'Post updated successfully!', type: 'success' });
            fetchInfo();
        }).catch(err => {
            if (err.response) {
                setNotify({ isOpen: true, message: err.response.data.error, type: 'error' });
            }
            else {
                setNotify({ isOpen: true, message: 'Could not update the post!', type: 'error' });
            }
        });
        handleUpdate();
    }

    const handleDelete = () => {
        call('delete', `faculty/classrooms/${class_id}/posts/${post_id}`).then(data => {
            setNotify({ isOpen: true, message: 'Post deleted successfully!', type: 'success' });
            handleUpdate();
            navigate(`/classrooms/${class_id}`);
        }).catch(err => {
            if (err.response) {
                setNotify({ isOpen: true, message: err.response.data.error, type: 'error' });
            }
            else {
                setNotify({ isOpen: true, message: 'Could not delete the post!', type: 'error' });
            }
        });
    };

    const handleCreate = () => {
        const form = new FormData();
        form.append('info', values.info);
        form.append('title', values.title);
        form.append('subtitle', values.subtitle);

        call('post', `faculty/classrooms/${class_id}/posts`, form).then(data => {
            setNotify({ isOpen: true, message: 'Post created successfully!', type: 'success' });
            handleReset();
        }).catch(err => {
            if (err.response) {
                setNotify({ isOpen: true, message: err.response.data.error, type: 'error' });
            }
            else {
                setNotify({ isOpen: true, message: 'Could not create the post!', type: 'error' });
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

    const fetchInfo = () => {
        setInfo({ loading: true, post: null });
        call('get', `faculty/classrooms/${class_id}/posts/${post_id}`).then(data => {
            setInfo({ loading: false, post: data });
            let newState = {
                title: data.content.title,
                subtitle: data.content.subtitle,
                info: data.content.info,
            };
            setValues(newState);
            setInit(newState);
        }).catch(err => {
            setInfo({ loading: false, post: null });
            if (err.response) {
                setNotify({ isOpen: true, message: err.response.data.error, type: 'error' });
            }
            else {
                setNotify({ isOpen: true, message: 'Could not fetch the post!', type: 'error' });
            }
        });
    };

    useEffect(() => {
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
                        title={"Post Details"}
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
                                    label="Title"
                                    name="title"
                                    onChange={handleChange}
                                    required
                                    value={values.title}
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
                                    label="Subtitle"
                                    name="subtitle"
                                    onChange={handleChange}
                                    value={values.subtitle}
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
                                    label="Text"
                                    name="info"
                                    onChange={handleChange}
                                    value={values.info}
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
                        <Grid
                            container
                            spacing={3}
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-evenly'
                            }}
                        >
                            <Grid
                                item
                                md={4}
                                xs={6}
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
                            {
                                edit ? (
                                    <Grid
                                        item
                                        md={4}
                                        xs={6}
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'space-evenly',
                                            p: 2
                                        }}
                                    >
                                        <Button
                                            color="error"
                                            variant="contained"
                                            onClick={handleOpen}
                                        >
                                            Delete
                                        </Button>
                                    </Grid>
                                ) : null
                            }
                            <Grid
                                item
                                md={4}
                                xs={6}
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
            <ConfirmDialog open={isOpen}
                onCancel={handleClose}
                onConfirm={handleDelete}
                type={'error'}
                message={'Delete this post?'}
            />
        </>
    );
};
export default PostForm;