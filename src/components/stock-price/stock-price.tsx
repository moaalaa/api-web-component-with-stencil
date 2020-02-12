import { Component, Element, h, Host, Listen, Prop, State, Watch } from '@stencil/core';
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
	private stockInput: HTMLInputElement;
	// private initialStockSymbol: string;

	// Used for method 3: two way binding
	@State() stockUserInput: string;
	@State() stockValidInput = false;

	
	@State() price = 0;
	@State() error: string;
	
	
	@Prop({ reflect: true, mutable: true }) stockSymbol: string;

	// Watch stockSymbol method 2 (best choice)
	@Watch('stockSymbol')
	stockSymbolChanged(new_value: string, old_value: string) {
		if (new_value !== old_value) {
			this.stockUserInput = new_value; 
			this.stockValidInput = true;
			this.fetchStockPrice(new_value);
		}
	}

	// Listen to user input (method 3: two way binding)
	// Used As Validation Here
	onUserInput(event: Event) {
		this.stockUserInput = (event.target as HTMLInputElement).value;

		if (this.stockUserInput.trim() !== '') {
			this.stockValidInput = true;
		} else {
			this.stockValidInput = false;
		}
	}
	
	// used for documenting more than logic
	onFetchStockPrice(event: Event) {
		event.preventDefault();

		// Get User Input
		// I Choose to use Method 2 More simple and wat i want 
		// But Also Using Method 3 as a validation

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
		this.stockSymbol = this.stockInput.value;

		// ------------------------
		// Method 3: two Way Binding
		// const stockSymbol = this.stockUserInput;

		// ---------------------------------------------//
		// Stop Calling API From Here Because We Change The "this.stockSymbol" above so the watcher will fire the API
		// this.fetchStockPrice(stockSymbol);
	}

	componentWillLoad() {
		if (this.stockSymbol) {
			// this.initialStockSymbol = this.stockSymbol;
			this.stockUserInput = this.stockSymbol;
			this.stockValidInput = true;
		}
	}

	componentDidLoad() {
		if (this.stockSymbol) {
			this.fetchStockPrice(this.stockSymbol);
		}
	}

	componentDidUpdate() {
		// Watching this.stockSymbol method 1 
		// if (this.stockSymbol !== this.initialStockSymbol) {
		// 	this.initialStockSymbol = this.stockSymbol;
		// 	this.stockUserInput = this.stockSymbol;
		// 	this.fetchStockPrice(this.stockSymbol);
		// }
	}

	// We Must target an element to listen to the other component element because 
	// "mxcdSymbolSelected" event is emitted from a siblings component not from an child component
	// "@Listen" Decorator Search on event inside it's elements not siblings
	// So We Need to till "@Listen" Decorator to listen on "mxcdSymbolSelected" by targeting "central element"
	// "Central ELement" here is body, and that because 
	// the "mxcdSymbolSelected" event will "Bubble up" from it's Host Element away to the body 
	// and then will "capture down" from the parent|body|html element to the Host Element Again
	// The Next Line is the old way to listen to an event on the body
	// -> @Listen('body:mxcdSymbolSelected')

	// New Way from Official Docs Listen to an event and target the body
	@Listen('mxcdSymbolSelected', {target: 'body'})
	onStockSymbolSelected(event: CustomEvent) {
		if (event.detail && event.detail !== this.stockSymbol) {
			// Watcher will work and run the fetch (Watcher very useful here)
			this.stockSymbol = event.detail;
		}
	}

	private fetchStockPrice(stockSymbol: string) {
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
			.catch((err: Error) => {
				this.error = err.message;
				this.price = null;
			});
	}

	render() {
		let dataContent = <p>Please Enter A Symbol</p>;

		if (this.price) {
			dataContent = <p>Price: ${this.price}</p>;
		}
		
		if (this.error) {
			console.log(this.error);
			
			dataContent = <p style={{color: 'red'}}>{this.error}</p>;
		}

		return (
			<Host>
				<form onSubmit={this.onFetchStockPrice.bind(this)}>
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
