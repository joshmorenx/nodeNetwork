import PropTypes from 'prop-types'
import { Box, Button, Avatar, Typography, Stack, Link, Menu, MenuItem } from '@mui/material'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ReportIcon from '@mui/icons-material/Report';
import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import useCommentLikesAndDislikes from '../hooks/useCommentLikesAndDislikes';
import { useMediaQuery } from '@mui/material';
import { useSelector } from "react-redux";
import useGetCurrentUser from '../hooks/useGetCurrentUser';
import useDeleteComment from '../hooks/useDeleteComment';
import PopUpEdit from './PopUpEdit.jsx';
import useGetProfileImage from '../hooks/useGetProfileImage';
import Badge from '@mui/material/Badge';

export default function Comments({ comment, token, handleRemoveCommentFromDOM }) {
    const [updatePost, setUpdatePost] = useState(false);
    const { commentDeleteSuccess, msgDeleteComment, errorDeleteComment, deleteComment, setCommentDeleteSuccess } = useDeleteComment({ token });
    const { user } = useGetCurrentUser({ token });
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const [formattedDate, setFormattedDate] = useState('');
    const [currentLikes, setCurrentLikes] = useState(0);
    const [currentDislikes, setCurrentDislikes] = useState(0);
    const { getCommentLikesAndDislikes, setCommentLike, setCommentDislike, likes, dislikes, error, success, setSuccess, msg } = useCommentLikesAndDislikes({ comment, token });
    const { image, imageError } = useGetProfileImage({ id: comment.username })
    const isDesktop = useMediaQuery('(min-width: 900px)');
    const isTablet = useMediaQuery('(min-width: 426px) and (max-width: 899px)');
    const isMobile = useMediaQuery('(max-width: 423vw)');

    const className = useSelector((state) => state.className);

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
    }, [])

    useEffect(() => {
        if (likes !== undefined) setCurrentLikes(likes);
        if (dislikes !== undefined) setCurrentDislikes(dislikes);
    }, [likes, dislikes])

    useEffect(() => {
        if (success) {
            getCommentLikesAndDislikes();
        }
    }, [success])

    useEffect(() => {
        if (commentDeleteSuccess) {
            alert('comentario eliminado exitosamente')
            handleRemoveCommentFromDOM(comment.commentId)
            setCommentDeleteSuccess(false)
        }
    }, [commentDeleteSuccess])  

    return (
        <Box id={comment.commentId} className={className} value={comment.commentId} sx={{ display: 'block', alignItems: 'center', border: '1px solid grey', borderRadius: '1vw', padding: '1vw', mb: '1vw' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Link sx={{ display: 'flex', alignItems: 'center', gap: '10px' }} href={`/profile/${comment.username}`} style={{ textDecoration: 'none', cursor: 'pointer' }}>
                        <Avatar sx={avatarStyles}><img src={image} /></Avatar>
                        <Typography sx={userNameStyles}> {comment.username} </Typography>
                    </Link>
                    <Typography style={reactionTextStyles} sx={{ ml: '10px', border: '1px solid grey', padding: '5px', color: 'white', bgcolor: 'black', borderRadius: '5px', width: 'fit-content' }}> creado el {formattedDate} </Typography>
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
                                    className: { className },
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
            <Box sx={{ alignItems: 'center', border: '1px solid grey', borderRadius: '1vw', margin: '8px', padding: '8px' }}>
                <Typography variant="body2"> {comment.content} </Typography>
            </Box>
            <Stack direction="row" sx={{ display: 'flex', gap: '10vw' }}>
                <Button onClick={setCommentLike}>
                    <ThumbUpIcon sx={reactionIconStyles} /> <span className={className} style={reactionTextStyles}> Me Gusta <Badge sx={{ ml: 2 }} badgeContent={currentLikes === 0 ? '0' : currentLikes} color="primary"/> </span>
                </Button>
                <Button onClick={setCommentDislike}>
                    <ThumbDownIcon sx={reactionIconStyles} color="error" /> <span className={className} style={reactionTextStyles}> No Me Gusta <Badge sx={{ ml: 2 }} badgeContent={currentDislikes > 0 ? currentDislikes : '0'} color="error"/> </span>
                </Button>
            </Stack>
            {updatePost && <PopUpEdit token={token} post={comment} setUpdatePost={setUpdatePost} type={'comment'} />}
        </Box>
    )
}

PropTypes.propTypes = {
    comment: PropTypes.object,
    token: PropTypes.string
}