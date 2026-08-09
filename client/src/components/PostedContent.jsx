import { Avatar, Box, Button, Link, Menu, MenuItem, Stack, TextField, Typography, CircularProgress } from "@mui/material";
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import AddCommentIcon from '@mui/icons-material/AddComment';
import ShareIcon from '@mui/icons-material/Share';
import CheckIcon from '@mui/icons-material/Check';
import useDoLikeOrDislike from '../hooks/useDoLikeOrDislike.jsx';
import useCaptureAndSendComment from '../hooks/useCaptureAndSendComment.jsx';
import Comments from "./Comments.jsx";
import CommentSkeleton from './CommentSkeleton.jsx';
import { InputAdornment } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ReportIcon from '@mui/icons-material/Report';
import useGetCurrentUser from '../hooks/useGetCurrentUser.jsx';
import useDeletePost from '../hooks/useDeletePost.jsx';
import PopUpEdit from './PopUpEdit.jsx';
import { useMediaQuery } from '@mui/material';
import ImageViewer from "./ImageViewer.jsx";
import { useSelector } from "react-redux";
import useGetProfileImage from '../hooks/useGetProfileImage';
import useGetGalleryImage from '../hooks/useGetGalleryImage';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';
import '../assets/styles.css';

export default function PostedContent({ token, post, handleFeedReload, isolated }) {
    const { user } = useGetCurrentUser({ token });
    const [updatePost, setUpdatePost] = useState(false);
    const [comment, setComment] = useState([]);
    const [currentLikes, setCurrentLikes] = useState(0);
    const [currentDislikes, setCurrentDislikes] = useState(0);
    const [currentComments, setCurrentComments] = useState([]);
    const [liked, setLiked] = useState(false);
    const [disliked, setDisliked] = useState(false);
    const [commentBoxOpen, setCommentBoxOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [shareCopied, setShareCopied] = useState(false);
    const [relativeDate, setRelativeDate] = useState('');
    const open = Boolean(anchorEl);
    const { sendDoUndo_Like, sendDoUndo_Dislike, successLD, setSuccessLD, likes, dislikes } = useDoLikeOrDislike({ token })
    const { sendComment, handleCapture, successComment, setSuccessComment, newCurrentComments, commentSending } = useCaptureAndSendComment({ token })
    const { deletePost, msgDelPost, successDelete, setSuccessDelete } = useDeletePost({ token, postId: post.postId })
    const [imgClickedPath, setImgClickedPath] = useState(null)
    const isDesktop = useMediaQuery('(min-width: 900px)');
    const isTablet = useMediaQuery('(min-width: 426px) and (max-width: 899px)');
    const className = useSelector((state) => state.className);
    const { image } = useGetProfileImage({ id: post.username })
    const { images: userImages } = useGetGalleryImage({ username: post.username, paths: post.images })

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const reactionTextStyles = {
        marginLeft: '6px',
        display: 'inline'
    }

    const avatarStyles = {
        width: isDesktop ? '48px' : '38px',
        height: isDesktop ? '48px' : '38px'
    }

    const userNameStyles = {
        fontSize: '15px',
        fontWeight: 600
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
        setLiked((prev) => !prev);
        setDisliked(false);
    }

    const dislikeThePost = async () => {
        sendDoUndo_Dislike(post.postId);
        setDisliked((prev) => !prev);
        setLiked(false);
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
        element.classList.toggle('fadeIn');
        setCommentBoxOpen((prev) => !prev);
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

    const handleSharePost = async () => {
        const frontendUrl = import.meta.env.VITE_FRONTEND || window.location.origin;
        const shareUrl = `${frontendUrl}/posts/${post.postId}`;
        try {
            if (navigator.share) {
                await navigator.share({
                    title: 'Node Network',
                    text: post.content,
                    url: shareUrl
                });
            } else if (navigator.clipboard) {
                await navigator.clipboard.writeText(shareUrl);
                setShareCopied(true);
                setTimeout(() => setShareCopied(false), 2000);
            } else {
                // Sin API de compartir ni portapapeles disponible
                window.prompt('Copia el enlace de la publicación:', shareUrl);
            }
        } catch (error) {
            // usuario canceló el compartir o falló el portapapeles
        }
    }

    const handleImageClicked = (event) => {
        if (event) {
            setImgClickedPath(event.target.src);
        }
    }

    const handleRemoveCommentFromDOM = (commentId) => {
        setCurrentComments(currentComments.filter(comment => comment.commentId !== commentId))
    }

    useEffect(() => {
        const onKey = (event) => {
            if (event.key === 'Escape') {
                setUpdatePost(false);
            }
        };
        document.addEventListener('keydown', onKey);
        return () => document.removeEventListener('keydown', onKey);
    }, [])

    useEffect(() => {
        setCurrentLikes(post.likesAuthors.length);
        setCurrentDislikes(post.dislikesAuthors.length);
        setCurrentComments(post.comments.map(comment => comment));
        setLiked((post.likesAuthors || []).some((author) => String(author) === String(user.userId)));
        setDisliked((post.dislikesAuthors || []).some((author) => String(author) === String(user.userId)));
        try {
            const date = new Date(post.date_created);
            setRelativeDate(formatDistanceToNow(date, { addSuffix: true, locale: es }));
        } catch (error) {
            setRelativeDate('');
        }
    }, [post, user.userId])

    useEffect(() => {
        if (successLD) {
            setCurrentLikes(likes)
            setCurrentDislikes(dislikes);
            setSuccessLD(false);
        }
    }, [successLD, likes, dislikes, setSuccessLD])

    useEffect(() => {
        if (successComment) {
            // setCurrentComments(0);
            setCurrentComments(newCurrentComments);
            setSuccessComment(false);
        }
    }, [successComment, newCurrentComments, setSuccessComment])

    useEffect(() => {
        if (successDelete) {
            alert(msgDelPost);
            (isolated) && window.location.reload()
            // document.querySelector('.post-container-id-' + post.postId).remove();
            handleFeedReload();
            setSuccessDelete(false);
        }
    })


    return (
        <>
            <Box className={`${className} feed-post-card post-container-id-${post.postId} fadeIn`}>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <HtmlTooltip
                            title={
                                <Box visibility={isDesktop ? 'visible' : 'hidden'} >
                                    <Typography color="inherit"></Typography>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                        <Link href="#" sx={{ textDecoration: 'none' }}><Avatar><img src={image} /></Avatar></Link>
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
                                <Link href={`/profile/${post.username}`} sx={{ textDecoration: 'none' }}><Avatar className="feed-avatar" sx={avatarStyles} ><img src={image} /></Avatar></Link>
                                <Link href={`/profile/${post.username}`} sx={{ textDecoration: 'none', ":hover": { textDecoration: 'underline', fontWeight: 'bold' } }}>
                                    {/* <p>{post.firstName}</p> */}
                                    <Typography sx={userNameStyles}>{post.username}</Typography>
                                </Link>
                            </Box>
                        </HtmlTooltip>

                        <Box sx={isDesktop ? { mt: '2%' } : { mt: '1%' }}>
                            <HtmlTooltip
                                title={
                                    <Typography color="inherit">
                                        {'Creado el ' + new Date(post.date_created).toLocaleDateString('es-MX', { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', timeZone: 'America/Mexico_City' })}
                                    </Typography>
                                }
                            >
                                <Typography className={`feed-date-pill ${className}`}>
                                    {relativeDate || 'Recién publicado'}
                                </Typography>
                            </HtmlTooltip>
                        </Box>
                    </Box>

                    {user.username === post.username &&
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
                                        className: className,
                                    },
                                }}
                            >
                                {user.username === post.username && (
                                    <Box>
                                        <MenuItem onClick={handleEditPost}><EditIcon sx={{ mr: '2%' }} />Editar</MenuItem>
                                        <MenuItem onClick={handleDeletePost}><DeleteIcon sx={{ mr: '2%' }} />Eliminar</MenuItem>
                                    </Box>
                                )}

                                {user.username === undefined || user.username === post.username ? null : <MenuItem onClick={handleClose}><ReportIcon sx={{ mr: '2%' }} />Denunciar</MenuItem>}
                            </Menu>
                        </Box>}
                </Box>

                <Box className={`feed-post-body ${className}`}>
                    <Typography sx={{ wordWrap: 'break-word', whiteSpace: 'normal', multiline: true }}>
                        {post.content}
                    </Typography>
                </Box>
                <Box className={`feed-post-media${userImages.length > 1 ? ' is-grid' : ''}`}>
                    {userImages !== undefined &&
                        userImages.map((elem, key) => (
                            <img onClick={handleImageClicked} className="feed-post-img" style={{ maxWidth: isDesktop || isTablet ? '75%' : '100%' }} key={key} src={elem} alt="imagen alternativa" onError={(e) => e.target.src = "https://via.placeholder.com/200x200/ffffff/000000?text=Imagen+No+Disponible&size=30"} loading="lazy" />
                        ))
                    }
                    {userImages.length > 1 && (
                        <Box className={`feed-media-badge ${className}`}>
                            {userImages.length} imágenes
                        </Box>
                    )}
                </Box>

                {currentComments.length > 0 && (
                    <Box className={`feed-stats ${className}`}>
                        <span><AddCommentIcon fontSize="inherit" /> {currentComments.length} Comentarios</span>
                    </Box>
                )}

                <Box sx={{ width: '100%' }}>
                    <Stack direction="row" className="feed-reactions">
                        <Button className={`feed-reaction-btn like-btn${liked ? ' is-active' : ''}`} onClick={likeThePost}>
                            <ThumbUpIcon /> <span className={`${className} feed-reaction-label`} style={reactionTextStyles}> Me Gusta {currentLikes > 0 && <span className="feed-count-pill has-count">{currentLikes}</span>} </span>
                        </Button>
                        <Button className={`feed-reaction-btn dislike-btn${disliked ? ' is-active' : ''}`} onClick={dislikeThePost}>
                            <ThumbDownIcon color="error" /> <span className={`${className} feed-reaction-label`} style={reactionTextStyles}> No Me Gusta {currentDislikes > 0 && <span className="feed-count-pill has-count">{currentDislikes}</span>} </span>
                        </Button>
                        <Button className={`feed-reaction-btn comment-btn${commentBoxOpen ? ' is-active' : ''}`} onClick={() => toggleCommentBox(post.postId)}>
                            <AddCommentIcon /> <span className={`${className} feed-reaction-label`} style={reactionTextStyles}> Comentar {currentComments.length > 0 && <span className="feed-count-pill has-count">{currentComments.length}</span>} </span>
                        </Button>
                        <Button className={`feed-reaction-btn share-btn${shareCopied ? ' is-active' : ''}`} onClick={handleSharePost}>
                            {shareCopied ? <CheckIcon /> : <ShareIcon />} <span className={`${className} feed-reaction-label`} style={reactionTextStyles}> {shareCopied ? 'Copiado' : 'Compartir'} </span>
                        </Button>
                    </Stack>
                </Box>

                <Box id={"comment-box-" + post.postId} className={"hidden comment-box-" + post.postId}>
                    <TextField
                        sx={{ mt: '2%', mb: '2%' }}
                        required
                        multiline
                        variant="outlined"
                        size="small"
                        label="comentar en la publicacion"
                        fullWidth
                        className={`feed-comment-input ${className}`}
                        value={comment}
                        onChange={handleChangeCapture}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment
                                    sx={{ cursor: commentSending ? 'default' : 'pointer', opacity: commentSending ? 0.5 : 1 }}
                                    onClick={(event) => { if (!commentSending) handleSubmitComment(event) }}
                                    position="end"
                                >
                                    {commentSending ? <CircularProgress size={18} /> : <SendIcon />}
                                </InputAdornment>
                            ),
                        }}
                    />
                </Box>

                {(currentComments.length > 0 || commentSending) &&
                    <>
                        <Typography className="feed-comments-heading">Comentarios</Typography>
                        {commentSending && <CommentSkeleton count={1} />}
                        {currentComments.map(comment => <Comments key={comment.commentId} comment={comment} token={token} handleRemoveCommentFromDOM={handleRemoveCommentFromDOM} />)}
                    </>
                }
            </Box>
            {updatePost && <PopUpEdit token={token} post={post} setUpdatePost={setUpdatePost} type={'post'} />}
            <ImageViewer image={imgClickedPath} setImgClickedPath={setImgClickedPath} images={userImages} />
        </>
    )
}

PostedContent.propTypes = {
    token: PropTypes.string,
    post: PropTypes.object.isRequired,
    handleFeedReload: PropTypes.func,
    isolated: PropTypes.bool
};

