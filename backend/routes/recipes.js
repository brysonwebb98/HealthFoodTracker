const express = require('express');
const router = express.Router();
const authenticateToken = require('../validation/authenticate');
const recipesController = require('../controllers/recommendedFoods');


// GET REQUEST
router.get('/', recipesController.getAllRecipes);

// GET REQUEST | GET ONE RECIPE
router.get('/:id', recipesController.getSingleRecipe);

// POST REQUEST | ADDING RECIPE
router.post(
    '/', 
    authenticateToken,
    /*
        #swagger.parameters['body'] = 
        {
            in: 'body',
            description: 'Add a new recipe',
            required: true,
            schema: {
                recipeName: 'Greek Yogurt Parfait',
                mealType: 'breakfast',
                calories: 250,
                protein: 20,
                difficulty: 'easy'
            }
        }
    */
    recipesController.addRecipe
);

// PUT REQUEST | UPDATING RECIPE
router.put(
    '/:id', 
    authenticateToken,
    /*
        #swagger.parameters['id'] = {
            in: 'path',
            description: 'Recipe ID / Object ID MongoDB'
        }

        #swagger.parameters['body'] = {
            in: 'body',
            description: 'Update a recipe',
            required: true,
            schema: {
                recipeName: 'Greek Yogurt Parfait',
                mealType: 'breakfast',
                calories: 250,
                protein: 20,
                difficulty: 'easy'
            }
        }
    */
    recipesController.updateRecipe
);

// DELETE REQUEST | DELETING RECIPE
router.delete(
    '/:id', 
    authenticateToken,
    /*
        #swagger.parameters['id'] = {
            in: 'path',
            description: 'Recipe ID / Object ID MongoDB'
        }
    */
   recipesController.deleteRecipe
);

module.exports = router;

