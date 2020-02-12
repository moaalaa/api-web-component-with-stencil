import { Component, Event, EventEmitter, h, Host, State } from '@stencil/core';
import { AV_API_KEY } from '../../global/global';


type Stock = {
	symbol: string,
	name: string
};

@Component({
	tag: 'mxcd-stock-finder',
	styleUrl: 'stock-finder.css',
	shadow: true
})
export class StockFinder {
	stockNameInput: HTMLInputElement;


	@State() stocks: Stock[] = [];

	// Good Practice to be Define a UniqueEvent Names
	// Maybe some other components emit same event name.
	// "EventEmitter" is a generic type Event so we can define our extra information with the type definitions
	// and we can do this by using "<data here, and here>"
	@Event({bubbles: true, composed: true}) mxcdSymbolSelected: EventEmitter<string>;

	private findStocks(event: Event) {
		event.preventDefault();

		const stockName = this.stockNameInput.value;

		fetch(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${stockName}&apikey=${AV_API_KEY}`)
			.then(res => res.json())
			.then(data => {
				this.stocks = data['bestMatches'].map(match => {
					return { symbol: match['1. symbol'], name: match['2. name'] };
				});
			})
			.catch(err => console.error(err));
	}

	onSelectSymbol(symbol: string) {
		this.mxcdSymbolSelected.emit(symbol);
	}

	render() {

		return (
			<Host>
				{/* 
					We Can Use "Arrow Function" As Callback 
					that Call our Function to resolve the "this" issue and run it normally
					or just use our normal function directly an Callback but don't forget to bind "this"
				*/}

				{/* <form onSubmit={this.findStocks.bind(this)}> */}
				<form onSubmit={(event: Event) => this.findStocks(event)}>
					<input
						type="text"
						id="stock-input"
						placeholder="Search"
						ref={el => this.stockNameInput = el}
					/>
					<button type="submit">Fetch Stock</button>
				</form>
				<ul>
					{this.stocks.map((stock: Stock) => {
						return <li onClick={this.onSelectSymbol.bind(this, stock.symbol)}>
									<strong>{stock.symbol}</strong> - {stock.name}
								</li>
					})}
				</ul>

			</Host>
		)
	}
}
