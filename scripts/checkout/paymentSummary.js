import {cart} from '../../data/cart.js';
import {getProduct} from '../../data/products.js';
import formatFrequency from '../utils/money.js';
import {getDeliveryOptions} from '../../data/deliveryOptions.js';
import {addOrder} from '../../data/orders.js';

export function renderPaymentSummary(){
    
    let result = 0;
    let deliveryShipping = 0;
    let itemQuantity = 0
    cart.forEach((cartItem) => {
        itemQuantity += cartItem.quantity;
        const prouct = getProduct(cartItem.productId);
        result += prouct.priceCents * cartItem.quantity;
        const deliveryOption = getDeliveryOptions(cartItem.deliveryOptionId);
        deliveryShipping += deliveryOption.priceCents;
    });
    const totalBeforeTax = result + deliveryShipping;
    const tax = totalBeforeTax * 0.1;
    const total = totalBeforeTax + tax;

    const paymentSummary = document.querySelector(".payment-summary");
    document.querySelector(".js-page-title").innerHTML = (itemQuantity === 0) ? 'Cart is Empty': 'Review your order';
   
    paymentSummary.innerHTML = `
    <div class="payment-summary-title">
    Order Summary
    </div>

    <div class="payment-summary-row">
    <div>Items: ${itemQuantity}</div>
    <div class="payment-summary-money">$${formatFrequency(result)}</div>
    </div>

    <div class="payment-summary-row">
    <div>Shipping &amp; handling:</div>
    <div class="payment-summary-money">$${formatFrequency(deliveryShipping)}</div>
    </div>

    <div class="payment-summary-row subtotal-row">
    <div>Total before tax:</div>
    <div class="payment-summary-money">$${formatFrequency(totalBeforeTax)}</div>
    </div>

    <div class="payment-summary-row">
    <div>Estimated tax (10%):</div>
    <div class="payment-summary-money">$${formatFrequency(tax)}</div>
    </div>

    <div class="payment-summary-row total-row">
    <div>Order total:</div>
    <div class="payment-summary-money">$${formatFrequency(total)}</div>
    </div>

    <div class="js-place-order-button">
    </div>
    `;
    
    document.querySelector(".js-place-order-button").innerHTML = (itemQuantity === 0) ? `` : `<button class="place-order-button button-primary">
    Place your order
    </button>`; 
    
    document.querySelector(".js-place-order-button").addEventListener('click', async () => {
        
        try{
            const response = await fetch('https://supersimplebackend.dev/orders',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                cart: cart
            })
        });
        //response.json() is also a promise that we need to wait for
        const order =  await response.json();
        addOrder(order);
        // console.log(order);
        window.location.href = 'orders.html';
        }catch(error){
            console.log('Error submitting order, please try again later');
            console.log(error)
        }
    });
}
