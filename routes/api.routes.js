const express = require('express');
const router = express.Router();

// api
router.get('/api/books', (req, res) => {
    console.log('GET /api/books')
    res.send('api/books');
});

// export router to ../server.js
module.exports = router;