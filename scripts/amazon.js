import {cart, addToCart} from '../data/cart.js'
import {products, loadProducts} from '../data/products.js';


loadProducts(renderProducts);

function renderProducts(){
  let productHTML = '';
  products.forEach((product) => {
      productHTML += `
          <div class="product-container">
            <div class="product-image-container">
              <img class="product-image"
                src=${product.image}>
            </div>

            <div class="product-name limit-text-to-2-lines">
              ${product.name}
            </div>

            <div class="product-rating-container">
              <img class="product-rating-stars"
                src=${product.getStars()}>
              <div class="product-rating-count link-primary">
                ${product.rating.count}
              </div>
            </div>

            <div class="product-price">
              ${product.getPrice()}
            </div>

            <div class="product-quantity-container">
              <select>
                <option selected value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
              </select>
            </div>

            ${product.getSizeChart()}

            <div class="product-spacer"></div>

            <div class="added-to-cart">
              <img src="images/icons/checkmark.png">
              Added
            </div>

            <button class="add-to-cart-button button-primary js-add-to-cart"
              data-product-id="${product.id}">
              Add to Cart
            </button>
          </div>
      `

      // console.log(productHTML);
  });

  document.querySelector('.js-products-grid').innerHTML = productHTML;

  function updateCartQuantity(){
        //defalt value for cart is 0, set in html, here we modify that 
        let quantityTotal = 0;
        cart.forEach((item) => {
            quantityTotal += item.quantity;
        });
        document.querySelector(".js-cart-quantity").innerHTML = quantityTotal;
  }

  document.querySelectorAll(".js-add-to-cart").forEach((button) => {
      button.addEventListener('click', () => {
          //html attribute on 'add to cart button' data-product-name accessed through dataset
          // console.log(button.dataset.productId);
          // console.log(cart);
          const productId = button.dataset.productId;
          addToCart(productId);
          updateCartQuantity();
      });
  });
  updateCartQuantity();
}
