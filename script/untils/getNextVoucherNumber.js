// Function to get the next voucher number
function getNextVoucherNumber() {
    // Get the last used number from local storage
    let lastNumber = localStorage.getItem('lastVoucherNumber');

    // If no number is found, start with 00001
    if (!lastNumber) {
        lastNumber = 1;
    } else {
        lastNumber = parseInt(lastNumber, 10) + 1;
    }

    // Format the number to have leading zeros (e.g., 00001)
    let formattedNumber = lastNumber.toString().padStart(5, '0');

    // Save the new number in local storage
    localStorage.setItem('lastVoucherNumber', lastNumber);

    return formattedNumber;
}

// Example usage
export const VoucherRunningNumber = getNextVoucherNumber()
