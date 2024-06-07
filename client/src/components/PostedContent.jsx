import { Avatar, Box, Button, Link, Menu, MenuItem, TextField, Typography } from "@mui/material";
import { useState } from 'react';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';

export default function PostedContent() {
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
            maxWidth: 220,
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
                                <Link href="#" sx={{ textDecoration: 'none' }}><Avatar>H</Avatar></Link>
                                <Link sx={{ color: 'black', textDecoration: 'none', ":hover": { color: 'black', textDecoration: 'underline', fontWeight: 'bold' } }} href="#"><p>Nombre de usuario</p></Link>
                            </Box>
                            <Typography>Informacion sobre el usuario</Typography>
                        </>
                    }
                >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <Link href="#" sx={{ textDecoration: 'none' }}><Avatar>H</Avatar></Link>
                        <Link sx={{ color: 'black', textDecoration: 'none', ":hover": { color: 'black', textDecoration: 'underline', fontWeight: 'bold' } }} href="#"><p>Nombre de usuario</p></Link>
                    </Box>
                </HtmlTooltip>


                <Box>
                    <Button
                        id="demo-positioned-button"
                        aria-controls={open ? 'demo-positioned-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                    >
                        <MoreHorizIcon />
                    </Button>
                    {/* menu desplegable */}
                    <Menu
                        id="demo-positioned-menu"
                        aria-labelledby="demo-positioned-button"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                    >
                        <MenuItem onClick={handleClose}>Editar</MenuItem>
                        <MenuItem onClick={handleClose}>Eliminar</MenuItem>
                    </Menu>
                </Box>

            </Box>

            <Box sx={{ mb: '2%', mt: '2%', maxWidth: '100%', border: '1px solid grey', padding: '8px' }}>
                <Typography variant="h4" sx={{ wordWrap: 'break-word', whiteSpace: 'normal', multiline: true, textAlign: 'justify' }}>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aspernatur iusto accusamus ipsam assumenda,  inventore doloribus ea nam deleniti, quia quidem incidunt unde, facere eius rerum suscipit! Adipisci,
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
