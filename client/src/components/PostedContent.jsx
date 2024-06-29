import { Avatar, Box, Button, Link, Menu, MenuItem, Stack, TextField, Typography } from "@mui/material";
import { useState, useEffect } from 'react';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import AddCommentIcon from '@mui/icons-material/AddComment';
import useDoLikeOrDislike from '../hooks/useDoLikeOrDislike.jsx';
import useCaptureAndSendComment from '../hooks/useCaptureAndSendComment.jsx';
import Comments from "./Comments.jsx";
import { InputAdornment } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

export default function PostedContent({ token, post }) {
    const [comment, setComment] = useState([]);
    const [currentPost, setCurrentPost] = useState(post);	
    const [currentLikes, setCurrentLikes] = useState(0);
    const [currentDislikes, setCurrentDislikes] = useState(0);
    const [currentComments, setCurrentComments] = useState({});
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const { sendDoUndo_Like, sendDoUndo_Dislike, liked, disliked, errorLD, successLD, msgLD, setMsgLD, setSuccessLD, likes, dislikes } = useDoLikeOrDislike({ token })
    const { sendComment, handleCapture, newComment, messageComment, errorComment, successComment, setSuccessComment, newCurrentComments } = useCaptureAndSendComment({ token })

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const HtmlTooltip = styled(({ className, ...props }) => (
        <Tooltip {...props} classes={{ popper: className }} />
    ))(({ theme }) => ({
        [`& .${tooltipClasses.tooltip}`]: {
            backgroundColor: '#f5f5f9',
            color: 'rgba(0, 0, 0, 0.87)',
            maxWidth: 400,
            fontSize: theme.typography.pxToRem(12),
            border: '1px solid #dadde9',
        },
    }));

    const likeThePost = async () => {
        sendDoUndo_Like(post.postId);
    }

    const dislikeThePost = async () => {
        sendDoUndo_Dislike(post.postId);
    }

    const handleChangeCapture = (event) => {
        setComment(event.target.value);
        handleCapture(event);
    }

    const handleSubmitComment = async (event) => {
        event.preventDefault();
        sendComment(post.postId);
        setComment('')
    }

    useEffect(() => {
        setCurrentLikes(post.likesAuthors.length);
        setCurrentDislikes(post.dislikesAuthors.length);
        setCurrentComments(post.comments.map(comment => comment))
    }, [post])

    useEffect(() => {
        if(successLD){
            setCurrentLikes(likes)
            setCurrentDislikes(dislikes);
            setSuccessLD(false);
        }
    }, [successLD])

    useEffect(() => {
        if(successComment){
            setCurrentComments(0);
            setCurrentComments(newCurrentComments);
            setSuccessComment(false);
        }
    }, [successComment])

    return (
        <Box sx={{ borderRadius: '5px', bgcolor: 'pink', p: 5, border: '1px solid black', mt: '2%' }}>
            
            <Box id="postId" className="postId hidden" name="postId">{post.postId}</Box> {/* for post handling and content manipulation eg. delete, edit, like, dislike, comment */}
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>

                <HtmlTooltip
                    title={
                        <>
                            <Typography color="inherit"></Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <Link href="#" sx={{ textDecoration: 'none' }}><Avatar>{post.username.substring(0, 1).toUpperCase()}</Avatar></Link>
                                <Link sx={{ color: 'black', textDecoration: 'none', ":hover": { color: 'black', textDecoration: 'underline', fontWeight: 'bold' } }} href="#"><p> {post.username} </p></Link>
                            </Box>
                            <Typography variant="h6">
                                <Box>nombre: {post.firstName}</Box>
                                <Box>correo: {post.email}</Box>
                                <Box>se unio en: {
                                    new Date(post.createdAt).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })
                                }</Box>
                            </Typography>
                        </>
                    }
                >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <Link href="#" sx={{ textDecoration: 'none' }}><Avatar>{post.username.substring(0, 1).toUpperCase()}</Avatar></Link>
                        <Link sx={{ color: 'black', textDecoration: 'none', ":hover": { color: 'black', textDecoration: 'underline', fontWeight: 'bold' } }} href="#"><p>{post.firstName}</p></Link>
                    </Box>
                </HtmlTooltip>

                <Box>
                    <Button
                        id="right-top-btn"
                        aria-controls={open ? 'btn-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                    >
                        <MoreHorizIcon />
                    </Button>
                    {/* menu desplegable */}
                    <Menu
                        id="btn-menu"
                        aria-labelledby="right-top-btn"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        slotProps={{
                            paper: {
                                sx: {
                                    backgroundColor: 'pink',
                                    border: '1px solid black',
                                },
                            },
                        }}
                    >
                        <MenuItem onClick={handleClose}>Editar</MenuItem>
                        <MenuItem onClick={handleClose}>Eliminar</MenuItem>
                    </Menu>
                </Box>

            </Box>
            <Box sx={{ bgcolor: 'black', color: 'white', p: 1, width: '35%' }}>
                {new Date(post.date_created).toLocaleDateString('es-MX', { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', timeZone: 'America/Mexico_City' })}
            </Box>

            <Box sx={{ mb: '2%', mt: '2%', maxWidth: '100%', border: '1px solid grey', padding: '8px' }}>
                <Typography variant="h4" sx={{ wordWrap: 'break-word', whiteSpace: 'normal', multiline: true, textAlign: 'justify' }}>
                    {post.content}
                </Typography>
            </Box>
            <Box sx={{ color: 'white', p: 1, width: '100%' }}>
                <Stack direction="row" sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Button onClick={ likeThePost }>
                        <ThumbUpIcon /> <span style={{ marginLeft: '5px'}}> Me Gusta ({ currentLikes }) </span>
                    </Button>
                    <Button onClick={ dislikeThePost }>
                        <ThumbDownIcon color="error" /> <span style={{ marginLeft: '5px'}}> No Me Gusta ({ currentDislikes }) </span>
                    </Button>
                    <Button>
                        <AddCommentIcon color="warning" /> <span style={{ marginLeft: '5px'}}> Comentar </span>
                    </Button>
                </Stack>
            </Box>

            { currentComments.length > 0 && 
                currentComments.map(comment => <Comments key={comment.commentId} comment={comment} />)
            }

            <Box>
                <TextField
                    required
                    variant="filled"
                    size="small"
                    label="comentar en la publicacion"
                    fullWidth
                    value = { comment }
                    onChange={ handleChangeCapture }
                    InputProps={{
                        endAdornment: (
                            <InputAdornment sx={{ cursor:"pointer" }} onClick={(event) => { handleSubmitComment(event) } } position="end">
                                <SendIcon />
                            </InputAdornment>
                        ),
                    }}      
                />
            </Box>
        </Box>
    )
}
