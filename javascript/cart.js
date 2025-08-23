document.addEventListener('DOMContentLoaded', () => {
    loadCart();

    const clearBtn = document.getElementById('clear-cart-btn');
    if (clearBtn) {
        clearBtn.addEventListener('click', () => {
            // First fetch the cart to check if it's empty
            fetch('http://localhost:5000/cart')
                .then(res => res.json())
                .then(cartItems => {
                    if (cartItems.length === 0) {
                        alert('Your cart is already empty.');
                    } else {
                        clearCart();
                    }
                })
                .catch(err => {
                    alert('Something went wrong while checking the cart.');
                    console.error(err);
                });
        });
    }
});

// function loadCart() {
//   fetch('http://localhost:5000/cart')
//     .then(res => res.json())
//     .then(cartItems => {
//       const container = document.getElementById('cart-container');
//       const totalEl = document.getElementById('total-price');
//       let total = 0;
//       container.innerHTML = '';

//       cartItems.forEach(item => {
//         total += item.price * (item.quantity || 1);

//         const product = document.createElement('article');
//         product.className = 'product-card';
//         product.innerHTML = `
//           <img src="../${item.image}" alt="${item.name}" />
//           <h3>${item.name}</h3>
//           <p>₹${item.price}</p>
//           <button onclick="deleteFromCart('${item._id}')">Remove</button>
//         `;
//         container.appendChild(product);
//       });

//       totalEl.textContent = total;
//     })
//     .catch(err => {
//       console.error('Failed to load cart:', err);
//     });
// }
function loadCart() {
    fetch('http://localhost:5000/cart')
        .then(res => res.json())
        .then(cartItems => {
            const container = document.getElementById('cart-container');
            const totalEl = document.getElementById('total-price');
            let total = 0;
            container.innerHTML = '';

            cartItems.forEach(item => {
                const quantity = item.quantity || 1;
                const subtotal = item.price * quantity;
                total += subtotal;

                const product = document.createElement('article');
                product.className = 'product-card';
                product.innerHTML = `
          <img src="../${item.image}" alt="${item.name}" />
          <h3>${item.name}</h3>
          <p>₹${item.price} × <span id="qty-${item._id}">${quantity}</span> = ₹${subtotal}</p>
          <div class="quantity-controls">
            <button onclick="updateQuantity('${item._id}', -1)">−</button>
            ${quantity}
            <button onclick="updateQuantity('${item._id}', 1)">+</button>
            <button onclick="deleteFromCart('${item._id}')">Remove</button>
          </div>
          
        `;
                container.appendChild(product);
            });

            totalEl.textContent = total;
        })
        .catch(err => {
            console.error('Failed to load cart:', err);
        });
}

function deleteFromCart(id) {
    fetch(`http://localhost:5000/cart/${id}`, {
        method: 'DELETE'
    })
        .then(res => res.json())
        .then(() => {
            loadCart();
        })
        .catch(err => {
            alert('Failed to remove item.');
            console.error(err);
        });
}
function updateQuantity(id, delta) {
  fetch(`http://localhost:5000/cart/quantity/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ delta })
  })
    .then(res => {
      if (!res.ok) {
        console.error('Server responded with', res.status);
      }
      return res.json().catch(() => {});
    })
    .then(() => {
      loadCart();
    })
    .catch(err => {
      console.error('Failed to update quantity:', err);
    });
}

function clearCart() {
    fetch('http://localhost:5000/cart', {
        method: 'DELETE'
    })
        .then(res => res.json())
        .then(() => {
            // alert('All items removed from cart!');
            loadCart();
        })
        .catch(err => {
            alert('Failed to clear cart.');
            console.error(err);
        });
}
