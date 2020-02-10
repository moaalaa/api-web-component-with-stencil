import { Component, h, Host } from '@stencil/core';

@Component({
	tag: 'mxcd-stock-price',
	styleUrl: 'stock-price.css',
	shadow: true
})
export class StockPrice {

	// APIKey HX25D28I3EICDW96

	fetchStockPrice(event: Event) {
		event.preventDefault();

		
	}

	render() {
		return (
			<Host>
				<form onSubmit={this.fetchStockPrice.bind(this)}>
					<input id="stock-input" type="text"/>
					<button type="submit">Fetch Price</button>
				</form>
				<div>
					<p>Price: {0}</p>
				</div>
      		</Host>
		)
	}
}
