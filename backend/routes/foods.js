const express = require('express');
const router = express.Router();

const foodsController = require('../controllers/foods')

// GET REQUEST | GETTING FOODS
router.get('/', foodsController.getAllFoods);

// GET REQUEST | GET ONE FOOD
router.get('/:id', foodsController.getSingleFood);

// POST REQUEST | ADDING FOODS
router.post(
    '/', 
    /*
        #swagger.parameters['body'] = 
        {
            in: 'body',
            description: 'Add a new food',
            required: true,
            schema: {
                foodName: 'Apple',
                calories: 95,
                mealType: 'snack'
            }
        }
    */
   foodsController.addFood
);

// PUT REQUEST | UPDATING FOODS
router.put(
    '/:id', 
    /*
        #swagger.parameters['id'] = {
            in: 'path',
            description: 'Food ID / Object ID MongoDB'
        }

        #swagger.parameters['body'] = {
            in: 'body',
            description: 'Update a food',
            required: true,
            schema: {
                foodName: 'Banana',
                calories: 105,
                mealType: 'breakfast'
            }
        }
    */
   foodsController.updateFood
);

// DELETE REQUEST | DELETING ENTRY

router.delete(
    '/:id', 
    /*
        #swagger.parameters['id'] = {
            in: 'path',
            description: 'Food ID / Object ID MongoDB'
        }
    */
   foodsController.deleteFood
);

module.exports = router;