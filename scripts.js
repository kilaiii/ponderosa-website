let cart = JSON.parse(localStorage.getItem("cart")) || [];
updateCart();

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
    if (cart.length > 0) {
  document.getElementById("clearCart").style.display = "block";
} else {
  document.getElementById("clearCart").style.display = "none";
}

    saveCart();
    updateCart();
  });
});

// Save cart to localStorage
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// updateCart() function with 50 Ksh delivery fee if cart is not empty
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

  // Add delivery fee
  let deliveryFee = cart.length > 0 ? 50 : 0;
  if (cart.length > 0) {
    cartItemsDiv.innerHTML += `
      <div class="cart-item">
        <span><strong>Delivery Fee</strong> - 50 Ksh</span>
      </div>
    `;
  }

  let total = subtotal + deliveryFee;
  cartTotalDiv.textContent = `Total: ${total} Ksh`;

  // Reattach event listeners for the buttons
  document.querySelectorAll('.decrease').forEach(button => {
    button.addEventListener('click', function () {
      const index = this.getAttribute('data-index');
      if (cart[index].quantity > 1) {
        cart[index].quantity--;
      } else {
        cart.splice(index, 1); // Remove item if quantity is 1
      }
      saveCart();
      updateCart();
    });
  });

  document.querySelectorAll('.increase').forEach(button => {
    button.addEventListener('click', function () {
      const index = this.getAttribute('data-index');
      cart[index].quantity++;
      saveCart();
      updateCart();
    });
  });
}


// "Place Order" button handler
document.getElementById("placeOrder").addEventListener("click", function() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    let message = "Hello, I want to order:\n";
    cart.forEach(item => {
        message += `${item.name} (x${item.quantity}) - ${item.price * item.quantity} Ksh\n`;
    });

    let total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0) + 50;
    message += `Delivery Fee: 50 Ksh\nTotal: ${total} Ksh`;

    let phoneNumber = "254745798700";
    let whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    // Redirect to WhatsApp
    window.location.href = whatsappURL;

    // Clear the cart
    cart = [];
    saveCart();
    updateCart();

    // Refresh page after 2 seconds
    setTimeout(() => {
        location.reload();
    }, 2000);
});
