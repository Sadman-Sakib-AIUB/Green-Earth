let cart = [];

const loadCategories = () => {
   const url = 'https://openapi.programming-hero.com/api/categories';
    fetch (url)
    .then(res=> res.json())
    .then(data => displayCategories(data.categories))
}
// loadCategories()


const loadCardData = () => {
    url = 'https://openapi.programming-hero.com/api/plants'
    fetch(url)
    .then(res => res.json())
    .then(data => displayCardData(data.plants))
}
// loadCardData();

const loadCategoryCardData = (id) => {

    const url = `https://openapi.programming-hero.com/api/category/${id}`
    fetch(url)
    .then(res => res.json())
    .then (data => displayCardData(data.plants))
    
}

const displayCategories = (categories) => {
    const categoryContainer = document.getElementById('category-container')
    categoryContainer.innerText='';

     categoryContainer.innerHTML = `
        <button onclick="loadCardData()" class="w-full hover:bg-[#15803D] hover:text-white p-1 text-sm rounded-sm text-left">
            All Trees
        </button>
    `;

    categories.forEach(category => {

        const btnCategory = document.createElement('div');
        btnCategory.innerHTML=`<button id="category-no-${category.id}"onclick="loadCategoryCardData(${category.id})" class="w-full hover:bg-[#15803D] hover:text-white p-1 text-sm rounded-sm text-left ">${category.category_name}</button>`

        
        categoryContainer.append(btnCategory);
        // console.log(btnCategory);
    })
}

const displayCardData = (plants) => {
    const cardContainer = document.getElementById('card-container')
    cardContainer.innerText='';

    plants.forEach(plant => {
        const plantCard = document.createElement('div');
        plantCard.innerHTML = `
        <div class="card bg-base-100 w-52 shadow-sm h-[400px]">
                <figure class="p-2">
                    <img onclick="loadPlantDetails(${plant.id})"
                    class=" rounded-md aspect-3/2 object-cover "
                    src="${plant.image}"
                    alt="tree" />
                </figure>
                <div class="card-body">
                    <h2 onclick="loadPlantDetails(${plant.id})" class="cursor-default text-sm font-semibold mt-[-20px]">${plant.name}</h2>
                    <p onclick="loadPlantDetails(${plant.id})" class="cursor-default text-xs text-gray-400">${plant.description}</p>

                    <div class="flex items-center justify-between mb-2">
                    <div onclick="loadPlantDetails(${plant.id})" class=" cursor-default px-3 py-1 gap-2 bg-[#DCFCE7] rounded-full text-xs text-[#15803D] ">${plant.category}</div>

                    <div class=" font-semibold text-sm"><span>৳</span>${plant.price}</div>
                    
                    </div>
                    <div class="card-actions justify-center">
                    <button onclick="addToCart(${plant.id})" class="btn btn-sm rounded-4xl bg-[#15803D] text-white w-full">Buy Now</button>
                    </div>
                </div>
                </div>
        `

        cardContainer.append(plantCard);
    })
}
loadCategories();
loadCardData();


const loadPlantDetails = (id) => {
    const url =`https://openapi.programming-hero.com/api/plant/${id}`
    fetch(url)
    .then(res=> res.json())
    .then(data =>displayPlantDetails(data.plants) )
}

const displayPlantDetails = (detail) => {
    const plantDetailsContainer = document.getElementById('plant-details-container')
    plantDetailsContainer.innerHTML=`
    <dialog id="plant_modal" class="modal">
          <div class="modal-box">
            <form method="dialog">
              <button
                class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              >
                ✕
              </button>
            </form>
            <h3 class="text-lg font-bold text-center">${detail.name}</h3>
            <img class=" aspect-3/2 object-cover " src="${detail.image}" alt="">
            <span class=" text-sm font-semibold text-gray-500">Category:</span><p class=" inline-block m-1 text-sm text-gray-500" > ${detail.category}</p>

            <p class="text-sm font-semibold text-gray-500">Price: <span>$</span>${detail.price}</p>
            <span class="py-4 text-sm text-gray-500 font-semibold">Description:</span><span class="text-sm text-gray-500"> ${detail.description}</span>
          </div>
        </dialog>
    `

    document.getElementById('plant_modal').showModal();
}


const addToCart = (plantId) => {
    const url = `https://openapi.programming-hero.com/api/plant/${plantId}`;
    fetch(url)
        .then(res => res.json())
        .then(data => {
            const plantToAdd = data.plants;
            // Check if the item is already in the cart
            const existingItem = cart.find(item => item.id === plantToAdd.id);
            if (existingItem) {
                // If it exists, just increase the quantity
                existingItem.quantity += 1;
            } else {
                // If not, add the new item to the cart with a quantity of 1
                plantToAdd.quantity = 1;
                cart.push(plantToAdd);
            }
            updateCartDisplay();
        });
};


const removeFromCart = (plantId) => {
    // Filtering the cart to create a new array without the item to be removed
    cart = cart.filter(item => item.id !== plantId);
    // Update the cart display
    updateCartDisplay();
};

const updateCartDisplay = () => {
    const cartItemsContainer = document.getElementById('cart-items-container');
    const totalPriceElement = document.getElementById('total-price');

    // Clear existing cart items
    cartItemsContainer.innerHTML = '';

    // If the cart is empty, show the "No items" message
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `<p class="text-xs text-gray-400">No Items in Your Cart</p>`;
        totalPriceElement.innerText = '৳0';
        return;
    }
    
    let total = 0;
    cart.forEach(item => {
        // Calculate the total price
        total += item.price * item.quantity;

        const cartItemHTML = `
            <div class="flex justify-between items-center bg-[#F0FDF4] rounded-md p-2">
                <span class="text-sm">${item.name} x${item.quantity}</span>
                <div class="flex items-center gap-2">
                    <span class="text-sm">৳${item.price * item.quantity}</span>
                    <button class="btn btn-ghost btn-sm text-red-500" onclick="removeFromCart(${item.id})">
                    ❌
                    </button>
                </div>
            </div>
        `;
        cartItemsContainer.innerHTML += cartItemHTML;
    });

    // Update the total price
    totalPriceElement.innerText = `৳${total.toFixed(2)}`;
};

// Initialize cart display when the page loads
document.addEventListener('DOMContentLoaded', () => {
    updateCartDisplay();
});