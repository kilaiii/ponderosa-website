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

// updateCart() function that auto-adds a 50 Ksh delivery fee if cart is not empty
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
  
  // Automatically add delivery fee if there's at least one item
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

// "Place Order" button handler
document.getElementById("placeOrderBtn").addEventListener("click", function() {
    let cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    if (cartItems.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    let message = "Hello, I want to order:\n";
    cartItems.forEach(item => {
        message += `${item.name} (x${item.quantity}) - ${item.price * item.quantity} Ksh\n`;
    });
    message += `Total: ${calculateTotal()} Ksh`;

    let phoneNumber = "254745798700";  // Your WhatsApp number
    let whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    // Redirect to WhatsApp
    window.location.href = whatsappURL;

    // Clear the cart
    localStorage.removeItem("cart");

    // Refresh page after 2 seconds (giving time for redirect)
    setTimeout(() => {
        location.reload();
    }, 2000);
});

function calculateTotal() {
    let cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    return cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
}

