/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */


import { HTMLStencilElement, JSXBase } from '@stencil/core/internal';


export namespace Components {
  interface MxcdSpinner {}
  interface MxcdStockFinder {}
  interface MxcdStockPrice {
    /**
    * Stock Symbol That will Search for
    */
    'stockSymbol': string;
  }
}

declare global {


  interface HTMLMxcdSpinnerElement extends Components.MxcdSpinner, HTMLStencilElement {}
  var HTMLMxcdSpinnerElement: {
    prototype: HTMLMxcdSpinnerElement;
    new (): HTMLMxcdSpinnerElement;
  };

  interface HTMLMxcdStockFinderElement extends Components.MxcdStockFinder, HTMLStencilElement {}
  var HTMLMxcdStockFinderElement: {
    prototype: HTMLMxcdStockFinderElement;
    new (): HTMLMxcdStockFinderElement;
  };

  interface HTMLMxcdStockPriceElement extends Components.MxcdStockPrice, HTMLStencilElement {}
  var HTMLMxcdStockPriceElement: {
    prototype: HTMLMxcdStockPriceElement;
    new (): HTMLMxcdStockPriceElement;
  };
  interface HTMLElementTagNameMap {
    'mxcd-spinner': HTMLMxcdSpinnerElement;
    'mxcd-stock-finder': HTMLMxcdStockFinderElement;
    'mxcd-stock-price': HTMLMxcdStockPriceElement;
  }
}

declare namespace LocalJSX {
  interface MxcdSpinner {}
  interface MxcdStockFinder {
    /**
    * Fired When Symbol is selected
    */
    'onMxcdSymbolSelected'?: (event: CustomEvent<string>) => void;
  }
  interface MxcdStockPrice {
    /**
    * Stock Symbol That will Search for
    */
    'stockSymbol'?: string;
  }

  interface IntrinsicElements {
    'mxcd-spinner': MxcdSpinner;
    'mxcd-stock-finder': MxcdStockFinder;
    'mxcd-stock-price': MxcdStockPrice;
  }
}

export { LocalJSX as JSX };


declare module "@stencil/core" {
  export namespace JSX {
    interface IntrinsicElements {
      'mxcd-spinner': LocalJSX.MxcdSpinner & JSXBase.HTMLAttributes<HTMLMxcdSpinnerElement>;
      'mxcd-stock-finder': LocalJSX.MxcdStockFinder & JSXBase.HTMLAttributes<HTMLMxcdStockFinderElement>;
      'mxcd-stock-price': LocalJSX.MxcdStockPrice & JSXBase.HTMLAttributes<HTMLMxcdStockPriceElement>;
    }
  }
}


