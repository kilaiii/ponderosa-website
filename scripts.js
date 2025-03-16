let cart = [];

// Event listener for "Add to Cart" buttons
document.querySelectorAll('.add-to-cart').forEach(button => {
  button.addEventListener('click', () => {
    const name = button.getAttribute('data-name');
    const price = parseInt(button.getAttribute('data-price'));
    const existing = cart.find(item => item.name === name);
    if (existing) {
      existing.quantity++;
    } else {
      cart.push({ name: name, price: price, quantity: 1 });
    }
    updateCart();
  });
});

// Update the cart display
function updateCart() {
  const cartItemsDiv = document.getElementById('cartItems');
  const cartTotalDiv = document.getElementById('cartTotal');
  cartItemsDiv.innerHTML = ''; // Clear current items
  let total = 0;
  cart.forEach((item, index) => {
    total += item.price * item.quantity;
    // Wrap product name in <strong> to make it bold
    cartItemsDiv.innerHTML += `
      <div class="cart-item">
        <span><strong>${item.name}</strong> (x${item.quantity}) - ${item.price * item.quantity} Ksh</span>
        <div>
          <button class="decrease" data-index="${index}">-</button>
          <button class="increase" data-index="${index}">+</button>
        </div>
      </div>
    `;
  });
  cartTotalDiv.textContent = 'Total: ' + total + ' Ksh';
}

// Handle quantity adjustments in the cart
document.getElementById('cartItems').addEventListener('click', (e) => {
  const index = e.target.getAttribute('data-index');
  if (e.target.classList.contains('decrease')) {
    if (cart[index].quantity > 1) {
      cart[index].quantity--;
    } else {
      cart.splice(index, 1);
    }
  }
  if (e.target.classList.contains('increase')) {
    cart[index].quantity++;
  }
  updateCart();
});

// Place Order button handler
document.getElementById('placeOrder').addEventListener('click', () => {
  alert('Order placed! Total: ' + document.getElementById('cartTotal').textContent);
});
