import { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const MENTION_OR_HASHTAG = /(@[A-Za-z0-9_.]+|#[\wáéíóúñ]+)/g;

const linkStyles = {
    textDecoration: 'none',
    color: 'inherit',
    fontWeight: 600,
    ':hover': { textDecoration: 'underline' },
};

// Renderiza el contenido de una publicación o comentario convirtiendo
// las menciones (@usuario) y los hashtags (#tema) en enlaces.
export default function ContentText({ content }) {
    if (!content) {
        return null;
    }

    const parts = content.split(MENTION_OR_HASHTAG);

    return (
        <>
            {parts.map((part, index) => {
                if (!part) {
                    return null;
                }

                if (part.startsWith('@')) {
                    return (
                        <Link key={index} component={RouterLink} to={`/profile/${part.slice(1)}`} sx={linkStyles}>
                            {part}
                        </Link>
                    );
                }

                if (part.startsWith('#')) {
                    return (
                        <Link key={index} component={RouterLink} to={`/search/${encodeURIComponent(part)}`} sx={linkStyles}>
                            {part}
                        </Link>
                    );
                }

                return <Fragment key={index}>{part}</Fragment>;
            })}
        </>
    );
}

ContentText.propTypes = {
    content: PropTypes.string,
};
