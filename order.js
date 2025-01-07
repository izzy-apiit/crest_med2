document.addEventListener("DOMContentLoaded", function () {
    // Retrieve cart items from localStorage
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const cartItemsContainer = document.getElementById('cart-items');
    const totalPriceContainer = document.getElementById('total-price');
    const checkoutBtn = document.getElementById('checkout-btn');
    const orderFormSection = document.getElementById('order-form-section');
    const cardNumberInput = document.getElementById('card-number');
    const cvvInput = document.getElementById('cvv');
    const cardPreview = document.getElementById('card-preview');
    const virtualCardNumber = document.getElementById('virtual-card-number');
    const virtualCVV = document.getElementById('virtual-cvv');

    let total = 0;

    // Populate cart items
    cartItems.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.product} - Rs.${item.price} x ${item.quantity}`;
        cartItemsContainer.appendChild(li);
        total += item.price * item.quantity;
    });
    totalPriceContainer.textContent = `Rs.${total.toFixed(2)}`;

    // Scroll to the payment section on checkout button click
    checkoutBtn.addEventListener('click', function () {
        orderFormSection.style.display = "block";
        orderFormSection.scrollIntoView({ behavior: 'smooth' });
    });

    // Update virtual card preview as user types
    cardNumberInput.addEventListener('input', function () {
        virtualCardNumber.textContent = formatCardNumber(cardNumberInput.value) || 'XXXX XXXX XXXX XXXX';
    });

    cvvInput.addEventListener('input', function () {
        virtualCVV.textContent = cvvInput.value || 'XXX';
    });

    // Format card number into groups of 4 digits
    function formatCardNumber(number) {
        return number.replace(/\s+/g, '').replace(/(\d{4})/g, '$1 ').trim();
    }

    // Handle payment form submission
    document.getElementById('order-form').addEventListener('submit', function (event) {
        event.preventDefault();

        const cardNumber = cardNumberInput.value.trim();
        const cvv = cvvInput.value.trim();

        // Basic validation
        if (!cardNumber || !cvv || cardNumber.length < 16 || cvv.length < 3) {
            alert('Please fill out all credit card details correctly.');
            return;
        }

        // Simulate payment and display thank you message
        const deliveryDate = new Date();
        deliveryDate.setDate(deliveryDate.getDate() + 3);
        document.getElementById('thank-you-section').style.display = "block";
        document.getElementById('delivery-date').textContent = deliveryDate.toDateString();
        orderFormSection.style.display = "none";
    });
});
