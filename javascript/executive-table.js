document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".add-to-cart");

  buttons.forEach((btn) => {
    btn.addEventListener("click", async () => {
      const name = btn.getAttribute("data-name");
      const price = parseInt(btn.getAttribute("data-price"));
      const image = btn.getAttribute("data-image");

      try {
        const response = await fetch("http://localhost:5000/cart", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ name, price, image })
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          const errorMessage = errorData.message || "Failed to add to cart.";
          alert(errorMessage);
          return;
        }

        const result = await response.json();
        if (window.updateCartCount) updateCartCount();

      } catch (err) {
        console.error("Cart error:", err);
        alert("Something went wrong! Please try again later.");
      }
    });
  });
});
