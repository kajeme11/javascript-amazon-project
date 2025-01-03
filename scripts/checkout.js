import {renderOrderSummary} from './checkout/orderSummary.js'
import {renderPaymentSummary} from './checkout/paymentSummary.js';
import {loadProducts, fetchProducts} from '../data/products.js';
import {loadCart} from '../data/cart.js';


async function loadPage(){
    console.log('load page');
    await fetchProducts(); 
    await new Promise((resolve) => {
        loadCart(() => {
            resolve();
        });

    });
    renderOrderSummary();
    renderPaymentSummary();
    
}

loadPage();
/*
Promise.all([
    fetchProducts(),
    new Promise((resolve) => {
        loadCart(() => {
            resolve();
        });

    })
]).then((values) => {
    renderOrderSummary();
    renderPaymentSummary();
})
*/  

// loadProducts(() => {
//     renderOrderSummary();
//     renderPaymentSummary();
// });