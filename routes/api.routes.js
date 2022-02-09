const express = require('express');
const router = express.Router();
const userRoutes = require('./user.routes');
const notesRoutes = require('./notes.routes');

router.use('/users', userRoutes);
router.use('/notes', notesRoutes);

module.exports = router;