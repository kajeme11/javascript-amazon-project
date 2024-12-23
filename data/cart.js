export const cart = [];



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