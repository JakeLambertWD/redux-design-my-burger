import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

class Checkout extends Component {
	// Cancel Checkout
	checkoutCancelledHandler = () => {
		// Go back to the previous page
		this.props.history.goBack();
	};

	// Continue Checkout
	checkoutContinuedHandler = () => {
		// replace current URL
		this.props.history.replace('/checkout/contact-data');
	};

	render() {
		return (
			<div>
				<CheckoutSummary
					ingredients={this.props.ings}
					checkoutCancelled={this.checkoutCancelledHandler}
					checkoutContinued={this.checkoutContinuedHandler}
				/>
				{/* Nested Route */}
				<Route
					path={this.props.match.path + '/contact-data'}
					component={ContactData}
				/>
			</div>
		);
	}
}

// Subscribe (to access state)
const mapStateToProps = state => {
	return {
		ings: state.ingredients
	};
};

export default connect(mapStateToProps)(Checkout);
