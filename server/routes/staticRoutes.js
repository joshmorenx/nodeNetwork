const express = require("express");
const app = express()
const path = require('path');

// static files
app.use('/api/public/', express.static(path.join(__dirname, '../public')))

module.exports = app