// /productService/controllers/productController.js

const products = [
    { id: 1, name: "Apple", category: "produce", price: 1.2 },
    { id: 2, name: "Milk", category: "dairy", price: 2.5 },
    { id: 3, name: "Chips", category: "snacks", price: 1.8 }
  ];
  
  exports.getAllProducts = (req, res) => {
    res.json(products);
  };
  
  exports.getProductById = (req, res) => {
    const productId = parseInt(req.params.id);
    const product = products.find(p => p.id === productId);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  };
  
  exports.createProduct = (req, res) => {
    const { name, category, price } = req.body;
    const newProduct = { id: products.length + 1, name, category, price };
    products.push(newProduct);
    res.status(201).json(newProduct);
  };
  