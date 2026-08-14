const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/verifyToken.js");
const getConversations = require("../controllers/getConversations.js");
const getMessages = require("../controllers/getMessages.js");
const sendMessage = require("../controllers/sendMessage.js");
const markMessagesRead = require("../controllers/markMessagesRead.js");
const deleteMessage = require("../controllers/deleteMessage.js");
const deleteConversation = require("../controllers/deleteConversation.js");

const messageRoutes = (io) => {

    router.get('/api/conversations/', verifyToken, getConversations);
    router.get('/api/messages/:username', verifyToken, getMessages);
    router.post('/api/messages/', verifyToken, sendMessage(io));
    router.put('/api/messages/read/', verifyToken, markMessagesRead);
    router.delete('/api/messages/:messageId', verifyToken, deleteMessage(io));
    router.delete('/api/conversations/:conversationId', verifyToken, deleteConversation);

    return router;
};

module.exports = messageRoutes;
