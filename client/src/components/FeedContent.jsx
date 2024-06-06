import PropTypes from 'prop-types';
import { Avatar, Box, TextField, Typography } from "@mui/material";
import PostingBox from './PostingBox.jsx';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

export default function FeedContent({ token }) {

    const exampleSoloContent = () => {
        return (
            <>
                <Box>
                    <PostingBox token={token} />
                    <Box sx={{ bgcolor: 'pink', p:5, border: '1px solid black' }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px'}}><Avatar>H</Avatar><p>Nombre de usuario</p></Box>
                                <Box><MoreHorizIcon/></Box>
                            </Box>
                            
                            <Box sx={{ mb: '2%', mt: '2%', maxWidth: '100%', border: '1px solid grey', padding: '8px' }}>
                                <Typography variant="h4" sx={{ wordWrap: 'break-word', whiteSpace: 'normal', multiline: true }}>
                                    Publicacion de ejemplo
                                    Publicacion de ejemplo
                                    Publicacion de ejemplo
                                    Publicacion de ejemplo
                                    Publicacion de ejemplo
                                    Publicacion de ejemplo
                                    Publicacion de ejemplo
                                    Publicacion de ejemplo
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
                    <br />
                    <Box sx={{ bgcolor: 'pink', p: 10, border: '1px solid black'}}>
                        {/* Content */}
                            <p>
                                CARALHO!! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aspernatur iusto accusamus ipsam assumenda, autem inventore doloribus ea nam deleniti, quia quidem incidunt unde, facere eius rerum suscipit! Adipisci, molestias excepturi.
                                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aspernatur iusto accusamus ipsam assumenda, autem inventore doloribus ea nam deleniti, quia quidem incidunt unde, facere eius rerum suscipit! Adipisci, molestias excepturi.
                                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aspernatur iusto accusamus ipsam assumenda, autem inventore doloribus ea nam deleniti, quia quidem incidunt unde, facere eius rerum suscipit! Adipisci, molestias excepturi.
                                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aspernatur iusto accusamus ipsam assumenda, autem inventore doloribus ea nam deleniti, quia quidem incidunt unde, facere eius 
                            </p>
                    </Box>
                    <br />
                    <Box sx={{ bgcolor: 'pink', p: 10, border: '1px solid black'}}>
                        {/* Content */}
                            <p>
                                CARALHO!! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aspernatur iusto accusamus ipsam assumenda, autem inventore doloribus ea nam deleniti, quia quidem incidunt unde, facere eius rerum suscipit! Adipisci, molestias excepturi.
                                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aspernatur iusto accusamus ipsam assumenda, autem inventore doloribus ea nam deleniti, quia quidem incidunt unde, facere eius rerum suscipit! Adipisci, molestias excepturi.
                                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aspernatur iusto accusamus ipsam assumenda, autem inventore doloribus ea nam deleniti, quia quidem incidunt unde, facere eius rerum suscipit! Adipisci, molestias excepturi.
                                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aspernatur iusto accusamus ipsam assumenda, autem inventore doloribus ea nam deleniti, quia quidem incidunt unde, facere eius 
                            </p>
                    </Box>
                    <br />
                    <Box sx={{ bgcolor: 'pink', p: 10, border: '1px solid black'}}>
                        {/* Content */}
                            <p>
                                CARALHO!! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aspernatur iusto accusamus ipsam assumenda, autem inventore doloribus ea nam deleniti, quia quidem incidunt unde, facere eius rerum suscipit! Adipisci, molestias excepturi.
                                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aspernatur iusto accusamus ipsam assumenda, autem inventore doloribus ea nam deleniti, quia quidem incidunt unde, facere eius rerum suscipit! Adipisci, molestias excepturi.
                                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aspernatur iusto accusamus ipsam assumenda, autem inventore doloribus ea nam deleniti, quia quidem incidunt unde, facere eius rerum suscipit! Adipisci, molestias excepturi.
                                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aspernatur iusto accusamus ipsam assumenda, autem inventore doloribus ea nam deleniti, quia quidem incidunt unde, facere eius 
                            </p>
                    </Box>
                    <br />
                    <Box sx={{ bgcolor: 'pink', p: 10, border: '1px solid black'}}>
                        {/* Content */}
                            <p>
                                CARALHO!! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aspernatur iusto accusamus ipsam assumenda, autem inventore doloribus ea nam deleniti, quia quidem incidunt unde, facere eius rerum suscipit! Adipisci, molestias excepturi.
                                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aspernatur iusto accusamus ipsam assumenda, autem inventore doloribus ea nam deleniti, quia quidem incidunt unde, facere eius rerum suscipit! Adipisci, molestias excepturi.
                                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aspernatur iusto accusamus ipsam assumenda, autem inventore doloribus ea nam deleniti, quia quidem incidunt unde, facere eius rerum suscipit! Adipisci, molestias excepturi.
                                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aspernatur iusto accusamus ipsam assumenda, autem inventore doloribus ea nam deleniti, quia quidem incidunt unde, facere eius 
                            </p>
                    </Box>
                </Box>
            </>
        )
    }

    return (
        <>
            { exampleSoloContent() }
        </>
    )
}

FeedContent.propTypes = {
    token: PropTypes.string
}   
