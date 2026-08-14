import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { io } from 'socket.io-client';
import { Box, Typography, TextField, Button, CircularProgress, IconButton, useMediaQuery, Badge, Menu, MenuItem, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import DeleteIcon from '@mui/icons-material/Delete';
import { useSelector } from 'react-redux';
import { format } from 'date-fns';
import { Helmet } from 'react-helmet';
import Navbar from '../components/Navbar';
import UserAvatar from '../components/UserAvatar';
import useGetCurrentUser from '../hooks/useGetCurrentUser';
import useGetConversations from '../hooks/useGetConversations';
import useGetMessages from '../hooks/useGetMessages';
import useSendMessage from '../hooks/useSendMessage';
import useMarkMessagesRead from '../hooks/useMarkMessagesRead';
import useDeleteMessage from '../hooks/useDeleteMessage';
import useDeleteConversation from '../hooks/useDeleteConversation';
import '../assets/styles.css';

export default function Chat({ token }) {
    const backendUrl = import.meta.env.VITE_BACKEND;
    const navigate = useNavigate();
    const { username } = useParams();
    const className = useSelector((state) => state.className);
    const isDesktop = useMediaQuery('(min-width: 900px)');
    const isMobile = useMediaQuery('(max-width: 425px)');

    const { user } = useGetCurrentUser({ token });
    const { conversations, setConversations, loading: conversationsLoading, sendRequest: getConversations } = useGetConversations({ token });
    const { messages, setMessages, otherUser, loading: messagesLoading, sendRequest: getMessages } = useGetMessages({ token });
    const { sendMessage } = useSendMessage({ token });
    const { markMessagesRead } = useMarkMessagesRead({ token });
    const { deleteMessage } = useDeleteMessage({ token });
    const { deleteConversation } = useDeleteConversation({ token });

    const [content, setContent] = useState('');
    const [sending, setSending] = useState(false);
    const [messageMenuAnchor, setMessageMenuAnchor] = useState(null);
    const [selectedMessage, setSelectedMessage] = useState(null);
    const [conversationToDelete, setConversationToDelete] = useState(null);
    const messagesEndRef = useRef(null);
    const conversationsRef = useRef(conversations);

    useEffect(() => {
        conversationsRef.current = conversations;
    }, [conversations]);

    // Cargar las conversaciones al montar
    useEffect(() => {
        getConversations();
    }, []);

    // Al abrir una conversación se cargan sus mensajes y se marcan como leídos
    useEffect(() => {
        if (username) {
            getMessages(username);
            markMessagesRead(username);
        } else {
            setMessages([]);
        }
    }, [username]);

    // Conexión Socket.IO para recibir mensajes en tiempo real
    useEffect(() => {
        if (!user.username) {
            return;
        }

        const socket = io(backendUrl);
        socket.emit('username', user.username);

        socket.on('privateMessage', (message) => {
            const incoming = message.from?.username !== user.username;
            updateConversationList(message, incoming);

            // Si el mensaje entrante es de la conversación abierta, se agrega y se marca como leído
            if (incoming && username && message.from?.username === username) {
                appendMessage(message);
                markMessagesRead(username);
            }
        });

        socket.on('messageDeleted', ({ messageId }) => {
            setMessages((prev) => prev.filter((m) => String(m._id) !== String(messageId)));
            getConversations();
        });

        return () => socket.disconnect();
    }, [user.username, username]);

    const appendMessage = (message) => {
        setMessages((prev) => prev.some((m) => String(m._id) === String(message._id)) ? prev : [...prev, message]);
    };

    const updateConversationList = (message, incoming) => {
        const exists = conversationsRef.current.some((c) => String(c._id) === String(message.conversationId));

        // Conversación nueva (primer mensaje con ese usuario): recargar la lista
        if (!exists) {
            getConversations();
            return;
        }

        setConversations((prev) => {
            const index = prev.findIndex((c) => String(c._id) === String(message.conversationId));
            if (index === -1) {
                return prev;
            }

            const updated = [...prev];
            const conversation = { ...updated[index], lastMessage: message.content, lastMessageDate: message.date_created };

            if (incoming) {
                if (username && message.from?.username === username) {
                    conversation.unread = 0;
                } else {
                    conversation.unread = (conversation.unread || 0) + 1;
                }
            }

            updated.splice(index, 1);
            updated.unshift(conversation);
            return updated;
        });
    };

    const handleSend = async () => {
        const text = content.trim();
        if (!text || !username || sending) {
            return;
        }

        setSending(true);
        const sent = await sendMessage({ username_to: username, content: text });

        if (sent) {
            setContent('');
            appendMessage(sent);
            updateConversationList(sent, false);
        }

        setSending(false);
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            handleSend();
        }
    };

    const openMessageMenu = (event, message) => {
        setMessageMenuAnchor(event.currentTarget);
        setSelectedMessage(message);
    };

    const closeMessageMenu = () => {
        setMessageMenuAnchor(null);
        setSelectedMessage(null);
    };

    const canDeleteForEveryone = (date) => {
        try {
            return Date.now() - new Date(date).getTime() < 60 * 60 * 1000;
        } catch {
            return false;
        }
    };

    const handleDeleteMessage = async (scope) => {
        const message = selectedMessage;
        closeMessageMenu();
        if (!message) {
            return;
        }

        const ok = await deleteMessage(String(message._id), scope);
        if (ok) {
            setMessages((prev) => prev.filter((m) => String(m._id) !== String(message._id)));
            getConversations();
        }
    };

    const handleDeleteConversation = async () => {
        const conversation = conversationToDelete;
        setConversationToDelete(null);
        if (!conversation) {
            return;
        }

        const ok = await deleteConversation(String(conversation._id));
        if (ok) {
            setConversations((prev) => prev.filter((c) => String(c._id) !== String(conversation._id)));
            if (username && conversation.otherUser.username === username) {
                navigate('/chat');
            }
        }
    };

    // Auto-scroll al último mensaje
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, username]);

    const formatTime = (date) => {
        try {
            return format(new Date(date), 'HH:mm');
        } catch {
            return '';
        }
    };

    const renderConversationList = () => (
        <>
            <Typography className="chat-list-title">Mensajes</Typography>

            {conversationsLoading && conversations.length === 0 && (
                <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
                    <CircularProgress size={28} />
                </Box>
            )}

            {!conversationsLoading && conversations.length === 0 && (
                <Box className="chat-empty">
                    <ChatBubbleOutlineIcon sx={{ fontSize: 48, color: '#b9a7e0' }} />
                    <Typography>Aún no tienes conversaciones</Typography>
                    <Typography sx={{ fontSize: '0.85rem', color: '#9c8fc0' }}>Busca un usuario y envíale un mensaje</Typography>
                </Box>
            )}

            {conversations.map((conversation) => (
                <Box
                    key={String(conversation._id)}
                    className="chat-conversation-item"
                    onClick={() => navigate(`/chat/${conversation.otherUser.username}`)}
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1.5,
                        p: 1.5,
                        borderRadius: 2,
                        cursor: 'pointer',
                        bgcolor: username === conversation.otherUser.username ? 'rgba(124, 93, 250, 0.12)' : 'transparent',
                        '&:hover': { bgcolor: 'rgba(124, 93, 250, 0.08)' }
                    }}
                >
                    <UserAvatar user={conversation.otherUser} />
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                        <Typography sx={{ fontWeight: 600, fontSize: '0.95rem' }}>{conversation.otherUser.username}</Typography>
                        <Typography noWrap sx={{ color: '#9c8fc0', fontSize: '0.85rem' }}>
                            {conversation.lastMessage || 'Sin mensajes aún'}
                        </Typography>
                    </Box>
                    {conversation.unread > 0 && (
                        <Badge badgeContent={conversation.unread} color="error" />
                    )}
                    <IconButton
                        size="small"
                        className="chat-conversation-delete"
                        onClick={(event) => { event.stopPropagation(); setConversationToDelete(conversation); }}
                    >
                        <DeleteIcon fontSize="small" />
                    </IconButton>
                </Box>
            ))}
        </>
    );

    const renderThread = () => {
        if (messagesLoading && messages.length === 0) {
            return (
                <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <CircularProgress size={32} />
                </Box>
            );
        }

        return (
            <>
                <Box className={`chat-thread-header ${className}`}>
                    {isMobile && (
                        <IconButton onClick={() => navigate('/chat')} sx={{ color: 'inherit' }}>
                            <ArrowBackIcon />
                        </IconButton>
                    )}
                    <UserAvatar user={otherUser || { username }} />
                    <Box sx={{ minWidth: 0 }}>
                        <Typography sx={{ fontWeight: 600 }}>{otherUser ? otherUser.username : username}</Typography>
                        {otherUser?.firstName && (
                            <Typography sx={{ color: '#9c8fc0', fontSize: '0.85rem' }}>{otherUser.firstName} {otherUser.lastName}</Typography>
                        )}
                    </Box>
                </Box>

                <Box className="chat-messages">
                    {messages.map((message) => {
                        const mine = message.from?.username === user.username;
                        return (
                            <Box
                                key={String(message._id)}
                                className="chat-message-row"
                                sx={{ display: 'flex', alignItems: 'flex-end', gap: 0.5, alignSelf: mine ? 'flex-end' : 'flex-start', maxWidth: '72%' }}
                            >
                                {mine && (
                                    <IconButton size="small" className="chat-message-actions" onClick={(event) => openMessageMenu(event, message)}>
                                        <MoreHorizIcon fontSize="small" />
                                    </IconButton>
                                )}
                                <Box className={mine ? 'chat-bubble chat-bubble-mine' : 'chat-bubble chat-bubble-theirs'}>
                                    <Typography sx={{ fontSize: '0.95rem', lineHeight: 1.45, whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>{message.content}</Typography>
                                    <Typography className="chat-bubble-time">{formatTime(message.date_created)}</Typography>
                                </Box>
                            </Box>
                        );
                    })}
                    <div ref={messagesEndRef} />
                </Box>

                <Box className={`chat-input-row ${className}`}>
                    <TextField
                        fullWidth
                        multiline
                        maxRows={4}
                        value={content}
                        onChange={(event) => setContent(event.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Escribe un mensaje..."
                        className="chat-input"
                    />
                    <Button
                        className="chat-send-btn"
                        variant="contained"
                        onClick={handleSend}
                        disabled={sending || !content.trim()}
                    >
                        <SendIcon />
                    </Button>
                </Box>
            </>
        );
    };

    return (
        <Box>
            <Helmet>
                <title>Chat - Node Network</title>
            </Helmet>
            <Navbar token={token} />

            <Box className="chat-page">
                {isDesktop ? (
                    <>
                        <Box className={`chat-list-panel ${className}`}>
                            {renderConversationList()}
                        </Box>
                        <Box className={`chat-thread-panel ${className}`}>
                            {username ? renderThread() : (
                                <Box className="chat-placeholder">
                                    <ChatBubbleOutlineIcon sx={{ fontSize: 56, color: '#b9a7e0' }} />
                                    <Typography sx={{ color: '#9c8fc0' }}>Selecciona una conversación para empezar a chatear</Typography>
                                </Box>
                            )}
                        </Box>
                    </>
                ) : (
                    username ? (
                        <Box className={`chat-thread-panel chat-thread-mobile ${className}`}>
                            {renderThread()}
                        </Box>
                    ) : (
                        <Box className={`chat-list-panel chat-list-mobile ${className}`}>
                            {renderConversationList()}
                        </Box>
                    )
                )}
            </Box>

            <Menu
                anchorEl={messageMenuAnchor}
                open={Boolean(messageMenuAnchor)}
                onClose={closeMessageMenu}
            >
                <MenuItem onClick={() => handleDeleteMessage('me')}>Eliminar para mí</MenuItem>
                <MenuItem
                    onClick={() => handleDeleteMessage('everyone')}
                    disabled={!canDeleteForEveryone(selectedMessage?.date_created)}
                >
                    Eliminar para todos {!canDeleteForEveryone(selectedMessage?.date_created) ? ' (solo dentro de la primera hora)' : ''}
                </MenuItem>
            </Menu>

            <Dialog open={Boolean(conversationToDelete)} onClose={() => setConversationToDelete(null)}>
                <DialogTitle>Eliminar conversación</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        ¿Seguro que quieres eliminar la conversación con {conversationToDelete?.otherUser.username}? Solo desaparecerá de tu vista.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setConversationToDelete(null)}>Cancelar</Button>
                    <Button color="error" onClick={handleDeleteConversation}>Eliminar</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}

Chat.propTypes = {
    token: PropTypes.string.isRequired
};
