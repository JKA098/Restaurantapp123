// Import the menu items from the data file
import menuArray from './data.js'


// Initialize an empty order array
let order = []

const {name, ingredients, id, price, emoji} = menuArray 
const orderHeader = document.getElementById("order-header")
// const {name, ingredients, id, price, emoji} = menuArray 

// Function to add an item to the order
function addButton(itemId) {
    itemId = Number(itemId)
    const itemToAdd = menuArray.find(item => item.id === itemId)

    // Check if the item is already in the order
    const existingItem = order.find(item => item.id === itemId)
    if (existingItem) {
        existingItem.quantity += 1; // Increase quantity if it's already in the order
    } 
    else {
        // Add new item to the order
        order.push({
            ...itemToAdd,
            quantity: 1
        })
    }

    displayOrderSummary() // Update the order summary display
}


// Function to remove an item from the order
function removeFromOrder(itemId) {
    const itemIndex = order.findIndex(item => item.id === itemId);
    if (itemIndex > -1) {
        order.splice(itemIndex, 1) // Remove item from order
        displayOrderSummary()// Update the order summary display
    }
}

// Function to update the order summary display
function displayOrderSummary() {
    
    const orderSummaryDiv = document.getElementById('order-summary')
    orderSummaryDiv.innerHTML = '' // Clear the order summary
    let total = 0

//  .forEach() function in JavaScript is a method that is used to execute a provided function once for each element in an array, in order. It’s a way to iterate over the array and perform operations on each element. 
    order.forEach(item => {
        total += item.price * item.quantity // Corrected calculation for total price
        orderSummaryDiv.innerHTML += `
            <div class="order-item">
                <span>${item.name} x ${item.quantity}</span>
                <span>$${item.price * item.quantity}</span>
                <button class="remove-button" data-id="${item.id}">remove</button>
            </div>`
    })
    
   
    if (order.length > 0) {
        // If there are items in the order, display the "Complete Order" button
            orderSummaryDiv.innerHTML += `
                <div class="total-line"></div>
                <div class="total-price">
                    <span>Total price:</span>
                    <span>$${total}</span>
                    
                </div>`

            const completeOrderButton = document.createElement("button")
            completeOrderButton.textContent = "Complete order"
            completeOrderButton.className = "complete-order-button"
            completeOrderButton.addEventListener('click', displayCheckoutForm)
            orderSummaryDiv.appendChild(completeOrderButton)
            
            orderSummaryDiv.style.display = 'block'
            orderHeader.style.display='block'
    } else {
            orderSummaryDiv.style.display = 'none';
    }

        
        
        // started changing from here
        attachRemoveButtonListeners();
        
        

// Function to attach event listeners to the remove buttons
        function attachRemoveButtonListeners() {
            document.querySelectorAll('.remove-button').forEach(button => {
                
                button.addEventListener('click', function() {
                    const itemId = Number(this.getAttribute('data-id')); // Convert data-id attribute to number
                    removeFromOrder(itemId); // Call removeFromOrder function when button is clicked
                });
            });
        }
        

// Function to remove an item or decrease its quantity
        function removeFromOrder(itemId) {
            const itemIndex = order.findIndex(item => item.id === itemId);
            if (itemIndex > -1) {
                if (order[itemIndex].quantity > 1) {
                    order[itemIndex].quantity -= 1; // Decrease quantity if more than one
                } else {
                    order.splice(itemIndex, 1); // Remove the item if quantity is 1
                }
                displayOrderSummary(); // Update the order summary display
            }
        }

// Function to display the checkout form
        function displayCheckoutForm() {
            document.getElementById('checkout-form').style.display = 'block';
            document.getElementById('order-summary').style.display = 'none';
        }
}


// Function to display the checkout form
function displayCheckoutForm() {
    document.getElementById('checkout-form').style.display = 'block';
    document.getElementById('order-summary').style.display = 'none';
}



// Function to submit the order
function submitOrder() {
    const nameInput = document.getElementById('card-name').value;
    const numberInput = document.getElementById('card-number').value;
    const cvvInput = document.getElementById('card-cvv').value;
    // Simple validation check
    if (!nameInput || !numberInput || !cvvInput) {
        alert('Please fill in all the fields.');
        return;
    }
    
    
    // Here you would handle the payment processing and validation
    // For now, we'll just show a confirmation message
    document.getElementById('order-confirmation').style.display = 'block';
    document.getElementById('order-confirmation').innerHTML = '<p>Thank you for your order!</p>';
    // Hide the checkout form and reset the order
    document.getElementById('checkout-form').style.display = 'none';
    order = [];
    // After a delay, hide the order confirmation and show the menu again
    setTimeout(() => {
        document.getElementById('order-confirmation').style.display = 'none';
    }, 5000); // Hide after 5 seconds for this example
}

// Adding event listeners to the '+' buttons for each menu item
// This should be called when the page is fully loaded to ensure all elements are present
function setupEventListeners() {
    menuArray.forEach(item => {
        document.getElementById(`add-${item.id}`)
        .addEventListener('click', () => addButton (item.id));
        
    });
}

// Call setupEventListeners when the window is loaded
// window.onload = setupEventListeners;
// function renderMenu() {
//     const menu = document.getElementById('menu');
//     menu.innerHTML = ''; // Clear existing content
//     menuArray.forEach(item => {
//         menu.innerHTML += `
//             <div class="menu-item">
            
//                 <i class="fa-solid ${item.icon}"></i> <!-- Using FontAwesome icon -->
//                 <h2>${item.name} - $${item.price}</h2>
//                 <p>${item.ingredients.join(', ')}</p>
//                 <button class="add-button" data-id="${item.id}">Add to Order</button>
//             </div>
//         `;
//     });
// }

// Adding event listeners to the '+' buttons for each menu item
document.querySelectorAll('.add-button').forEach(button => {
    button.addEventListener('click', function() {
        const itemId = this.getAttribute('data-id'); // Retrieve the data-id attribute
        addButton(itemId); // Call a function to handle adding the item to the order
    });
});
// window.submitOrder = submitOrder;

