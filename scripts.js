let cart = [];
let currentDeliveryFee = 50; // Global variable to hold the manually set delivery fee

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

// Updated updateCart() function with manual delivery fee input
function updateCart() {
  const cartItemsDiv = document.getElementById('cartItems');
  const cartTotalDiv = document.getElementById('cartTotal');
  cartItemsDiv.innerHTML = ''; // Clear current cart items
  
  let subtotal = 0;
  cart.forEach((item, index) => {
    subtotal += item.price * item.quantity;
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
  
  // Automatically add delivery fee if the cart is not empty
  let deliveryFee = (cart.length > 0) ? 50 : 0;
  if (cart.length > 0) {
    cartItemsDiv.innerHTML += `
      <div class="cart-item">
        <span><strong>Delivery Fee</strong> - 50 Ksh</span>
      </div>
    `;
  }
  
  let total = subtotal + deliveryFee;
  cartTotalDiv.textContent = 'Total: ' + total + ' Ksh';
}


// Event listener for quantity adjustments (for "-" and "+" buttons)
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

// Listen for changes on the delivery fee input and update the cart accordingly
document.addEventListener('input', (e) => {
  if (e.target && e.target.id === 'deliveryFeeInput') {
    currentDeliveryFee = parseInt(e.target.value) || 0;
    updateCart();
  }
});

// "Place Order" button handler
document.getElementById('placeOrder').addEventListener('click', () => {
  let message = 'I would like to place an order:\n';
  cart.forEach(item => {
    message += `${item.name} x${item.quantity} = ${item.price * item.quantity} Ksh\n`;
  });
  // Include delivery fee if applicable; assuming it's always 50 when cart is not empty
  if (cart.length > 0) {
    message += `Delivery Fee: 50 Ksh\n`;
  }
  // Extract the total from the cart total element
  message += document.getElementById('cartTotal').textContent;
  
  // Encode the message for use in a URL
  message = encodeURIComponent(message);
  
  // Redirect to WhatsApp with the pre-filled message (update the number as needed)
  window.location.href = `https://wa.me/254745798700?text=${message}`;
});
