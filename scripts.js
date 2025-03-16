// Product prices
const prices = {
    chips: 100,
    "juice-small": 50,
    "juice-large": 100,
    sausage: 50,
};

// Cart to store the quantities and products
let cart = {};

// Function to update the cart display
function updateCart() {
    let cartItems = document.getElementById("cart-items");
    cartItems.innerHTML = ''; // Clear existing cart items
    let totalPrice = 0;

    // Loop through cart to create cart item elements
    for (let product in cart) {
        const quantity = cart[product];
        const productPrice = prices[product];
        const productTotal = productPrice * quantity;

        let cartItem = document.createElement("li");
        cartItem.innerHTML = `${product.charAt(0).toUpperCase() + product.slice(1)} 
            <button class="adjust-quantity" data-product="${product}" data-action="decrease">-</button>
            <span>${quantity}</span>
            <button class="adjust-quantity" data-product="${product}" data-action="increase">+</button>
            = ${productTotal} Ksh`;

        cartItems.appendChild(cartItem);

        totalPrice += productTotal;
    }

    // Update the total price
    document.getElementById("total-price").textContent = `${totalPrice} Ksh`;

    // Update "Place Order" button text
    document.getElementById("place-order").textContent = `Place Order (${totalPrice} Ksh)`;
}

// Function to handle adding items to the cart
function addToCart(product) {
    let quantity = document.getElementById(`${product}-quantity`).value;
    quantity = parseInt(quantity);

    if (quantity > 0) {
        cart[product] = quantity;
        updateCart();
    }
}

// Event listeners for "Add to Cart" buttons
const addToCartButtons = document.querySelectorAll(".add-to-cart");
addToCartButtons.forEach(button => {
    button.addEventListener("click", function() {
        const product = button.getAttribute("data-product");
        addToCart(product);
    });
});

// Event listeners for adjusting item quantities (+ and -)
document.addEventListener("click", function(e) {
    if (e.target.classList.contains("adjust-quantity")) {
        const product = e.target.getAttribute("data-product");
        const action = e.target.getAttribute("data-action");

        if (cart[product]) {
            if (action === "increase") {
                cart[product]++;
            } else if (action === "decrease" && cart[product] > 0) {
                cart[product]--;
            }
            updateCart();
        }
    }
});

// Function to handle order submission (just a log for now)
document.getElementById("place-order").addEventListener("click", function() {
    console.log("Order Submitted", cart);
    alert("Order Submitted! We will contact you soon.");
});
