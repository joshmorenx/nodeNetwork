import { Box, Button, TextField } from "@mui/material";

export default function PostingBox({ token }) {
    return (
        (token && 
            <Box sx={{ margin : '20px', display: 'flex'}}>
                <h1></h1>
                <TextField
                size="small"
                label="Publica algo..."
                sx={{ width: '100%' }}
                />
                <Button variant="contained" size="medium" sx={{ ml: 2}}>Publicar</Button>
            </Box>
        )
    )
}