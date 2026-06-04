const { validateMealType } = require('./foodValidation');

const validateRecipe = (recipe) => {
    const { recipeName, mealType, calories, protein, difficulty } = recipe;

    if (!recipeName || !mealType || calories === undefined || protein === undefined || !difficulty) {
        return 'All fields are required';
    }

    if (typeof difficulty !== 'string') {
        return 'Difficulty must be a string';
    }

    const validDifficulties = ['easy', 'medium', 'hard'];

    if (!validDifficulties.includes(difficulty)) {
        return 'Difficulty must be easy, medium, or hard';
    }

    if (typeof recipeName !== 'string') {
        return 'Recipe name must be a string';
    }

    const mealTypeError = validateMealType(mealType);
    if (mealTypeError) {
        return mealTypeError;
    }

    if (typeof calories !== 'number') {
        return 'Calories must be a number';
    }

    if (typeof protein !== 'number') {
        return 'Protein must be a number';
    }

    return null;
};

module.exports = {
    validateRecipe
};