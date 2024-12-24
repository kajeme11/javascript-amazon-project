export let cart = [
    {
        productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity: 2
    },
    {
        productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
        quantity: 1
    }
];

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
                quantity: 1
            }
        );
    }
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
    })
    if(!productPresent){
        const container = document.querySelector(`.js-cart-item-container-${productId}`);
        // console.log(container);            
        container.remove();
    }
    console.log(cart);
}