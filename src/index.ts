import express, { Request, Response } from "express";

const app = express();
app.use(express.json());

// In-memory DB
let products: {
  id: number;
  product_name: string;
  product_description: string;
  product_price: number;
}[] = [];

// GET all products
app.get("/products", (req: Request, res: Response) => {
  res.json(products);
});

// GET one product by ID
app.get("/products/:id", (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const product = products.find((p) => p.id === id);

  if (!product) return res.status(404).json({ message: "Product not found" });

  res.json(product);
});

// POST create product
app.post("/products", (req: Request, res: Response) => {
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
app.put("/products/:id", (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const index = products.findIndex((p) => p.id === id);

  if (index === -1) return res.status(404).json({ message: "Product not found" });

  products[index] = { ...products[index], ...req.body };
  res.json(products[index]);
});

// DELETE product
app.delete("/products/:id", (req: Request, res: Response) => {
  const id = Number(req.params.id);
  products = products.filter((p) => p.id !== id);
  res.json({ message: "Product deleted" });
});

// Start Server
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
