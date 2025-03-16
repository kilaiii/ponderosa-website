let cart = [];

// Handle the "Add to Cart" button clicks
document.querySelectorAll('.add-to-cart').forEach(button => {
  button.addEventListener('click', (e) => {
    const itemName = e.target.getAttribute('data-name');
    const itemPrice = parseInt(e.target.getAttribute('data-price'));
    
    // Check if the item already exists in the cart; if so, increase its quantity
    const existingItem = cart.find(item => item.name === itemName);
    if (existingItem) {
      existingItem.quantity++;
    } else {
      cart.push({ name: itemName, price: itemPrice, quantity: 1 });
    }
    updateCart();
  });
});

// Update the cart display in the sidebar
function updateCart() {
  const cartItemsContainer = document.getElementById('cartItems');
  const totalAmountElement = document.getElementById('totalAmount');
  cartItemsContainer.innerHTML = ''; // Clear current cart items
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

// Adjust quantity in the cart using + and - buttons
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

// Place Order button handler
document.getElementById('placeOrder').addEventListener('click', () => {
  alert('Order placed! Total: ' + document.getElementById('totalAmount').textContent + ' Ksh');
});
