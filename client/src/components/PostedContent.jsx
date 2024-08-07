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
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ReportIcon from '@mui/icons-material/Report';
import useGetCurrentUser from '../hooks/useGetCurrentUser.jsx';
import useDeletePost from '../hooks/useDeletePost.jsx';
// import useEditPost from '../hooks/useEditPost.jsx';
import PopUpEditPost from './PopUpEditPost.jsx';
import { useMediaQuery } from '@mui/material';

export default function PostedContent({ token, post }) {
    const { user, error } = useGetCurrentUser({ token });
    const [updatePost, setUpdatePost] = useState(false);
    const [comment, setComment] = useState([]);
    const [currentPost, setCurrentPost] = useState(post);
    const [currentLikes, setCurrentLikes] = useState(0);
    const [currentDislikes, setCurrentDislikes] = useState(0);
    const [currentComments, setCurrentComments] = useState({});
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const { sendDoUndo_Like, sendDoUndo_Dislike, liked, disliked, errorLD, successLD, msgLD, setMsgLD, setSuccessLD, likes, dislikes } = useDoLikeOrDislike({ token })
    const { sendComment, handleCapture, newComment, messageComment, errorComment, successComment, setSuccessComment, newCurrentComments } = useCaptureAndSendComment({ token })
    const { deletePost, msgDelPost, errDel, successDelete, setSuccessDelete } = useDeletePost({ token, postId: post.postId })

    const isDesktop = useMediaQuery('(min-width: 900px)');
    const isTablet = useMediaQuery('(min-width: 426px) and (max-width: 899px)');
    const isMobile = useMediaQuery('(max-width: 423vw)');

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const reactionIconStyles = {
        fontSize: isDesktop ? '1vw' : isTablet ? '2vw' : '5vw'        
    }

    const reactionTextStyles = {
        fontSize: isDesktop ? '1vw' : isTablet ? '2vw' : '2.5vw',
        marginLeft: '5px'
    }

    const avatarStyles = {
        width: isDesktop ? '50px' : isTablet ? '50px' : '30px',
        height: isDesktop ? '50px' : isTablet ? '50px' : '30px'
    }

    const userNameStyles = {
        fontSize: isDesktop ? '20px' : isTablet ? '20px' : '12px'
    }

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

    const toggleCommentBox = () => {
        const element = document.querySelector('.comment-box-' + post.postId);
        element.classList.toggle('hidden');
    }

    const handleEditPost = () => {
        handleClose();
        setUpdatePost(true);
    }

    const handleDeletePost = () => {
        handleClose();
        const result = window.confirm('¿Seguro que quieres borrar este post?');
        (result) && deletePost();
    }

    const handleKeyPress = (event) => {
        if (event.key === 'Escape') {
            setUpdatePost(false);
        }
    }

    useEffect(() => {
        document.addEventListener('keydown', handleKeyPress)
    }, [])

    useEffect(() => {
        setCurrentLikes(post.likesAuthors.length);
        setCurrentDislikes(post.dislikesAuthors.length);
        setCurrentComments(post.comments.map(comment => comment))
    }, [post])

    useEffect(() => {
        if (successLD) {
            setCurrentLikes(likes)
            setCurrentDislikes(dislikes);
            setSuccessLD(false);
        }
    }, [successLD])

    useEffect(() => {
        if (successComment) {
            setCurrentComments(0);
            setCurrentComments(newCurrentComments);
            setSuccessComment(false);
        }
    }, [successComment])

    useEffect(() => {
        if (successDelete) {
            alert(msgDelPost);
            document.querySelector('.post-container-id-' + post.postId).remove();
            setSuccessDelete(false);
        }
    })

    return (
        <>
            <Box className={"bgx-black post-container-id-" + post.postId} sx={{ borderRadius: '5px', p: isDesktop ? 5 : 1, border: '1px solid black', mt: '2%' }}>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>

                    <HtmlTooltip
                        title={
                            <Box visibility={isDesktop ? 'visible' : 'hidden'} >
                                <Typography color="inherit"></Typography>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <Link href="#" sx={{ textDecoration: 'none' }}><Avatar>{post.username.substring(0, 1).toUpperCase()}</Avatar></Link>
                                    <Link sx={{ textDecoration: 'none', ":hover": { textDecoration: 'underline', fontWeight: 'bold' } }} href="#"><p> {post.username} </p></Link>
                                </Box>
                                <Typography variant="h6">
                                    <Box>nombre: {post.firstName}</Box>
                                    <Box>correo: {post.email}</Box>
                                    <Box>se unio en: {
                                        new Date(post.createdAt).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })
                                    }</Box>
                                </Typography>
                            </Box>
                        }
                    >
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <Link href={`https://node-network-chi.vercel.app/profile/${post.username}`} sx={{ textDecoration: 'none' }}><Avatar sx={avatarStyles} >{post.username.substring(0, 1).toUpperCase()}</Avatar></Link>
                            <Link href={`https://node-network-chi.vercel.app/profile/${post.username}`} sx={{ textDecoration: 'none', ":hover": { textDecoration: 'underline', fontWeight: 'bold' } }}>
                                {/* <p>{post.firstName}</p> */}
                                <Typography sx={userNameStyles}>{post.firstName}</Typography>
                            </Link>
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
                                    className: 'bgx-black',
                                },
                            }}
                        >
                            {user.username === post.username &&
                                (<Box><MenuItem onClick={handleEditPost}><EditIcon sx={{ mr: '2%' }} />Editar</MenuItem>
                                    <MenuItem onClick={handleDeletePost}><DeleteIcon sx={{ mr: '2%' }} />Eliminar</MenuItem></Box>)
                            }

                            <MenuItem onClick={handleClose}><ReportIcon sx={{ mr: '2%' }} />Denunciar</MenuItem>
                        </Menu>
                    </Box>

                </Box>
                <Box sx={isDesktop ? { mt: '2%' } : { mt: '1%' }}>
                    <Typography style={reactionTextStyles}>
                        {new Date(post.date_created).toLocaleDateString('es-MX', { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', timeZone: 'America/Mexico_City' })}
                    </Typography>
                </Box>

                <Box sx={{ mb: '2%', mt: '2%', maxWidth: '100%', border: '1px solid grey', padding: '8px' }}>
                    <Typography sx={{ wordWrap: 'break-word', whiteSpace: 'normal', multiline: true, textAlign: 'justify' }}>
                        {post.content}
                    </Typography>
                </Box>
                <Box sx={{ p: isDesktop ? 1 : 0, width: '100%' }}>
                    <Stack direction="row" sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Button onClick={likeThePost}>
                            <ThumbUpIcon sx={reactionIconStyles} /> <span style={reactionTextStyles}> Me Gusta ({currentLikes}) </span>
                        </Button>
                        <Button onClick={dislikeThePost}>
                            <ThumbDownIcon sx={reactionIconStyles} color="error" /> <span style={reactionTextStyles}> No Me Gusta ({currentDislikes}) </span>
                        </Button>
                        <Button onClick={() => toggleCommentBox(post.postId)}>
                            <AddCommentIcon sx={reactionIconStyles} color="warning" /> <span style={reactionTextStyles}> Comentar </span>
                        </Button>
                    </Stack>
                </Box>

                {currentComments.length > 0 &&
                    currentComments.map(comment => <Comments key={comment.commentId} comment={comment} token={token} />)
                }

                <Box id={"comment-box-" + post.postId} className={"hidden comment-box-" + post.postId}>
                    <TextField
                        required
                        multiline
                        variant="filled"
                        size="small"
                        label="comentar en la publicacion"
                        fullWidth
                        className="bgx-white"
                        value={comment}
                        onChange={handleChangeCapture}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment sx={{ cursor: "pointer" }} onClick={(event) => { handleSubmitComment(event) }} position="end">
                                    <SendIcon />
                                </InputAdornment>
                            ),
                        }}
                    />
                </Box>
            </Box>
            {updatePost && <PopUpEditPost token={token} post={post} setUpdatePost={setUpdatePost} />}
        </>
    )
}

