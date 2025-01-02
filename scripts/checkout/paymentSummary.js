import {cart} from '../../data/cart.js';
import {getProduct} from '../../data/products.js';
import formatFrequency from '../utils/money.js';
import {getDeliveryOptions} from '../../data/deliveryOptions.js';

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

    <button class="place-order-button button-primary">
    Place your order
    </button>`;
}
