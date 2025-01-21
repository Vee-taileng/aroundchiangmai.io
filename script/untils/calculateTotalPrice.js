// Calculating Price Per Person
const paxInput = document.getElementById('pax');
const pricePerPaxInput = document.getElementById('price-per-pax');
const totalPriceInput = document.getElementById('total-price');

// Function to calculate total price
export function calculateTotalPrice() {
    const pax = parseFloat(paxInput.value);
    const pricePerPax = parseFloat(pricePerPaxInput.value);

    if (!isNaN(pax) && !isNaN(pricePerPax)) {
        const totalPrice = pax * pricePerPax;
        totalPriceInput.value = totalPrice.toFixed(2); // Display total price with 2 decimal places
    } else {
        totalPriceInput.value = ""; // Clear total price if inputs are invalid
    }
}

// Event listeners for input fields
paxInput.addEventListener('input', calculateTotalPrice);
pricePerPaxInput.addEventListener('input', calculateTotalPrice);