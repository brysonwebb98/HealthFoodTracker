const { ObjectId } = require('mongodb');
const mongodb = require('../DB/connection');
const { validateMealType, validateObjectId } = require('../validation/foodValidation');
const { validateRecipe } = require('../validation/recipeValidation');

// GETTING ALL recipes
const getAllRecipes = async (req, res) => {
    try {
        const db = mongodb.getDb();

        if (req.query.mealType) {
            
            const mealType = req.query.mealType.toLowerCase();

            // VALIDATION
            const mealTypeError = validateMealType(mealType);
                if (mealTypeError) {
                    return res.status(400).json({
                        message: mealTypeError
                    });
                }

                const result = await db.collection('recipes').find({mealType: mealType});

                const recipesByType = await result.toArray();

                res.setHeader('Content-Type', 'application/json');
                res.status(200).json(recipesByType);
            } else {

                const result = await db.collection('recipes').find();

                const recipes = await result.toArray();

                res.setHeader('Content-Type', 'application/json');
                res.status(200).json(recipes);

            }

        } catch (error) {

            res.status(500).json({
                message: 'Server error',
                error: error.message
            });

        }
};

// GET REQUEST | GETTING ONE RECIPE

const getSingleRecipe = async (req, res) => {
    try {
        const db = mongodb.getDb();

        const recipeId = req.params.id;

        // VALIDATION
        const idError = validateObjectId(recipeId);

        if (idError) {
            return res.status(400).json({
                message: idError
            });
        }

        const result = await db.collection('recipes').findOne(
            { _id: new ObjectId(recipeId) }
        );

        if (!result) {
            return res.status(404).json({
                message: 'Recipe not found'
            });
        }

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result);

    } catch (error) {

        res.status(500).json({
            message: 'Server error',
            error: error.message
        });

    }
};

// POST REQUEST | ADDING RECIPE
const addRecipe = async (req, res) => {
    try {
        const db = mongodb.getDb();

        const { recipeName, mealType, calories, protein, difficulty } = req.body;

        // VALIDATION
        const recipeError = validateRecipe(req.body);

        if (recipeError) {
            return res.status(400).json({
                message: recipeError
            });
        }

        const recipeToAdd = {
            recipeName, 
            mealType: mealType.toLowerCase(), 
            calories, 
            protein, 
            difficulty
        };

        const result = await db.collection('recipes').insertOne(recipeToAdd);

        res.status(201).json({message: 'Recipe Added Successfully', id: result.insertedId});

    } catch (error) {
        res.status(500).json({
            message: 'Server error',
            error: error.message
        });
    }
};

// PUT REQUEST | UPDATING RECIPE
const updateRecipe = async (req, res) => {
    try {
        const db = mongodb.getDb();
        const recipeId = req.params.id;

        const idError = validateObjectId(recipeId);

        if (idError) {
            return res.status(400).json({
                message: idError
            });
        }

        const recipeError = validateRecipe(req.body);

        if (recipeError) {
            return res.status(400).json({
                message: recipeError
            });
        }

        const { recipeName, mealType, calories, protein, difficulty } = req.body;

        const recipeToUpdate = {
            recipeName, 
            mealType: mealType.toLowerCase(), 
            calories, 
            protein, 
            difficulty
        };

        const result = await db.collection('recipes').replaceOne(
            { _id: new ObjectId(recipeId) },
            recipeToUpdate
        );

        if (result.matchedCount === 0) {
            return res.status(404).json({
                message: 'Recipe not found'
            });
        }

        res.status(200).json({
            message: 'Recipe Updated Successfully',
            id: recipeId
        });

    } catch (error) {
        res.status(500).json({
            message: 'Server error',
            error: error.message
        });
    }
};

// DELETE REQUEST | DELETING RECIPE
const deleteRecipe = async (req, res) => {
    try {
        const db = mongodb.getDb();

        const recipeId = req.params.id;

        // VALIDATION
        const idError = validateObjectId(recipeId);
        if (idError) {
            return res.status(400).json({
                message: idError
            });
        }

        const result = await db.collection('recipes').deleteOne(
            { _id: new ObjectId(recipeId) }
        );

        if (result.deletedCount === 0 ) {
            return res.status(404).json({message: 'Recipe not found'});
        }

        res.status(200).json({ message: 'Recipe Deleted Successfully'});
    } catch (error) {

        res.status(500).json({
            message: 'Server error',
            error: error.message
        });

    }
};

module.exports = {
    getAllRecipes,
    getSingleRecipe,
    addRecipe, 
    updateRecipe,
    deleteRecipe
};