import '../assets/styles.css';
import '../assets/index.css';
import { useMediaQuery, Box, Typography } from '@mui/material';
import SearchUsername from '../components/SearchUsername.jsx'
import { useState, useEffect } from 'react'

export default function Forgot() {
    const [foundUser, setFoundUser] = useState(null)
    const isDesktop = useMediaQuery('(min-width: 900px)');
    const isTablet = useMediaQuery('(min-width: 426px) and (max-width: 899px)');
    const isMobile = useMediaQuery('(max-width: 425px)');

    const handleFoundUser = (found) => {
        setFoundUser(found)
    }

    useEffect(() => {
        (foundUser) && console.log(foundUser)
    }, [foundUser])

    return (
        <>
            <Box className="login-background">
                {!foundUser ?
                    <SearchUsername isDesktop={isDesktop} isTablet={isTablet} isMobile={isMobile} handleFoundUser={handleFoundUser} /> :
                    (foundUser === "found" ?
                        <Box className={isDesktop ? 'login-container' : (isTablet ? 'login-container-tablet' : 'login-container-mobile')}>
                            <Typography>
                                usuario encontrado
                            </Typography>
                        </Box> :
                        foundUser === "notFound" ?
                            <Box className={isDesktop ? 'login-container' : (isTablet ? 'login-container-tablet' : 'login-container-mobile')}>
                                <Typography>
                                    usuario NO encontrado
                                </Typography>
                            </Box>
                            : null
                    )
                }
            </Box>
        </>
    );
}
