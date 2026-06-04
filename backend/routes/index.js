const express = require('express');
const router = express.Router();

const foodRoutes = require('./foods');
const githubRoutes = require('./github');
const recipeRoutes = require('./recipes');

router.use('/foods', foodRoutes);
router.use('/auth', githubRoutes);
router.use('/recipes', recipeRoutes);

module.exports = router;