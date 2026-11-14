// const products = [
//     {
//         id: 1,

//         name: "Wireless Mouse",

//         price: 699,

//         category: "Accessories"
//     },
//     {
//         id: 2,

//         name: "Mechanical Keyboard",

//         price: 599,

//         category: "Accessories"
//     },
//     {
//         id: 3,

//         name: "Wireless Headphones",

//         price: 799,

//         category: "Audio"
//     },
//     {
//         id: 4,

//         name: "Smart Watch",

//         price: 2499,

//         category: "Wearables"
//     },
//     {
//         id: 5,

//         name: "Bluetooth Speaker",

//         price: 1499,

//         category: "Audio"
//     },
//     {
//         id: 6,

//         name: "USB-C Hub",

//         price: 999,

//         category: "Accessories"
//     }
// ];

// const productList = document.querySelector("#productList");

// const emptyProduct = document.querySelector("#emptyProducts");

// const searchInput = document.querySelector("searchInput");

// const categoryFilter = document.querySelector("#categoryFilter");

// const sortSelect = document.querySelector("#sortSelect");

// const carItems = document.querySelector("cartItems");

// const cartCount = document.querySelector("cartCount");

// const cartTotal = document.querySelector("#cartTotal");

// const clearCartButton = document.querySelector("#clearCart");

// let cart = [];

// function formatPrice(amount) {
//     return new Intl.NumberFormat("en-In", {
//         style: "currency",

//         currency: "INR",

//         maximumFractionDigits: 2

//     }).format(amount);
// }

// //render products
// function renderProducts(list) {
//     productList.innerHTML = "";

//     emptyProduct.hidden = list.length !== 0;

//     list.forEach(function (product) {
//         const card = document.createElement("article");

//         card.className = "product-card";

//         const name = document.createElement("h3");

//         name.textContent = product.name;

//         const category = document.createElement("p");

//         category.className = "product-category";

//         category.textContent = product.category;

//         const price = document.createElement("p");

//         price.className = "product-price";

//         price.textContent = formatPrice(product.price);

//         const button = document.createElement("button");

//         button.className = "add-button";

//         button.textContent = "Add to Cart";

//         button.dataset.id = product.id;

//         card.append(name, category, price, button);

//         productList.append(card);


//     });
// }

// function updateProducts() {
//     const searchTerm = searchInput.ariaValueMax.trim().toLocaleLowerCase();

//     const selectedCategory = categoryFilter.values;

//     const selectedSort = sortSelect.value;

//     let visibleProducts = products.filter(function (product) {
//         const matchesSearch = product.name

//             .toLowerCase()

//             .includes(searchTerm);

//         const matchesCategory =

//             selectedCategory == "all" ||

//             product.category === selectedCategory;

//         return matchesSearch && matchesCategory;
//     });

//     if (selectedCategory === "low-high") {
//         visibleProducts.sort(function (a, b) {
//             return a.price - b.price;

//         })
//     } else if (selectedSort === "high-low") {
//         visibleProducts.sort(function (a, b) {
//             return b.price - a.price;
//         })
//     }

//     renderProducts(visibleProducts);

// }

// function addToCart(productId) {
//     const selectedProduct = products.find(function (product) {
//         return product.id === productId;
//     });

//     if (!selectedProduct) {

//         return;

//     }
//     const existingItem = cart.find(function (item) {
//         return item.id === productId;
//     });

//     if (existingItem) {
//         existingItem.quantity += 1;
//     }
//     else {

//         cart.push({

//             id: selectedProduct.id,

//             name: selectedProduct.name,

//             price: selectedProduct.price,

//             quantity: 1
//         });
//     }

//     renderCart();

// }

// //calculation part
// function renderCart() {
//     carItems.innerHTML = "";
//     if (cart.length === 0) {
//         const message = document.createElement("p");

//         message.className = "empty-message";

//         message.textContent = "Your cart is empty";

//         carItems.append(message);
//     }

//     cart.forEach(function (item) {
//         const row = document.createElement("div");

//         row.className = "cart-item";

//         const name = document.createElement("h3");

//         name.textContent = item.name;

//         const subtotal = document.createElement("p");

//         subtotal.textContent =

//             "Subtotal: " + formatPrice(item.price * item.quantity);

//         const quantityControls = document.createElement("div");

//         quantityControls.className = "quantity-controls";

