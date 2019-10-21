const express = require('express');
const router = express.Router();

// home
router.get('/', (req, res) => {
    res.send('index');
});

// export router to ../server.js
module.exports = router;