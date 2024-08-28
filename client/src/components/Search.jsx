import { Box, TextField, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useMediaQuery } from '@mui/material';

export default function Search({ handleInputChange, encodedQuery }) {
    const isDesktop = useMediaQuery('(min-width: 900px)');
    const isTablet = useMediaQuery('(min-width: 426px) and (max-width: 899px)');
    const isMobile = useMediaQuery('(max-width: 425px)');

    return (
        <form className="search-form" method="get" action={`/search/${encodedQuery}`}>
            <Box className="search-section">
                <TextField
                    required
                    onChange={handleInputChange}
                    sx={{ borderRadius: '10px', bgcolor: 'white', width: isDesktop ? '50vw' : isTablet ? '50vw' : '91%' }}
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