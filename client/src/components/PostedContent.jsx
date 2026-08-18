import { Avatar, Box, Button, Link, Menu, MenuItem, Stack, TextField, Typography, Snackbar, Alert, CircularProgress } from "@mui/material";
import { useState, useEffect } from 'react';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ShareIcon from '@mui/icons-material/Share';
import { styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import AddCommentIcon from '@mui/icons-material/AddComment';
import useDoLikeOrDislike from '../hooks/useDoLikeOrDislike.jsx';
import useCaptureAndSendComment from '../hooks/useCaptureAndSendComment.jsx';
import Comments from "./Comments.jsx";
import ContentText from "./ContentText.jsx";
import MentionTextField from "./MentionTextField.jsx";
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
import useGetPostVideo from '../hooks/useGetPostVideo.jsx';
import '../assets/styles.css';
import Badge from '@mui/material/Badge';

export default function PostedContent({ token, post, handleFeedReload, isolated }) {
    const frontendUrl = import.meta.env.VITE_FRONTEND
    const { user, error } = useGetCurrentUser({ token });
    const [updatePost, setUpdatePost] = useState(false);
    const [comment, setComment] = useState([]);
    const [currentPost, setCurrentPost] = useState(post);
    const [currentLikes, setCurrentLikes] = useState(0);
    const [currentDislikes, setCurrentDislikes] = useState(0);
    const [currentComments, setCurrentComments] = useState([]);
    const [anchorEl, setAnchorEl] = useState(null);
    const [shareOpen, setShareOpen] = useState(false);
    const open = Boolean(anchorEl);
    const { sendDoUndo_Like, sendDoUndo_Dislike, liked, disliked, errorLD, successLD, msgLD, setMsgLD, setSuccessLD, likes, dislikes } = useDoLikeOrDislike({ token })
    const { sendComment, handleCapture, newComment, messageComment, errorComment, successComment, setSuccessComment, newCurrentComments } = useCaptureAndSendComment({ token })
    const { deletePost, msgDelPost, errDel, successDelete, setSuccessDelete } = useDeletePost({ token, postId: post.postId })
    const [imgClickedPath, setImgClickedPath] = useState(null)
    const isDesktop = useMediaQuery('(min-width: 900px)');
    const isTablet = useMediaQuery('(min-width: 426px) and (max-width: 899px)');
    const isMobile = useMediaQuery('(max-width: 423vw)');
    const className = useSelector((state) => state.className);
    const images = []
    const [userImages, setUserImages] = useState([])
    const { image, imageError } = useGetProfileImage({ id: post.username })
    const { galleryImage, getGalleryImage } = useGetGalleryImage({ username: post.username })
    const { videoUrl, posterUrl, videoError, loading: videoLoading, getVideo } = useGetPostVideo({ username: post.username })

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
        marginLeft: '5px',
        display: 'inline'
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
        element.classList.toggle('fadeIn');
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

    const handleImageClicked = (event) => {
        if (event) {
            setImgClickedPath(event.target.src);
        }
    }

    const handleRemoveCommentFromDOM = (commentId) => {
        setCurrentComments(currentComments.filter(comment => comment.commentId !== commentId))
    }

    const handleSharePost = async () => {
        const shareUrl = (frontendUrl ? frontendUrl : window.location.origin) + '/posts/' + post.postId;

        // Native share dialog when available (mobile/desktop), clipboard fallback otherwise
        if (navigator.share) {
            try {
                await navigator.share({
                    title: 'Node Network',
                    text: 'Mira esta publicación de ' + post.username + ' en Node Network',
                    url: shareUrl
                });
            } catch (err) {
                // el usuario canceló el diálogo de compartir; no mostrar feedback
            }
            return;
        }

        try {
            await navigator.clipboard.writeText(shareUrl);
        } catch (err) {
            // Fallback para contextos sin API de portapapeles
            const textarea = document.createElement('textarea');
            textarea.value = shareUrl;
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);
        }
        setShareOpen(true);
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
            // setCurrentComments(0);
            setCurrentComments(newCurrentComments);
            setSuccessComment(false);
        }
    }, [successComment])

    useEffect(() => {
        if (successDelete) {
            alert(msgDelPost);
            (isolated) && window.location.reload()
            // document.querySelector('.post-container-id-' + post.postId).remove();
            handleFeedReload();
            setSuccessDelete(false);
        }
    })

    useEffect(() => {
        if (post.username && post.images !== undefined) {
            post.images.forEach((item) => {
                getGalleryImage(item.slice(item.indexOf('gallery') + 'gallery/'.length))
            })
        }
    }, [post.username, post.images]);

    useEffect(() => {
        if (post.username && post.videos !== undefined && post.videos.length > 0) {
            getVideo(post.videos[0].slice(post.videos[0].indexOf('gallery') + 'gallery/'.length))
        }
    }, [post.username, post.videos]);

    useEffect(() => {
        if (galleryImage) {
            images.push(galleryImage)
        }
    }, [galleryImage])

    useEffect(() => {
        if (images.length > 0) {
            setUserImages(images)
        }
    }, [images])

    return (
        <>
            <Box className={`feed-post-card ${className} post-container-id-${post.postId} fadeIn`} sx={{ p: isDesktop ? 5 : 1, mt: '2%', mb: isDesktop ? '5%' : isTablet ? '5%' : '5%' }}>

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
                            <Typography className="feed-date-chip" sx={{ mt: '2%' }} style={reactionTextStyles}>
                                {/* {'creado el '+new Date(post.date_created).toLocaleDateString('es-MX', { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', timeZone: 'America/Mexico_City' })} */}
                                {'creado el ' + new Date(post.date_created).toLocaleDateString('es-MX', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'America/Mexico_City' })}
                            </Typography>
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
                                        className: { className },
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

                <Box className="feed-post-content" sx={{ mb: '2%', mt: '2%', maxWidth: '100%' }}>
                    <Typography sx={{ wordWrap: 'break-word', whiteSpace: 'pre-wrap', multiline: true, textAlign: 'justify' }}>
                        <ContentText content={post.content} />
                    </Typography>
                </Box>
                <Box className="feed-post-images" sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
                    {post.videos && post.videos.length > 0 && (
                        <Box sx={{ width: '100%', maxWidth: isDesktop || isTablet ? '75%' : '100%', display: 'flex', justifyContent: 'center' }}>
                            {/* Caja de anclaje con proporción 16:9: fija el tamaño del post durante toda la carga */}
                            <Box
                                sx={{
                                    position: 'relative',
                                    width: '100%',
                                    aspectRatio: '16 / 9',
                                    maxHeight: '480px',
                                    borderRadius: '14px',
                                    background: 'rgba(124, 93, 250, 0.06)'
                                }}
                            >
                                {/* La portada (primer fotograma) rellena la caja sin cambiar su tamaño */}
                                {posterUrl && (
                                    <img
                                        src={posterUrl}
                                        alt="Vista previa del video"
                                        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'contain', borderRadius: '14px', background: '#000', boxShadow: '0 8px 20px -10px rgba(0, 0, 0, 0.35)' }}
                                    />
                                )}
                                {/* Pantalla de carga transparente encima de la portada mientras se descarga */}
                                {videoLoading && !videoUrl && (
                                    <Box
                                        sx={{
                                            position: 'absolute',
                                            top: 0,
                                            left: 0,
                                            right: 0,
                                            bottom: 0,
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            gap: 1,
                                            borderRadius: '14px',
                                            background: 'rgba(0, 0, 0, 0.35)'
                                        }}
                                    >
                                        <CircularProgress size={32} sx={{ color: '#fff' }} />
                                        <Typography sx={{ color: '#fff', fontSize: '0.85rem' }}>Cargando video...</Typography>
                                    </Box>
                                )}
                                {/* El video se superpone exactamente sobre la portada: mismas dimensiones, sin saltos */}
                                {videoUrl && (
                                    <video
                                        controls
                                        autoPlay
                                        muted
                                        playsInline
                                        preload="metadata"
                                        src={videoUrl}
                                        poster={posterUrl || undefined}
                                        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'contain', borderRadius: '14px', background: '#000', boxShadow: '0 8px 20px -10px rgba(0, 0, 0, 0.35)' }}
                                    />
                                )}
                            </Box>
                        </Box>
                    )}
                    {post.videos && post.videos.length > 0 && videoError && !videoUrl && (
                        <Typography sx={{ color: '#dc2626', fontSize: '0.85rem', mt: 1 }}>
                            No se pudo cargar el video
                        </Typography>
                    )}
                    {userImages !== undefined &&
                        userImages.map((elem, key) => (
                            <img onClick={handleImageClicked} style={{ maxWidth: isDesktop || isTablet ? '75%' : '100%' }} key={key} src={elem} alt="imagen alternativa" onError={(e) => e.target.src = "https://via.placeholder.com/200x200/ffffff/000000?text=Imagen+No+Disponible&size=30"} loading="lazy" />
                        ))
                    }
                </Box>

                <Box className="feed-post-actions" sx={{ p: isDesktop ? 1 : 0, width: '100%' }}>
                    <Stack direction="row" sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Button onClick={likeThePost}>
                            <ThumbUpIcon sx={reactionIconStyles} /> <span className={className} style={reactionTextStyles}> Me Gusta <Badge sx={{ ml: 2 }} badgeContent={currentLikes > 0 ? currentLikes : '0'} color="primary"/> </span>
                        </Button>
                        <Button onClick={dislikeThePost}>
                            <ThumbDownIcon sx={reactionIconStyles} color="error" /> <span className={className} style={reactionTextStyles}> No Me Gusta <Badge sx={{ ml: 2 }} badgeContent={currentDislikes > 0 ? currentDislikes : '0'} color="error"/> </span>
                        </Button>
                        <Button onClick={() => toggleCommentBox(post.postId)}>
                            <AddCommentIcon sx={reactionIconStyles} color="warning" /> <span className={className} style={reactionTextStyles}> Comentar </span>
                        </Button>
                        <Button onClick={handleSharePost}>
                            <ShareIcon sx={reactionIconStyles} color="primary" /> <span className={className} style={reactionTextStyles}> Compartir </span>
                        </Button>
                    </Stack>
                </Box>

                <Box id={"comment-box-" + post.postId} className={"hidden comment-box-" + post.postId}>
                    <MentionTextField
                        token={token}
                        sx={{ borderRadius: '5px', mt: '2%', mb: '2%' }}
                        required
                        multiline
                        variant="outlined"
                        size="small"
                        label="comentar en la publicacion"
                        className="bgx-white feed-comment-input"
                        name="comment"
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

                {currentComments.length > 0 &&
                    <>
                        <Typography className="feed-comments-title">Comentarios</Typography>
                        {currentComments.map(comment => <Comments key={comment.commentId} comment={comment} token={token} handleRemoveCommentFromDOM={handleRemoveCommentFromDOM} />)}
                    </>
                }
            </Box>
            {updatePost && <PopUpEdit token={token} post={post} setUpdatePost={setUpdatePost} type={'post'} />}
            <ImageViewer image={imgClickedPath} setImgClickedPath={setImgClickedPath} />
            <Snackbar
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                open={shareOpen}
                autoHideDuration={2500}
                onClose={() => setShareOpen(false)}
            >
                <Alert onClose={() => setShareOpen(false)} severity="success" variant="filled" sx={{ borderRadius: '12px', fontWeight: 500 }}>
                    ¡Enlace copiado al portapapeles!
                </Alert>
            </Snackbar>
        </>
    )
}

