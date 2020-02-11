import { Component, Element, h, Host, State } from '@stencil/core';
import { AV_API_KEY } from '../../global/global';

@Component({
	tag: 'mxcd-stock-price',
	styleUrl: 'stock-price.css',
	shadow: true
})
export class StockPrice {

	// Access the Host Element
	// Using for method 1: querySelector our element
	@Element() el: HTMLElement;

	// Reference property to element
	// Used for method 2: element reference
	stockInput: HTMLInputElement;

	// Used for method 3: two way binding
	@State() stockUserInput: string;
	@State() stockValidInput = false;

	
	@State() price = 0;
	@State() error: string;

	// Listen to user input (method 3: two way binding)
	onUserInput(event: Event) {
		this.stockUserInput = (event.target as HTMLInputElement).value;

		if (this.stockUserInput.trim() !== '') {
			this.stockValidInput = true;
		} else {
			this.stockValidInput = false;
		}
	}
	
	fetchStockPrice(event: Event) {
		event.preventDefault();

		// Get User Input
		// Method 1: Using Old School querySelector
		// --- Because "el" is type of "HTMLElement" and most "HTMLElement" doesn't have a "value" property
		// --- TypeScript Will give an error
		// this.el.querySelector('#stock-input').value;
		// --- So We must till TypeScript that we have a "HTMLInputElement" Instead
		// --- By Default "this.el.querySelector" it will give us an error because we using "Shadow DOM"
		// const stockSymbol = (this.el.querySelector('#stock-input') as HTMLInputElement).value;
		// --- So We Need to Query "Shadow DOM" Instead by using "shadowRoot"
		// const stockSymbol = (this.el.shadowRoot.querySelector('#stock-input') as HTMLInputElement).value;

		// ------------------------
		// Method 2: Using Reference
		// const stockSymbol = this.stockInput.value;

		// ------------------------
		// Method 3: two Way Binding
		const stockSymbol = this.stockUserInput;


		fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${stockSymbol}&apikey=${AV_API_KEY}`)
			.then(result => result.json())
			.then(data => {
				
				if (! data.hasOwnProperty('Global Quote')) {
					throw new Error('Invalid Symbol idiot :)');
				}

				this.error = null;
				
				// Unary Operator "+" convert operand to number
				// Unary operators are more efficient than standard JavaScript function calls
				// Source: https://scotch.io/tutorials/javascript-unary-operators-simple-and-useful
				this.price = +data['Global Quote']['05. price'];
			})
			.catch((err: Error) => this.error = err.message)
		
	}

	render() {
		let dataContent = <p>Please Enter A Symbol</p>;

		if (this.error) {
			dataContent = <p style={{color: 'red'}}>{this.error}</p>;
		}
		
		if (this.price) {
			dataContent = <p>Price: ${this.price}</p>;
		}

		return (
			<Host>
				<form onSubmit={this.fetchStockPrice.bind(this)}>
					<input 
						type="text" 
						id="stock-input" 
						placeholder="Search" 
						ref={el => this.stockInput = el} 
						// Enable two way binding
						value={this.stockUserInput}
						onInput={this.onUserInput.bind(this)}
						autoFocus
					/>
					<button type="submit" disabled={!this.stockValidInput}>Fetch Price</button>
				</form>
				<div> {dataContent} </div>
      		</Host>
		)
	}
}