//         const decreaseButton = document.createElement("button");

//         decreaseButton.textContent = "-";

//         decreaseButton.dataset.action = "decrease";

//         decreaseButton.dataset.id = item.id;

//         decreaseButton.setAttribute("aria-label", "Decrease quantity");

//         const quantity = document.createElement("span");

//         quantity.textContent = item.quantity;

//         const increaseButton = document.createElement("button");

//         increaseButton.textContent = "+";

//         increaseButton.dataset.action = "increase";

//         increaseButton.dataset.id = item.id;

//         increaseButton.setAttribute("aria-label", "Increase quantity");

//         const removeButton = document.createElement("button");

//         removeButton.className = "remove-button";

//         removeButton.textContent = "Remove";

//         removeButton.dataset.action = "remove";

//         removeButton.dataset.id = item.id;

//         quantityControls.append(
//             decreaseButton,
//             quantity,
//             increaseButton
//         );

//         row.append(name, subtotal, quantityControls, removeButton);
        
//         carItems.append(row);
//     });

//     const totalQuantity = cart.reduce(function (total,item){
//         return total + item.quantity;

//     },0);

//     const totalPrice = cart.reduce(function (total,item){
//         return total + item.price * item.quantity;
//     },0);

//     cartCount.textContent = totalQuantity;

//     cartTotal.textContent = formatPrice(totalPrice);
// }

// function updateCartItem(productId,action)
// {
//     const itemIndex = cart.findIndex(function (item) {

//     return item.id === productId;

// });

// if (itemIndex === -1) {

//     return;

// }

// if (action === "increase") {

//     cart[itemIndex].quantity += 1;

// } else if (action === "decrease") {

//     cart[itemIndex].quantity -= 1;

//     if (cart[itemIndex].quantity <= 0) {

//         cart.splice(itemIndex, 1);
//     }
// }
// else if (action === "remove")
// {
//     cart.splice(itemIndex,1);    
// }

// renderCart(); 

// }

// productList.addEventListener("click",function(event){
//     const button=event.target.closes(".add-button");
//     if(!button)
//     {
//         return;
//     }

//     const productId = Number(button.dataset.id);

//     addToCart(productId);


// });


// cartItems.addEventListener("click",function(event){
//     const button=event.target.closes("button[data-action]");
//     if(!button)
//     {
//         return;
//     }

//     const productId = Number(button.dataset.id);

    
//     const action=button.dataset.action;

//     updateCartItem(productId,action);
// });

// searchInput.addEventListener("input", updateProducts);

// categoryFilter.addEventListener("change", updateProducts);

// sortSelect.addEventListener("change", updateProducts);

// clearCartButton.addEventListener("click", function () {

//     cart = [];

//     renderCart();

// });

// updateProducts();

// renderCart();


// 1. Product Data

const products = [
    {
        id: 1,
        name: "Wireless Mouse",
        category: "Accessories",
        price: 599,
        description: "Ergonomic wireless mouse"
    },
    {
        id: 2,
        name: "Mechanical Keyboard",
        category: "Accessories",
        price: 1499,
        description: "RGB mechanical keyboard"
    },
    {
        id: 3,
        name: "Bluetooth Headphones",
        category: "Audio",
        price: 1999,
        description: "High quality wireless audio"
    },
    {
        id: 4,
        name: "Smart Watch",
        category: "Wearables",
        price: 2499,
        description: "Fitness tracking smart watch"
    },
    {
        id: 5,
        name: "Bluetooth Speaker",
        category: "Audio",
        price: 1299,
        description: "Portable Bluetooth speaker"
    },
    {
        id: 6,
        name: "Fitness Band",
        category: "Wearables",
        price: 999,
        description: "Track your daily activities"
    }
];


// 2. Cart Array

let cart = [];


// 3. Getting HTML Elements

const productList = document.getElementById("productList");

const cartItems = document.getElementById("cartItems");

const cartCount = document.getElementById("cartCount");

const cartTotal = document.getElementById("cartTotal");

const searchInput = document.getElementById("searchInput");

const categoryFilter = document.getElementById("categoryFilter");

const sortSelect = document.getElementById("sortSelect");

const clearCart = document.getElementById("clearCart");

const emptyProducts = document.getElementById("emptyProducts");


// 4. Display Products

