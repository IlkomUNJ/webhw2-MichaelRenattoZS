console.log('Hello World')
// public/js/main.js

// 🔹 Ambil data produk dari backend
async function loadProducts() {
  const res = await fetch('/api/products')
  const data = await res.json()
  renderProducts(data.products)
}

// 🔹 Tampilkan produk di halaman
function renderProducts(products) {
  const container = document.querySelector('.product-grid')
  container.innerHTML = ''
  products.forEach(p => {
    const card = document.createElement('div')
    card.className = 'product-card'
    card.innerHTML = `
      <img src="${p.image}" alt="${p.name}">
      <h3>${p.name}</h3>
      <p>${p.description}</p>
      <p class="price">$${p.price}</p>
      <button onclick="addToWishlist(${p.id})">Add to Wishlist</button>
    `
    container.appendChild(card)
  })
}

// 🔹 Tambahkan produk ke wishlist
async function addToWishlist(productId) {
  await fetch('/api/wishlist', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ product_id: productId }),
  })
  alert('Added to wishlist!')
}

// 🔹 Jalankan di halaman games
document.addEventListener('DOMContentLoaded', loadProducts)
