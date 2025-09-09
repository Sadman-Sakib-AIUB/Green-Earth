const loadCategories = () => {
   const url = 'https://openapi.programming-hero.com/api/categories';
    fetch (url)
    .then(res=> res.json())
    .then(data => displayCategories(data.categories))
}
loadCategories()


const loadCardData = () => {
    url = 'https://openapi.programming-hero.com/api/plants'
    fetch(url)
    .then(res => res.json())
    .then(data => displayCardData(data.plants))
}
loadCardData();

const loadCategoryCardData = (id) => {

    const url = `https://openapi.programming-hero.com/api/category/${id}`
    fetch(url)
    .then(res => res.json())
    .then (data => displayCardData(data.plants))
    
}
loadCategoryCardData();


const displayCategories = (categories) => {
    const categoryContainer = document.getElementById('category-container')
    categoryContainer.innerText='';

     categoryContainer.innerHTML = `
        <button class="w-full hover:bg-[#15803D] hover:text-white p-1 text-sm rounded-sm text-left">
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
                    <img
                    class=" rounded-md aspect-3/2 object-cover "
                    src="${plant.image}"
                    alt="tree" />
                </figure>
                <div class="card-body">
                    <h2 class="text-sm font-semibold mt-[-20px]">${plant.name}</h2>
                    <p class=" text-xs text-gray-400">${plant.description}</p>

                    <div class="flex items-center justify-between mb-2">
                    <div class=" px-3 py-1 gap-2 bg-[#DCFCE7] rounded-full text-xs text-[#15803D] ">${plant.category}</div>

                    <div class=" font-semibold text-sm"><span>৳</span>${plant.price}</div>
                    
                    </div>
                    <div class="card-actions justify-center">
                    <button class="btn btn-sm rounded-4xl bg-[#15803D] text-white w-full">Buy Now</button>
                    </div>
                </div>
                </div>
        `

        cardContainer.append(plantCard);
    })


    

}





// loadCategoryCardData();