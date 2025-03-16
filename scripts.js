let cart = [];

// Handle the "Add to Cart" buttons
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', (e) => {
        const itemName = e.target.getAttribute('data-name');
        const itemPrice = parseInt(e.target.getAttribute('data-price'));
        
        // Add the item to the cart
        cart.push({ name: itemName, price: itemPrice, quantity: 1 });

        // Update the cart display
        updateCart();
    });
});

// Update the cart items in the sidebar
function updateCart() {
    const cartItemsContainer = document.getElementById('cartItems');
    const totalAmountElement = document.getElementById('totalAmount');
    cartItemsContainer.innerHTML = ''; // Clear previous items
    let totalAmount = 0;

    cart.forEach((item, index) => {
        totalAmount += item.price * item.quantity;
        cartItemsContainer.innerHTML += `
            <div class="cart-item">
                <span>${item.name} (x${item.quantity}) - ${item.price * item.quantity} Ksh</span>
                <button class="increase-qty" data-index="${index}">+</button>
                <button class="decrease-qty" data-index="${index}">-</button>
            </div>
        `;
    });

    totalAmountElement.textContent = totalAmount;
}

// Increase item quantity in the cart
document.getElementById('cartItems').addEventListener('click', (e) => {
    const index = e.target.getAttribute('data-index');
    if (e.target.classList.contains('increase-qty')) {
        cart[index].quantity++;
    }
    if (e.target.classList.contains('decrease-qty')) {
        if (cart[index].quantity > 1) {
            cart[index].quantity--;
        }
    }
    updateCart();
});

// Handle the "Place Order" button
document.getElementById('placeOrder').addEventListener('click', () => {
    alert('Order placed!'); // This is where you'd handle the backend order processing
});
