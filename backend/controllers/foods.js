const { ObjectId } = require('mongodb');
const mongodb = require('../DB/connection');

// GET REQUEST | GET ALL FOODS
const getAllFoods = async (req, res) => {
    const db = mongodb.getDb();

    if (req.query.mealType) {
    const mealType = req.query.mealType.toLowerCase();
    const result = await db.collection('foods').find({mealType: mealType});

    const foodsBytype = await result.toArray()

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(foodsBytype);
    } else {

        const result = await db.collection('foods').find();

        const foods = await result.toArray();

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(foods);
    }
};

// POST REQUEST | ADD FOODS TO DB
const addFood = async (req, res) => {
    const db = mongodb.getDb();

    const { foodName, calories, mealType } = req.body;

    if (typeof foodName !== 'string') {
        return res.status(400).json({
            message: 'Food name must be letters'
        });
    }

    if (typeof calories !== 'number') {
        return res.status(400).json({
            message: 'Calories must be a number'
        });
    }

    const validMealTypes = ['breakfast', 'lunch', 'dinner', 'snack'];

    if (!validMealTypes.includes(mealType)) {
        return res.status(400).json({
            message: 'Meal type must be Breakfast, Lunch, Dinner, or Snack'
        });
    }

    const foodToAdd = {
        foodName,
        calories,
        mealType,
        date: new Date()
    }

    const result = await db.collection('foods').insertOne(foodToAdd);

    res.status(201).json({message: 'Food Added Succesfully', id: result.insertedId});
}

module.exports = {
    getAllFoods,
    addFood
};