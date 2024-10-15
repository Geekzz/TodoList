document.addEventListener("DOMContentLoaded", function() {
    const addButton = document.getElementById('add-button');
    const itemInput = document.getElementById('item-input');
    const itemList = document.getElementById('item-list');
    const addToCartButton = document.getElementById('add-to-cart-button');

    // Array to store items added to the cart
    let cartItems = [];

    // Function to update the add to cart button text
    function updateAddToCartButton() {
        const selectedCount = Array.from(itemList.children)
            .filter(item => item.classList.contains('purchased')).length; // Count selected items
        addToCartButton.textContent = `Add Selected Items to Cart (${selectedCount})`; // Update button text
    }

    // Function to add item to the list
    addButton.addEventListener('click', function() {
        const itemText = itemInput.value.trim();
        if (itemText !== "") {
            const listItem = document.createElement('li');
            listItem.textContent = itemText;
            listItem.classList.add('list-group-item');

            // Click to mark as purchased
            listItem.addEventListener('click', function() {
                listItem.classList.toggle('purchased');
                listItem.classList.toggle('strikethrough');
                updateAddToCartButton(); // Update button text after selection change
            });

            // Add a button to remove the item
            const removeButton = document.createElement('button');
            removeButton.textContent = 'Remove';
            removeButton.classList.add('btn', 'btn-danger', 'btn-sm', 'float-end');
            removeButton.addEventListener('click', function(event) {
                event.stopPropagation(); // Stop the event so the list item doesn't react
                itemList.removeChild(listItem); // Remove the list item
                updateAddToCartButton(); // Update button text after removal
            });

            listItem.appendChild(removeButton);
            itemList.appendChild(listItem);
            itemInput.value = ""; // Clear the input field
            updateAddToCartButton(); // Update button text after adding
        }
    });

    // Function to add selected items to cart
    addToCartButton.addEventListener('click', function() {
        const selectedItems = Array.from(itemList.children)
            .filter(item => item.classList.contains('purchased')) // Get items marked as purchased
            .map(item => item.textContent.replace('Remove', '').trim()); // Get text content without 'Remove' button text

        if (selectedItems.length > 0) {
            cartItems.push(...selectedItems);
            console.log('Items added to cart:', cartItems); // Log cart items to console
        } else {
            console.log('No items selected to add to cart.');
        }

        // Reset the displayed list
        itemList.innerHTML = '';
        updateAddToCartButton(); // Update button text after resetting
    });

    // Initial update for the button
    updateAddToCartButton();
});
