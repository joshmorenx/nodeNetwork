import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';
import { Box, CircularProgress, List, ListItemButton, ListItemText, Paper, Popper, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import useSearchUsers from '../hooks/useSearchUsers.jsx';

const MENTION_TYPING_REGEX = /(^|\s)@([A-Za-z0-9_.]*)$/;

// Campo de texto con soporte de menciones: al escribir @ se muestra una lista
// de usuarios que coinciden y al seleccionar uno se inserta "@usuario ".
// Usa Popper (no Popover/Modal) para que el desplegable no robe el foco del
// campo y se pueda seguir escribiendo el nombre de usuario completo.
export default function MentionTextField({ token, value, onChange, name, id, ...textFieldProps }) {
    const [mentionQuery, setMentionQuery] = useState(null);
    const rootRef = useRef(null);
    const paperRef = useRef(null);
    const inputRef = useRef(null);
    const cursorPosRef = useRef(0);
    const searchTimerRef = useRef(null);
    const { users, loading, sendRequest } = useSearchUsers({ token });

    const closeMentionPopover = () => {
        setMentionQuery(null);
    };

    // Cerrar con Escape o al hacer clic fuera del campo y del desplegable
    useEffect(() => {
        if (mentionQuery === null) {
            return;
        }

        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                closeMentionPopover();
            }
        };

        const handleMouseDown = (event) => {
            const isInsideInput = rootRef.current && rootRef.current.contains(event.target);
            const isInsideList = paperRef.current && paperRef.current.contains(event.target);
            if (!isInsideInput && !isInsideList) {
                closeMentionPopover();
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        document.addEventListener('mousedown', handleMouseDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.removeEventListener('mousedown', handleMouseDown);
        };
    }, [mentionQuery]);

    const handleChange = (event) => {
        const newValue = event.target.value;
        const cursor = typeof event.target.selectionStart === 'number' ? event.target.selectionStart : newValue.length;
        cursorPosRef.current = cursor;

        const beforeCursor = newValue.slice(0, cursor);
        const match = beforeCursor.match(MENTION_TYPING_REGEX);

        if (match) {
            const query = match[2];
            setMentionQuery(query);
            if (query.length >= 1) {
                clearTimeout(searchTimerRef.current);
                searchTimerRef.current = setTimeout(() => sendRequest(query), 200);
            }
        } else {
            closeMentionPopover();
        }

        if (onChange) {
            onChange(event);
        }
    };

    const handleSelectMention = (username) => {
        const cursor = cursorPosRef.current;
        const beforeCursor = value.slice(0, cursor);
        const match = beforeCursor.match(MENTION_TYPING_REGEX);
        let caret = cursor;

        if (match) {
            const atIndex = cursor - match[2].length - 1;
            const newValue = value.slice(0, atIndex) + '@' + username + ' ' + value.slice(cursor);
            caret = atIndex + 1 + username.length + 1;

            if (onChange) {
                onChange({ target: { name: name, id: id, value: newValue }, preventDefault: () => {} });
            }
        }

        closeMentionPopover();

        // Devolver el foco al campo y colocar el cursor justo después de la mención insertada
        requestAnimationFrame(() => {
            const input = inputRef.current;
            if (input) {
                input.focus();
                input.setSelectionRange(caret, caret);
            }
        });
    };

    const mentionOpen = mentionQuery !== null;

    return (
        <Box ref={rootRef} sx={{ width: '100%' }}>
            <TextField
                {...textFieldProps}
                name={name}
                id={id}
                value={value}
                onChange={handleChange}
                inputRef={inputRef}
                fullWidth={textFieldProps.fullWidth !== undefined ? textFieldProps.fullWidth : true}
            />
            <Popper
                open={mentionOpen}
                anchorEl={rootRef.current}
                placement="bottom-start"
                style={{ zIndex: 1400 }}
            >
                <Paper
                    ref={paperRef}
                    elevation={3}
                    sx={{
                        maxHeight: 250,
                        overflowY: 'auto',
                        width: rootRef.current ? rootRef.current.offsetWidth : undefined,
                    }}
                >
                    {mentionQuery === '' ? (
                        <Typography sx={{ p: 2 }}>Escribe un nombre de usuario...</Typography>
                    ) : loading ? (
                        <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
                            <CircularProgress size={20} />
                        </Box>
                    ) : users.length === 0 ? (
                        <Typography sx={{ p: 2 }}>No se encontraron usuarios</Typography>
                    ) : (
                        <List dense>
                            {users.map((user, index) => (
                                <ListItemButton
                                    key={index}
                                    onClick={() => handleSelectMention(user.username)}
                                    onMouseDown={(event) => event.preventDefault()}
                                >
                                    <ListItemText
                                        primary={`@${user.username}`}
                                        secondary={user.firstName ? `${user.firstName} ${user.lastName || ''}` : ''}
                                    />
                                </ListItemButton>
                            ))}
                        </List>
                    )}
                </Paper>
            </Popper>
        </Box>
    );
}

MentionTextField.propTypes = {
    token: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    name: PropTypes.string,
    id: PropTypes.string,
};
