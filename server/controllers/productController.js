import Product from "../models/Product.js";

// Get all products
export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: "Error fetching products", error });
    }
};

// Get a single product by ID
export const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) return res.status(404).json({ message: "Product not found" });
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: "Error fetching product", error });
    }
};

// Get products by category
export const getProductsByCategory = async (req, res) => {
    try {
        const category = req.params.category;
        if (!["Men", "Women", "Others"].includes(category)) {
            return res.status(400).json({ message: "Invalid category" });
        }

        const products = await Product.find({ category });
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: "Error fetching category products", error });
    }
};

// Get recommended products (4 random products)
export const getRecommendedProducts = async (req, res) => {
    try {
        // Get count of all products
        const count = await Product.countDocuments();
        
        // If there are 4 or fewer products, return all of them
        if (count <= 4) {
            const products = await Product.find();
            return res.json(products);
        }

        // Get 4 random products
        const randomProducts = await Product.aggregate([
            { $sample: { size: 4 } }
        ]);
        
        res.json(randomProducts);
    } catch (error) {
        res.status(500).json({ message: "Error fetching recommended products", error });
    }
};