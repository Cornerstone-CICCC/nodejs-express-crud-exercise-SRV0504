"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
// In-memory DB
let products = [];
// GET all products
app.get("/products", (req, res) => {
    res.json(products);
});
// GET one product by ID
app.get("/products/:id", (req, res) => {
    const id = Number(req.params.id);
    const product = products.find((p) => p.id === id);
    if (!product)
        return res.status(404).json({ message: "Product not found" });
    res.json(product);
});
// POST create product
app.post("/products", (req, res) => {
    const { product_name, product_description, product_price } = req.body;
    const newProduct = {
        id: Date.now(), // simple auto-id
        product_name,
        product_description,
        product_price,
    };
    products.push(newProduct);
    res.status(201).json(newProduct);
});
// PUT update product
app.put("/products/:id", (req, res) => {
    const id = Number(req.params.id);
    const index = products.findIndex((p) => p.id === id);
    if (index === -1)
        return res.status(404).json({ message: "Product not found" });
    products[index] = Object.assign(Object.assign({}, products[index]), req.body);
    res.json(products[index]);
});
// DELETE product
app.delete("/products/:id", (req, res) => {
    const id = Number(req.params.id);
    products = products.filter((p) => p.id !== id);
    res.json({ message: "Product deleted" });
});
// Start Server
app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
//# sourceMappingURL=index.js.map