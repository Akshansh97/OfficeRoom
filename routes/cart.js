// routes/cart.js
const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');

// Add to cart
// router.post('/', async (req, res) => {
//   const { name, price, image } = req.body;

//   try {
//     const newItem = new Cart({ name, price, image });
//     await newItem.save();
//     res.status(201).json({ message: 'Item added to cart', item: newItem });
//   } catch (err) {
//     console.error('Add to cart error:', err);
//     res.status(500).json({ message: 'Server error' });
//   }
// });
router.post('/', async (req, res) => {
  const { name, price, image } = req.body;

  try {
    // Check if item with same name exists
    const existingItem = await Cart.findOne({ name });

    if (existingItem) {
      existingItem.quantity += 1;
      await existingItem.save();
      return res.status(200).json({ message: 'Quantity updated', item: existingItem });
    }

    // If not, add new item
    const newItem = new Cart({ name, price, image, quantity: 1 });
    await newItem.save();
    res.status(201).json({ message: 'Item added to cart', item: newItem });

  } catch (err) {
    console.error('Add to cart error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});


// Get cart items
router.get('/', async (req, res) => {
  try {
    const items = await Cart.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch cart items' });
  }
});

// Delete item from cart
router.delete('/:id', async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);
    res.json({ message: 'Item deleted from cart' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete item' });
  }
});

// DELETE all items from cart
router.delete("/", async (req, res) => {
  try {
    await Cart.deleteMany({});
    res.status(200).json({ message: "All cart items deleted." });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete all cart items." });
  }
});

router.patch('/quantity/:id', async (req, res) => {
  const { delta } = req.body;

  try {
    const item = await Cart.findById(req.params.id);

    if (!item) return res.status(404).json({ message: 'Item not found' });

    item.quantity = (item.quantity || 1) + delta;
    if (item.quantity < 1) {
      await item.deleteOne();
    } else {
      await item.save();
    }

    res.json({ message: 'Quantity updated' });
  } catch (err) {
    console.error('Quantity update error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});


module.exports = router;
