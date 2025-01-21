let currentId = 0
function generateCustomId() {
    currentId += 1;
    return currentId.toString().padStart(6, '0')
}

// Example usage
generateCustomId();
