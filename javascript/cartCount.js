function updateCartCount() {
  fetch('http://localhost:5000/cart')
    .then(res => res.json())
    .then(items => {
      const count = items.reduce((acc, item) => acc + (item.quantity || 1), 0);
      const bubble = document.getElementById('cart-count');
      if (bubble) {
        bubble.textContent = count;
        bubble.style.display = count > 0 ? 'inline-block' : 'none';
      }
    })
    .catch(err => {
      console.error('Cart count fetch error:', err);
    });
}

// Load count on page load
document.addEventListener('DOMContentLoaded', () => {
  updateCartCount();
});

// Expose globally so add-to-cart can trigger it
window.updateCartCount = updateCartCount;
