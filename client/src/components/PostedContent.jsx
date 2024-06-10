import { Avatar, Box, Button, Link, Menu, MenuItem, TextField, Typography } from "@mui/material";
import { useState, useEffect } from 'react';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';

export default function PostedContent({ token, post }) {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
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

    return (
        <Box sx={{ borderRadius: '5px', bgcolor: 'pink', p: 5, border: '1px solid black', mt: '2%' }}>
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
            <Box sx={{ bgcolor: 'black', color: 'white', p: 1, width: '30%' }}>
                {new Date(post.date_created).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}
            </Box>

            <Box sx={{ mb: '2%', mt: '2%', maxWidth: '100%', border: '1px solid grey', padding: '8px' }}>
                <Typography variant="h4" sx={{ wordWrap: 'break-word', whiteSpace: 'normal', multiline: true, textAlign: 'justify' }}>
                    {post.content}
                </Typography>
            </Box>

            <Box>
                <TextField
                    variant="filled"
                    size="small"
                    label="comentar en la publicacion"
                    fullWidth
                    inputProps={{ readOnly: true }}
                />
            </Box>
        </Box>
    )
}
