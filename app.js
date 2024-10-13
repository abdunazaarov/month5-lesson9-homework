let currentPage = 0;
const productsPerPage = 20;
let products = [];
let allCategories = new Set();

async function fetchProducts() {
    const response = await fetch('https://dummyjson.com/products');
    const data = await response.json();
    products = data.products;
    renderProducts();
    renderCategories();
}

function renderProducts() {
    const container = document.getElementById('productsContainer');
    container.innerHTML = '';

    const filteredProducts = getFilteredProducts();
    const productsToShow = filteredProducts.slice(0, (currentPage + 1) * productsPerPage);

    productsToShow.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product');
        productDiv.innerHTML = `
            <img src="${product.thumbnail}">
            <h3>${product.title}</h3>
            <p>Price: $${product.price}</p>
            <p>Category: ${product.category}</p>
        `;
        container.appendChild(productDiv);
    });

    const seeMoreBtn = document.getElementById('seeMoreBtn');
    if (productsToShow.length < filteredProducts.length) {
        seeMoreBtn.style.display = 'block';
    } else {
        seeMoreBtn.style.display = 'none';
    }
}

function renderCategories() {
    const categoryFilter = document.getElementById('categoryFilter');
    products.forEach(product => allCategories.add(product.category));

    allCategories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        categoryFilter.appendChild(option);
    });
}

function getFilteredProducts() {
    const selectedCategory = document.getElementById('categoryFilter').value;
    if (selectedCategory === '') {
        return products;
    } else {
        return products.filter(product => product.category === selectedCategory);
    }
}

document.getElementById('seeMoreBtn').onclick = () => {
    currentPage++;
    renderProducts();
};

document.getElementById('categoryFilter').onchange = () => {
    currentPage = 0;
    renderProducts();
};

fetchProducts();