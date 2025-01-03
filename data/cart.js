import { products } from "./products.js";

export let cart;

loadFromStorage();

export function loadFromStorage(){
    cart = JSON.parse(localStorage.getItem('cart'));

    if(!cart){
        cart = [
            {
                productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
                quantity: 2,
                deliveryOptionId: '1'
            },
            {
                productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
                quantity: 1,
                deliveryOptionId: '2'
            }
        ];
    }
}

function saveToStorage(){
    // localStorage(name, string format data)
    localStorage.setItem('cart', JSON.stringify(cart));
}

export function addToCart(productId){
    let itemName;
    cart.forEach((item) => {
        if(item.productId === productId){
            itemName = item;
        }
    });
    if(itemName){
        itemName.quantity += 1;
    }else{
        cart.push( 
            {
                productId: productId,
                quantity: 1,
                deliveryOptionId: '1'
            }
        );
    }
    saveToStorage();
}

export function removeProductFromCart(productId){
    const newCart = [];
    cart.forEach((product) => {
        if(product.productId !== productId){
            newCart.push(product);
        }
        if(product.productId === productId && product.quantity > 1){
            console.log("inside")
            product.quantity -= 1;
            newCart.push(product);
            document.querySelector(".js-product-quantity").innerHTML = product.quantity;
        }
    });
    cart = newCart;
    let productPresent = false;
    cart.forEach((item) => {
        if(item.productId === productId){
            productPresent = true;
        }
    });
    if(!productPresent){
        const container = document.querySelector(`.js-cart-item-container-${productId}`);
        // console.log(container);            
        container.remove();
    }
    saveToStorage();
    console.log(cart);
}

export function updateDeliveryOption(productId, deliveryOptionId){
    let matchingProduct;
    cart.forEach((cartItem) => {
        if(cartItem.productId === productId){
            matchingProduct = cartItem;
        }
        console.log("delivery option " + deliveryOptionId)
    });
    matchingProduct.deliveryOptionId = deliveryOptionId;
    saveToStorage();
}


export function loadCart(func){
    const xhr = new XMLHttpRequest();
  
    xhr.addEventListener('load', () => {
    //   console.log(xhr.response);
      func();
    });
    xhr.open('GET', 'https://supersimplebackend.dev/cart');
    xhr.send();
  }