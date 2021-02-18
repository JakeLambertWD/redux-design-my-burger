import React, { Component } from 'react';
import { connect } from 'react-redux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actionTypes from '../../store/actions';

class BurgerBuilder extends Component {
	// STATE
	state = {
		purchasing: false,
		loading: false,
		error: false
	};

	// Retreive the Firebase data
	componentDidMount() {
		// axios
		// 	.get(
		// 		'https://create-my-burger-e2081-default-rtdb.firebaseio.com/ingredients.json'
		// 	)
		// 	.then(res => {
		// 		this.setState({ ingredients: res.data });
		// 	})
		// 	.catch(err => {
		// 		this.setState({ error: true });
		// 	});
	}

	// PURCHASE BUTTON DISABLED
	updatePurchaseState(currentIngredients) {
		const sum = Object.keys(currentIngredients) // [salad, bacon, cheese, meat]
			.map(igKey => {
				return currentIngredients[igKey]; // [0, 0, 0, 1];
			})
			// The reduce() method reduces the array to a single value.
			.reduce((sum, el) => {
				return sum + el;
			}, 0);
		// returns a boolean
		return sum > 0;
	}

	// TOGGLE MODAL
	purchaseHandler = () => {
		this.setState({ purchasing: true });
	};

	// CLOSE MODAL
	purchaseCancelHandler = () => {
		this.setState({ purchasing: false });
	};

	// CONTINUE ORDER
	purchaseContinueHandler = () => {
		// Custom entry into the history stack
		this.props.history.push('/checkout');
	};

	render() {
		// DISABLE LESS BUTTON
		const disabledInfo = {
			...this.props.ings
		};
		// loop through all the keys in our object
		for (let key in disabledInfo) {
			// check if the values of our keys are a positive number
			disabledInfo[key] = disabledInfo[key] <= 0;
			// expected outcome - {salad: true, bacon: false, ...}
		}

		let orderSummary = null;
		// Set Burger to the Spinner
		let burger = this.state.error ? <p>Can't load ingredients</p> : <Spinner />;
		// Check Ingredients are True
		if (this.props.ings) {
			// Display Burger & Build Controls to the UI
			burger = (
				<>
					<Burger ingredients={this.props.ings} />
					<BuildControls
						ingredientAdded={this.props.onIngredientAdded}
						ingredientRemoved={this.props.onIngredientRemoved}
						disabled={disabledInfo}
						price={this.props.price}
						purchasable={this.updatePurchaseState(this.props.ings)}
						ordered={this.purchaseHandler}
					/>
				</>
			);
			// Display Order Summary to the UI
			orderSummary = (
				<OrderSummary
					ingredients={this.props.ings}
					price={this.props.price}
					purchaseCancelled={this.purchaseCancelHandler}
					purchaseContinued={this.purchaseContinueHandler}
				/>
			);
		}
		// set Order Summary to Spinner
		if (this.state.loading) {
			orderSummary = <Spinner />;
		}

		return (
			<>
				{/* prettier-ignore */}
				<Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
					{orderSummary}
				</Modal>
				{burger}
			</>
		);
	}
}

// Subscribe (to access state)
const mapStateToProps = state => {
	return {
		ings: state.ingredients,
		price: state.totalPrice
	};
};

// Dispatch Action
const mapDispatchToProps = dispatch => {
	return {
		onIngredientAdded: ingName => dispatch({ type: actionTypes.ADD_INGREDIENT, ingredientName: ingName }),
		onIngredientRemoved: ingName => dispatch({ type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName })
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
