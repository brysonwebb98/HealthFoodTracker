const express = require('express');
const router = express.Router();

const foodRoutes = require('./foods');

router.use('/foods', foodRoutes);

module.exports = router;