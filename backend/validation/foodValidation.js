const { ObjectId } = require("mongodb");

const validMealTypes = ['breakfast', 'lunch', 'dinner', 'snack'];

const validateFood = (foodName, calories, mealType) => {
    if (typeof foodName !== 'string') {
        return 'Food name must be letters';
    }

    if (typeof calories !== 'number') {
        return 'Calories must be a number';
    }

    if (!validMealTypes.includes(mealType)) {
        return 'Meal type must be breakfast, lunch, dinner, or snack';
    }

    return null;
};

const validateMealType = (mealType) => {
    if (!validMealTypes.includes(mealType)) {
        return 'Meal type must be breakfast, lunch, dinner, or snack';
    }

    return null;
};

const validateObjectId = (id) => {
    if (!ObjectId.isValid(id)) {
        return 'Invalid food ID format';
    }

    return null;
}

module.exports = { 
    validateFood,
    validateMealType,
    validateObjectId
};