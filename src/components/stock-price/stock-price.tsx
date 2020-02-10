import { Component, h, Host, State } from '@stencil/core';

@Component({
	tag: 'mxcd-stock-price',
	styleUrl: 'stock-price.css',
	shadow: true
})
export class StockPrice {

	@State() price = 0;
	// APIKey HX25D28I3EICDW96

	fetchStockPrice(event: Event) {
		event.preventDefault();

		fetch('https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=MSFT&apikey=demo')
			.then(result => result.json())
			.then(data => {
				console.log(data['Global Quote']['05. price']);
				
				console.log(parseFloat(data['Global Quote']['05. price']));
				console.log(+data['Global Quote']['05. price']);
				
				// Unary Operator "+" convert operand to number
				// Unary operators are more efficient than standard JavaScript function calls
				// Source: https://scotch.io/tutorials/javascript-unary-operators-simple-and-useful
				this.price = +data['Global Quote']['05. price'];
			})
			.catch(err => console.log(err))
		
	}

	render() {
		return (
			<Host>
				<form onSubmit={this.fetchStockPrice.bind(this)}>
					<input type="text" id="stock-input" value="" placeholder="Search"/>
					<button type="submit">Fetch Price</button>
				</form>
				<div>
					<p>Price: ${this.price}</p>
				</div>
      		</Host>
		)
	}
}
