import { Component, h } from "@stencil/core";

@Component({
    tag: 'mxcd-spinner',
    styleUrl: 'spinner.css',
    shadow: true
    
})
export class Spinner {

    render() {
        // Source: https://loading.io/css/
        return <div class="lds-dual-ring"></div>;
    }
}