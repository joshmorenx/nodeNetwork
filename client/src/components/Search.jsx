import { Box, TextField, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

export default function Search({ handleInputChange, encodedQuery }) {
    return (
        <form className="search-form" method="get" action={`/search/${encodedQuery}`}>
            <Box className="search-section">
                <TextField
                    required
                    onChange={handleInputChange}
                    sx={{ bgcolor: 'white', width: '50vw' }}
                    label="Buscar"
                    InputProps={{
                        endAdornment: (
                            <Button type="submit">
                                <SearchIcon style={{ cursor: 'pointer' }} />
                            </Button>
                        ),
                    }}
                />
            </Box>
        </form>
    )
}