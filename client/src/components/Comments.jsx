import PropTypes from 'prop-types'
import { Box, Button, Avatar, Typography, Stack, Link, Menu, MenuItem } from '@mui/material'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import useCommentLikesAndDislikes from '../hooks/useCommentLikesAndDislikes';
import { useSelector } from "react-redux";
import useGetCurrentUser from '../hooks/useGetCurrentUser';
import useDeleteComment from '../hooks/useDeleteComment';
import PopUpEdit from './PopUpEdit.jsx';
import useGetProfileImage from '../hooks/useGetProfileImage';
import { Skeleton } from '@mui/material';

export default function Comments({ comment, token, handleRemoveCommentFromDOM }) {
    const [updatePost, setUpdatePost] = useState(false);
    const { commentDeleteSuccess, deleteComment, setCommentDeleteSuccess } = useDeleteComment({ token });
    const { user } = useGetCurrentUser({ token });
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const [formattedDate, setFormattedDate] = useState('');
    const [currentLikes, setCurrentLikes] = useState(0);
    const [currentDislikes, setCurrentDislikes] = useState(0);
    const [liked, setLiked] = useState(false);
    const [disliked, setDisliked] = useState(false);
    const { getCommentLikesAndDislikes, setCommentLike, setCommentDislike, likes, dislikes, liked: hookLiked, disliked: hookDisliked, success, loading } = useCommentLikesAndDislikes({ comment, token });
    const { image } = useGetProfileImage({ id: comment.username })

    const className = useSelector((state) => state.className);

    const reactionTextStyles = {
        marginLeft: '6px'
    }

    const avatarStyles = {
        width: '36px',
        height: '36px'
    }

    const userNameStyles = {
        fontSize: '14px',
        fontWeight: 600
    }

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleDeleteComment = () => {
        const result = window.confirm('¿Seguro que quieres borrar este comentario?');
        (result) && deleteComment(comment.commentId)
        setAnchorEl(null)
    }

    const handleEditPost = () => {
        handleClose();
        setUpdatePost(true);
    }

    useEffect(() => {
        const date = new Date(comment.date_created);
        const formatted = format(date, 'dd MMMM yyyy', { locale: es });
        setFormattedDate(formatted);
    }, [comment.date_created]);

    useEffect(() => { // se ejecuta unicamente una vez, al montar el componente
        getCommentLikesAndDislikes();
    }, [getCommentLikesAndDislikes])

    useEffect(() => {
        if (likes !== undefined) setCurrentLikes(likes);
        if (dislikes !== undefined) setCurrentDislikes(dislikes);
        if (hookLiked !== undefined) setLiked(hookLiked);
        if (hookDisliked !== undefined) setDisliked(hookDisliked);
    }, [likes, dislikes, hookLiked, hookDisliked])

    useEffect(() => {
        if (success) {
            getCommentLikesAndDislikes();
        }
    }, [success, getCommentLikesAndDislikes])

    useEffect(() => {
        if (commentDeleteSuccess) {
            alert('comentario eliminado exitosamente')
            handleRemoveCommentFromDOM(comment.commentId)
            setCommentDeleteSuccess(false)
        }
    }, [commentDeleteSuccess, comment.commentId, handleRemoveCommentFromDOM, setCommentDeleteSuccess])  

    return (
        <Box id={comment.commentId} className={`${className} feed-comment`} value={comment.commentId} sx={{ display: 'block', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Link sx={{ display: 'flex', alignItems: 'center', gap: '10px' }} href={`/profile/${comment.username}`} style={{ textDecoration: 'none', cursor: 'pointer' }}>
                        <Avatar className="feed-avatar" sx={avatarStyles}><img src={image} /></Avatar>
                        <Typography sx={userNameStyles}> {comment.username} </Typography>
                    </Link>
                    <Typography className={`feed-comment-date ${className}`} style={reactionTextStyles}> creado el {formattedDate} </Typography>
                </Box>
                {user.username === comment.username &&
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
                            {user.username === comment.username && (
                                <Box>
                                    <MenuItem onClick={handleEditPost}><EditIcon sx={{ mr: '2%' }} />Editar</MenuItem>
                                    <MenuItem onClick={handleDeleteComment} ><DeleteIcon sx={{ mr: '2%' }} />Eliminar</MenuItem>
                                </Box>
                            )}

                            {/* {user.username === undefined || user.username === comment.username ? null : <MenuItem onClick={handleClose}><ReportIcon sx={{ mr: '2%' }} />Denunciar</MenuItem>} */}
                        </Menu>
                    </Box>}
            </Box>
            <Box className={`feed-comment-body ${className}`}>
                <Typography variant="body2"> {comment.content} </Typography>
            </Box>
            {loading ? (
                <Box className="feed-comment-actions">
                    <Skeleton variant="rounded" width={120} height={34} sx={{ bgcolor: className === 'bgx-black' ? '#2a2a34' : '#e5e7eb' }} />
                    <Skeleton variant="rounded" width={140} height={34} sx={{ bgcolor: className === 'bgx-black' ? '#2a2a34' : '#e5e7eb' }} />
                </Box>
            ) : (
                <Stack direction="row" className="feed-comment-actions">
                    <Button className={`feed-reaction-btn like-btn${liked ? ' is-active' : ''}`} onClick={setCommentLike}>
                        <ThumbUpIcon /> <span className={`${className} feed-reaction-label`} style={reactionTextStyles}> Me Gusta {currentLikes > 0 && <span className="feed-count-pill has-count">{currentLikes}</span>} </span>
                    </Button>
                    <Button className={`feed-reaction-btn dislike-btn${disliked ? ' is-active' : ''}`} onClick={setCommentDislike}>
                        <ThumbDownIcon color="error" /> <span className={`${className} feed-reaction-label`} style={reactionTextStyles}> No Me Gusta {currentDislikes > 0 && <span className="feed-count-pill has-count">{currentDislikes}</span>} </span>
                    </Button>
                </Stack>
            )}
            {updatePost && <PopUpEdit token={token} post={comment} setUpdatePost={setUpdatePost} type={'comment'} />}
        </Box>
    )
}

Comments.propTypes = {
    comment: PropTypes.object.isRequired,
    token: PropTypes.string,
    handleRemoveCommentFromDOM: PropTypes.func
}