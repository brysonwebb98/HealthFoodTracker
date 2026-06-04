const { ObjectId } = require("mongodb");

const validMealTypes = ['breakfast', 'lunch', 'dinner', 'snack'];

const validateFood = (foodName, calories, mealType, servingSize, protein, carbs, fat) => {
    const errors = [];

    if (!foodName || typeof foodName !== 'string') {
        errors.push('Food name is required and must be text');
    }

    if (typeof calories !== 'number') {
        errors.push('Calories must be a number');
    }

    if (!validMealTypes.includes(mealType?.toLowerCase())) {
        errors.push('Meal type must be breakfast, lunch, dinner, or snack');
    }

    if (!servingSize || typeof servingSize !== 'string') {
        errors.push('Serving size is required and must be text');
    }

    if (typeof protein !== 'number') {
        errors.push('Protein must be a number');
    }

    if (typeof carbs !== 'number') {
        errors.push('Carbs must be a number');
    }

    if (typeof fat !== 'number') {
        errors.push('Fat must be a number');
    }

    return errors;
};

const validateMealType = (mealType) => {
    if (!validMealTypes.includes(mealType?.toLowerCase())) {
        return 'Meal type must be breakfast, lunch, dinner, or snack';
    }

    return null;
};

const validateObjectId = (id) => {
    if (!ObjectId.isValid(id)) {
        return 'Invalid ID format';
    }

    return null;
}

module.exports = { 
    validateFood,
    validateMealType,
    validateObjectId
};