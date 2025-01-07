// Initialize cart items
let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

// Function to update the cart UI
function updateCartUI() {
    const cartBody = document.getElementById('cart-body'); // Update to match your HTML
    const totalPriceElement = document.getElementById('total-price'); // Already matching
    cartBody.innerHTML = ''; // Clear the cart items before populating
    let totalPrice = 0;

    cartItems.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.product}</td>
            <td>${item.quantity}</td>
            <td>Rs.${(item.price * item.quantity).toFixed(2)}</td>
        `;
        cartBody.appendChild(row);
        totalPrice += item.price * item.quantity;
    });

    if (totalPriceElement) {
        totalPriceElement.textContent = `Rs.${totalPrice.toFixed(2)}`;
    }
}

// Function to handle adding items to the cart
function addToCart(product, price, quantity) {
    const parsedQuantity = parseInt(quantity); // Parse quantity as an integer

    // Validate input: check if the quantity is a whole number
    if (isNaN(parsedQuantity) || parsedQuantity <= 0 || parseFloat(quantity) !== parsedQuantity) {
        alert("Invalid input. Quantities must be whole numbers.");
        return;
    }

    // Check if item already exists in the cart
    const existingItem = cartItems.find(item => item.product === product);
    if (existingItem) {
        existingItem.quantity += parsedQuantity;
    } else {
        cartItems.push({ product, price, quantity: parsedQuantity });
    }

    // Update localStorage and UI
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    updateCartUI();

    alert(`${parsedQuantity} unit(s) of ${product} added to your cart.`);
}

// Function to clear the cart
function clearCart() {
    cartItems = []; // Clear the cart items array
    localStorage.removeItem('cartItems'); // Remove from localStorage
    updateCartUI(); // Refresh the UI immediately
    alert("Your cart has been cleared!");
}

// Function to save the cart as favourites
function saveCartAsFavourites() {
    if (cartItems.length === 0) {
        alert("Your cart is empty. Please add items to the cart before saving as favourites.");
        return;
    }

    // Overwrite existing favourites in localStorage
    localStorage.setItem('favouriteCart', JSON.stringify(cartItems));
    alert("Your current cart has been saved as favourites!");
}

// Function to load favourites into the cart
function buyFavourites() {
    const favouriteCart = JSON.parse(localStorage.getItem('favouriteCart')) || [];
    if (favouriteCart.length === 0) {
        alert("No favourites found. Add items to favourites first.");
        return;
    }

    cartItems = favouriteCart; // Replace cartItems with favourites
    localStorage.setItem('cartItems', JSON.stringify(cartItems)); // Sync with localStorage
    updateCartUI(); // Update the UI immediately
    alert("Favourites have been added to your cart!");
}

// Event listeners
document.addEventListener('DOMContentLoaded', updateCartUI); // Update UI when the page loads

// Add event listeners for buttons
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function () {
        const product = this.getAttribute('data-product');
        const price = parseFloat(this.getAttribute('data-price'));
        const quantityInput = this.previousElementSibling.value;

        // Validate and add to cart
        addToCart(product, price, quantityInput);
    });
});

document.getElementById('clear-cart-btn')?.addEventListener('click', clearCart);

document.getElementById('addtofav')?.addEventListener('click', () => {
    saveCartAsFavourites();
    updateCartUI(); // Refresh UI immediately after saving favourites
});

document.getElementById('addtofav-order')?.addEventListener('click', () => {
    saveCartAsFavourites();
    updateCartUI(); // Refresh UI immediately after saving favourites
});

document.getElementById('buy-favourites-btn')?.addEventListener('click', buyFavourites);

document.getElementById('buynow')?.addEventListener('click', function () {
    window.location.href = 'order.html';
});