function displayProducts(productArray) {

    productList.innerHTML = "";

    emptyProducts.hidden = productArray.length !== 0;

    productArray.forEach(product => {

        const productCard = document.createElement("div");

        productCard.className = "product-card";

        productCard.innerHTML = `

            <h3>${product.name}</h3>

            <p>${product.description}</p>

            <p>Category: ${product.category}</p>

            <h3>₹${product.price}</h3>

            <button class="add-button" data-id="${product.id}">
                Add to Cart
            </button>

        `;

        productList.appendChild(productCard);

    });

}


// 5. Add Product to Cart

function addToCart(productId) {

    const existingProduct = cart.find(item => item.id === productId);

    if (existingProduct) {

        existingProduct.quantity++;

    } else {

        const product = products.find(item => item.id === productId);

        cart.push({
            ...product,
            quantity: 1
        });

    }

    updateCart();

}


// 6. Display Cart Items

function displayCart() {

    cartItems.innerHTML = "";

    if (cart.length === 0) {

        cartItems.innerHTML = `
            <p class="empty-message">Your Cart is empty</p>
        `;

        return;

    }

    cart.forEach(item => {

        const cartItem = document.createElement("div");

        cartItem.className = "cart-item";

        cartItem.innerHTML = `

            <h3>${item.name}</h3>

            <p>Price: ₹${item.price}</p>

            <p>Subtotal: ₹${item.price * item.quantity}</p>

            <div class="quantity-controls">

                <button class="decrease-button" data-id="${item.id}">
                    -
                </button>

                <span>${item.quantity}</span>

                <button class="increase-button" data-id="${item.id}">
                    +
                </button>

            </div>

        `;

        cartItems.appendChild(cartItem);

    });

}


// 7. Update Cart

function updateCart() {

    displayCart();

    updateCartCount();

    updateCartTotal();

}


// 8. Update Cart Count

function updateCartCount() {

    const totalItems = cart.reduce((total, item) => {

        return total + item.quantity;

    }, 0);

    cartCount.textContent = totalItems;

}


// 9. Calculate Total Price

function updateCartTotal() {

    const totalPrice = cart.reduce((total, item) => {

        return total + (item.price * item.quantity);

    }, 0);

    cartTotal.textContent = `₹${totalPrice}`;

}


// 10. Increase Product Quantity

function increaseQuantity(productId) {

    const product = cart.find(item => item.id === productId);

    if (product) {

        product.quantity++;

        updateCart();

    }

}


// 11. Decrease Product Quantity

function decreaseQuantity(productId) {

    const product = cart.find(item => item.id === productId);

    if (product) {

        product.quantity--;

        if (product.quantity === 0) {

            cart = cart.filter(item => item.id !== productId);

        }

        updateCart();

    }

}


// 12. Search, Filter and Sort Products

function filterProducts() {

    const searchValue = searchInput.value.toLowerCase();

    const selectedCategory = categoryFilter.value;

    const selectedSort = sortSelect.value;


    let filteredProducts = products.filter(product => {

        const matchesSearch = product.name.toLowerCase().includes(searchValue);

        const matchesCategory =
            selectedCategory === "all" ||
            product.category === selectedCategory;

        return matchesSearch && matchesCategory;

    });


    // Sorting Products

    if (selectedSort === "low-high") {

        filteredProducts.sort((a, b) => a.price - b.price);

    } else if (selectedSort === "high-low") {

        filteredProducts.sort((a, b) => b.price - a.price);

    }

    displayProducts(filteredProducts);

}


// 13. Event Listeners


// Add to Cart Button

productList.addEventListener("click", function(event) {

    if (event.target.classList.contains("add-button")) {

        const productId = Number(event.target.dataset.id);

        addToCart(productId);

    }

});


// Increase and Decrease Quantity

cartItems.addEventListener("click", function(event) {

    const productId = Number(event.target.dataset.id);

    if (event.target.classList.contains("increase-button")) {

        increaseQuantity(productId);

    }

    if (event.target.classList.contains("decrease-button")) {

        decreaseQuantity(productId);

    }

});


// Search Products

searchInput.addEventListener("input", filterProducts);


// Filter by Category

categoryFilter.addEventListener("change", filterProducts);


// Sort Products

sortSelect.addEventListener("change", filterProducts);


// Clear Cart

clearCart.addEventListener("click", function() {

    cart = [];

    updateCart();

});


// 14. Initial Display

displayProducts(products);

updateCart();