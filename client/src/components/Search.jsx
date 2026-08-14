import { useEffect, useRef, useState } from 'react';
import { Box, TextField, Button, CircularProgress, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useMediaQuery } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import useSearchUsers from '../hooks/useSearchUsers';
import UserAvatar from './UserAvatar.jsx';

export default function Search({ handleInputChange, encodedQuery, token }) {
    const isDesktop = useMediaQuery('(min-width: 900px)');
    const isTablet = useMediaQuery('(min-width: 426px) and (max-width: 899px)');
    const isMobile = useMediaQuery('(max-width: 425px)');
    const navigate = useNavigate();
    const wrapperRef = useRef(null);
    const inputRef = useRef(null);
    const [open, setOpen] = useState(false);
    const query = decodeURIComponent(encodedQuery || '');
    const { users, loading, sendRequest } = useSearchUsers({ token });

    // Debounced live suggestions while typing
    useEffect(() => {
        const trimmed = query.trim();
        if (!trimmed) {
            setOpen(false);
            return;
        }
        const timeout = setTimeout(() => {
            sendRequest(trimmed);
            setOpen(true);
        }, 300);
        return () => clearTimeout(timeout);
    }, [query]);

    // Close the dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        const trimmed = query.trim();
        if (!trimmed) return;
        setOpen(false);
        navigate(`/search/${encodeURIComponent(trimmed)}`);
    };

    const goToProfile = (username) => {
        setOpen(false);
        if (inputRef.current) inputRef.current.value = '';
        handleInputChange({ target: { value: '' } });
        navigate(`/profile/${username}`);
    };

    const goToAllResults = () => {
        setOpen(false);
        navigate(`/search/${encodeURIComponent(query.trim())}`);
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Escape') {
            setOpen(false);
        }
    };

    return (
        <form className="search-form" onSubmit={handleSubmit}>
            <Box ref={wrapperRef} className="search-section" sx={{ position: 'relative', width: isDesktop ? '50vw' : isTablet ? '50vw' : '91%' }}>
                <TextField
                    required
                    inputRef={inputRef}
                    onChange={handleInputChange}
                    onFocus={() => { if (query.trim()) setOpen(true); }}
                    onKeyDown={handleKeyDown}
                    sx={{ borderRadius: '10px', bgcolor: 'white', width: '100%' }}
                    label="Buscar"
                    InputProps={{
                        endAdornment: (
                            <Button type="submit">
                                <SearchIcon style={{ cursor: 'pointer' }} />
                            </Button>
                        ),
                    }}
                />
                {open && (
                    <Box sx={{ position: 'absolute', top: '100%', left: 0, right: 0, mt: '6px', zIndex: 1300, bgcolor: '#ffffff', borderRadius: '12px', boxShadow: '0 16px 40px -12px rgba(20, 10, 40, 0.45)', border: '1px solid rgba(124, 93, 250, 0.2)', overflow: 'hidden', padding: '6px' }}>
                        {loading ? (
                            <Box sx={{ display: 'flex', justifyContent: 'center', py: 2 }}>
                                <CircularProgress size={24} />
                            </Box>
                        ) : users.length === 0 ? (
                            <Typography sx={{ px: 2, py: 2, color: '#9c8fc0', fontSize: '0.9rem' }}>
                                No se encontraron usuarios
                            </Typography>
                        ) : (
                            <Box>
                                {users.map((user) => (
                                    <Box
                                        key={user.username}
                                        onClick={() => goToProfile(user.username)}
                                        sx={{ display: 'flex', alignItems: 'center', gap: '10px', px: 1.5, py: 1, borderRadius: '8px', cursor: 'pointer', '&:hover': { bgcolor: 'rgba(124, 93, 250, 0.1)' } }}
                                    >
                                        <UserAvatar user={user} />
                                        <Box sx={{ minWidth: 0 }}>
                                            <Typography sx={{ fontWeight: 600, fontSize: '0.95rem', color: '#3c2b66' }}>{user.username}</Typography>
                                            {user.firstName && (
                                                <Typography sx={{ color: '#9c8fc0', fontSize: '0.8rem' }}>{user.firstName} {user.lastName}</Typography>
                                            )}
                                        </Box>
                                    </Box>
                                ))}
                            </Box>
                        )}
                        <Box sx={{ borderTop: '1px solid rgba(124, 93, 250, 0.15)', mt: 1 }}>
                            <Button type="button" onClick={goToAllResults} sx={{ width: '100%', justifyContent: 'flex-start', color: '#6d4af0', textTransform: 'none', fontWeight: 600 }}>
                                Ver todos los resultados para "{query.trim()}"
                            </Button>
                        </Box>
                    </Box>
                )}
            </Box>
        </form>
    )
}
