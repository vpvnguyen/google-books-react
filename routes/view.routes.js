const express = require('express');
const router = express.Router();
const path = require('path');

// catch all
router.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './client/build/index.html'));
});

// export router to server.js
module.exports = router;