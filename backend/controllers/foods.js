const { ObjectId } = require('mongodb');
const mongodb = require('../DB/connection');
const { validateFood, validateMealType, validateObjectId } = require('../validation/foodValidation');

// GET REQUEST | GET ALL FOODS
const getAllFoods = async (req, res) => {
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

            const result = await db.collection('foods').find({mealType: mealType});

            const foodsByType = await result.toArray();

            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(foodsByType);

        } else {

            const result = await db.collection('foods').find();

            const foods = await result.toArray();

            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(foods);

        }

    } catch(error) {

        res.status(500).json({
            message: 'Server error',
            error: error.message
        });

    }
};

// GET REQUEST | GETTING SINGLE FOOD
const getSingleFood = async (req, res) => {
    try {

    
        const db = mongodb.getDb();

        const foodId = req.params.id;

        // VALIDATON
        const idError = validateObjectId(foodId);

        if (idError) {
            return res.status(400).json({
                message: idError
            });
        }

        const result = await db.collection('foods').findOne(
            { _id: new ObjectId(foodId) }
        );

        if (!result) {
            return res.status(404).json({
                message: 'Food not found'
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

// POST REQUEST | ADD FOODS TO DB
const addFood = async (req, res) => {
    try {
            
        const db = mongodb.getDb();

        const { foodName, calories, mealType } = req.body;

        // VALIDATION
        const error = validateFood(foodName, calories, mealType);

        if (error) {
            return res.status(400).json({message: error});
        }

        const foodToAdd = {
            foodName,
            calories,
            mealType,
            date: new Date()
        }

        const result = await db.collection('foods').insertOne(foodToAdd);

        res.status(201).json({message: 'Food Added Successfully', id: result.insertedId});
    } catch (error) {

        res.status(500).json({
            message: 'Server error',
            error: error.message
        });

    }
};

// UPDATING FOOD | PUT REQUEST
const updateFood = async (req, res) => {
    try {
            
        const db = mongodb.getDb();

        const foodId = req.params.id;
        const {foodName, calories, mealType} = req.body;

        // VALIDATION
        const idError = validateObjectId(foodId);
        if (idError) {
            return res.status(400).json({
                message: idError
            });
        }
        const error = validateFood(foodName, calories, mealType);
        if (error) {
            return res.status(400).json({message: error});
        }

        const updatedFood = {
            foodName,
            calories,
            mealType
        };

        const result = await db.collection('foods').updateOne(
            { _id: new ObjectId(foodId)},
            { $set: updatedFood }
        );

        if (result.matchedCount === 0) {
            return res.status(404).json({message: 'Food not found'});
        }

        res.status(200).json({message: 'Food Updated Successfully'});
    } catch (error) {

        res.status(500).json({
            message: 'Server error',
            error: error.message
        });

    }
};

// DELETING FOOD | DELETE REQUEST
const deleteFood = async (req, res) => {
    try {
        const db = mongodb.getDb();

        const foodId = req.params.id;

        // VALIDATION
        const idError = validateObjectId(foodId);
        if (idError) {
            return res.status(400).json({
                message: idError
            });
        }

        const result = await db.collection('foods').deleteOne(
            { _id: new ObjectId(foodId) }
        );

        if (result.deletedCount === 0) {
            return res.status(404).json({message: 'Food not found'});
        }

        res.status(200).json({ message: 'Food Deleted Successfully' });
    } catch(error) {

        res.status(500).json({
            message: 'Server error',
            error: error.message
        });

    }
};

module.exports = {
    getAllFoods,
    getSingleFood,
    addFood,
    updateFood, 
    deleteFood
};