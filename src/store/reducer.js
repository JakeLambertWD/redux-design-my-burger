import * as actionTypes from './actions';

// State
const initialState = {
	ingredients: {
		salad: 0,
		bacon: 0,
		cheese: 0,
		meat: 0
	},
	totalPrice: 4
};

// Prices
const INGREDIENT_PRICES = {
	salad: 0.2,
	bacon: 1,
	cheese: 0.3,
	meat: 1.4
};

// Reducer
const reducer = (state = initialState, action) => {
	switch (action.type) {
		// Add
		case actionTypes.ADD_INGREDIENT:
			return {
				// Make a copy of the state.
				...state,
				// New ingredients object
				ingredients: {
					...state.ingredients,
					// meat: (1) + 1
					[action.ingredientName]: state.ingredients[action.ingredientName] + 1
				},
				totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
			};
		// Remove
		case actionTypes.REMOVE_INGREDIENT:
			return {
				...state,
				ingredients: {
					...state.ingredients,
					// meat: (1) - 1
					[action.ingredientName]: state.ingredients[action.ingredientName] - 1
				},
				totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredients]
			};
		default:
			return state;
	}
};

export default reducer;
