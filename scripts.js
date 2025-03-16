let cart = [];

const updateCart = () => {
    const cartItemsContainer = document.getElementById('cart-items');
    const totalAmountElement = document.getElementById('total-amount');
    let total = 0;

    cartItemsContainer.innerHTML = '';

    cart.forEach(item => {
        const cartItemElement = document.createElement('div');
        cartItemElement.classList.add('cart-item');
        cartItemElement.innerHTML = `
            <span>${item.name} x${item.quantity}</span>
            <span>${item.price * item.quantity} Ksh</span>
        `;
        cartItemsContainer.appendChild(cartItemElement);
        total += item.price * item.quantity;
    });

    totalAmountElement.innerText = `Total: ${total} Ksh`;

    const placeOrderButton = document.getElementById('place-order');
    placeOrderButton.disabled = cart.length === 0;
    placeOrderButton.innerText = `Place Order (${total} Ksh)`;
};

const addToCart = (product, price) => {
    const existingItem = cart.find(item => item.name === product);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ name: product, price, quantity: 1 });
    }

    updateCart();
};

const updateItemQuantity = (product, quantity) => {
    const item = cart.find(item => item.name === product);
    if (item) {
        item.quantity = parseInt(quantity);
        if (item.quantity <= 0) {
            cart = cart.filter(cartItem => cartItem !== item);
        }
    }

    updateCart();
};

document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
        const product = button.getAttribute('data-product');
        const price = parseInt(button.getAttribute('data-price'));
        addToCart(product, price);
    });
});

document.querySelectorAll('.order-quantity').forEach(input => {
    input.addEventListener('change', () => {
        const product = input.getAttribute('data-product');
        const quantity = input.value;
        updateItemQuantity(product, quantity);
    });
});

document.getElementById('place-order').addEventListener('click', () => {
    alert('Order placed! Total: ' + document.getElementById('total-amount').innerText);
});
