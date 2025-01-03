import {renderOrderSummary} from './checkout/orderSummary.js'
import {renderPaymentSummary} from './checkout/paymentSummary.js';
import {loadProducts} from '../data/products.js';


new Promise((resolve) => {
    loadProducts(() => {
        console.log('Products loaded');
        resolve();
    })
}).then(() => {
    renderOrderSummary();
    renderPaymentSummary();
    
});

// loadProducts(() => {
//     renderOrderSummary();
//     renderPaymentSummary();
// });