const loadCategories = () => {
    url = 'https://openapi.programming-hero.com/api/categories';
    fetch (url)
    .then(res=> res.json())
    .then(data => displayCategories(data.categories))
}

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
        btnCategory.innerHTML=`<button class="w-full hover:bg-[#15803D] hover:text-white p-1 text-sm rounded-sm text-left ">${category.category_name}</button>`

        categoryContainer.append(btnCategory);
    })
}




loadCategories()