import PropTypes from 'prop-types';
import { Box } from "@mui/material";
import PostingBox from './PostingBox.jsx';

export default function FeedContent({ token }) {

    const exampleSoloContent = () => {
        return (
            <>
                <Box>
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
