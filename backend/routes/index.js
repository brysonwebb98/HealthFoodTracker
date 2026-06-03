const express = require('express');
const router = express.Router();

const foodRoutes = require('./foods');
const githubRoutes = require('./github');

router.use('/foods', foodRoutes);
router.use('/auth', githubRoutes);

module.exports = router;