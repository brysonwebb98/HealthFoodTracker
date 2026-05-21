const express = require('express');
const router = express.Router();

const foodsController = require('../controllers/foods')

// GET REQUEST | GETTING FOODS
router.get('/', foodsController.getAllFoods);

// POST REQUEST | ADDING FOODS
router.post('/', foodsController.addFood);

// PUT REQUEST | UPDATING FOODS


// DELETE REQUEST | DELETING ENTRY

module.exports = router;