import React, { useState } from 'react';
import {
    Grid,
    Card,
    CardHeader,
    CardActions,
    IconButton,
    Avatar,
    CardContent,
    Paper,
    InputBase,
    Typography,
    Link,
    Collapse,
    Divider
} from '@mui/material';
import { styled } from '@mui/material/styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EditIcon from '@mui/icons-material/Edit';
import CreateIcon from '@mui/icons-material/Send';
import pickColor from '../../services/colorPicker';
import parseDate from '../../services/dateParser';
import { useNavigate, useParams } from 'react-router';
import Notification from '../Utility/Notifications';
import { call, getHost } from '../../services/api';
import { ClassNames } from '@emotion/react';
import { makeStyles } from '@mui/styles';

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

const Files = ({ files }) => {
    let fileList = files.map(file => {
        return (
            <Grid key={file._id} item xs={12} md={6} lg={4}>
                <Card raised>
                    <CardContent>
                        <Link target="_blank" rel="noopener" rel="noreferrer" href={`${getHost()}/${file.url}`} underline="hover">
                            <Typography variant='subtitle1' color='info' textOverflow='clip' noWrap={true}>
                                {file.filename}
                            </Typography>
                        </Link>
                    </CardContent>
                </Card>
            </Grid>
        );
    });
    return (
        <CardContent>
            <Typography marginBottom={1} variant='h6'>
                Attachments
            </Typography>
            <Grid container spacing={2}>
                {fileList}
            </Grid>
        </CardContent>
    )
}

const Comments = ({ comments, totalComments }) => {
    if (comments.lengt !== 0) {
        const commentList = comments.map(comment => <Comment comment={comment} key={comment._id} />);
        return (
            <>
                <Typography paddingLeft={2} variant='h6'>
                    Comments ({totalComments})
                </Typography>
                {commentList}
            </>
        )
    }
    else {
        return (
            <>
                <Typography variant='h1' textAlign='center'>
                    No Comments
                </Typography>
            </>
        );
    }

}

const Comment = ({ comment }) => {
    return (
        <Grid item xs={12} >
            <Grid item xs={12} lg={6}>
                <Card raised>
                    <CardHeader
                        sx={{ paddingBottom: 0 }}
                        title={comment.author}
                        subheader={parseDate(comment.createdAt)}
                        titleTypographyProps={{ variant: 'subtitle', fontWeight: 'bold' }}
                        subheaderTypographyProps={{ variant: 'caption' }}
                    />
                    <CardContent sx={{ paddingY: 0 }}>
                        <Typography variant="body2" color="text.secondary">
                            {comment.comment}
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
};

const useStyles = makeStyles(theme => ({
    createBtn: {
        '&:hover':{
            color: theme.palette.primary.main
        }
    },
    btn: {
        '&:hover':{
            color: theme.palette.info.main
        }
    }
}));

const Post = ({ post, auth }) => {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);
    const navigate = useNavigate();
    const { class_id } = useParams();
    const [comments, setComments] = useState(post.comments);
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' });
    const [comment, setComment] = useState('');

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const handleChange = (evt) => {
        setComment(evt.target.value);
    };

    const handleComment = () => {
        const form = new FormData();
        form.append('comment', comment);
        call('post', `${auth.role}/classrooms/${class_id}/posts/${post._id}/comments`, form).then(data => {
            setNotify({ isOpen: true, message: 'Comment created successfully!', type: 'success' });
            setComments((cur) => [data, ...cur]);
            setComment('');
        }).catch(err => {
            if (err.response) {
                setNotify({ isOpen: true, message: err.response.data.error, type: 'error' });
            }
            else {
                setNotify({ isOpen: true, message: 'Could not post comment!', type: 'error' });
            }
        });
    }

    return (
        <Grid item xs={12}>
            <Card raised>
                <CardHeader
                    avatar={
                        <Avatar sx={{ bgcolor: pickColor(post._id) }} >
                            {String(post.content.title).toUpperCase()[0]}
                        </Avatar>
                    }
                    action={
                        (auth.role === 'faculty' ? (
                            <IconButton className={classes.btn} aria-label="edit" onClick={() => navigate(`post/${post._id}`)}>
                                <EditIcon />
                            </IconButton>
                        ) : null)
                    }
                    title={post.content.title}
                    subheader={parseDate(post.createdAt)}
                    titleTypographyProps={{ variant: 'h6', fontWeight: 'bold' }}
                    subheaderTypographyProps={{ variant: 'caption' }}
                />
                {(post.content.subtitle || post.content.info) ?
                    (
                        <CardContent>
                            {
                                post.content.subtitle ?
                                    (
                                        <Typography variant="h6" color="text.secondary">
                                            {post.content.subtitle}
                                        </Typography>
                                    ) : null
                            }
                            {
                                post.content.info ?
                                    (
                                        <Typography variant="body2" color="text.secondary">
                                            {post.content.info}
                                        </Typography>
                                    ) : null
                            }
                        </CardContent>
                    ) : null
                }
                {
                    post.files.length ? (
                        <Files files={post.files} />
                    ) : null
                }
                <CardActions disableSpacing>
                    <Paper
                        component="form"
                        sx={{ p: '2px 4px', marginX: 1, display: 'flex', alignItems: 'center', flexGrow: 1 }}
                    >
                        <InputBase
                            sx={{ ml: 1, flex: 1 }}
                            placeholder="Comment"
                            inputProps={{ 'aria-label': 'Comment', value: comment, onChange: handleChange }}
                        />
                        <IconButton className={classes.createBtn} onClick={handleComment} sx={{ p: '10px' }} aria-label="search">
                            <CreateIcon />
                        </IconButton>
                    </Paper>
                    <ExpandMore
                        expand={expanded}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show comments"
                        className={classes.btn}
                        title={`${post.totalComments} Comments`}
                    >
                        <ExpandMoreIcon />
                    </ExpandMore>
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <Divider />
                    <CardContent>
                        <Grid container spacing={2}>
                            <Comments comments={comments} totalComments={comments.length} />
                        </Grid>
                    </CardContent>
                </Collapse>
            </Card>
            <Notification notify={notify} setNotify={setNotify} />
        </Grid>
    );
}

export default Post;