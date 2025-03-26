import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    title: String,
    price: Number,
    description: String,
    category: {
        type: String,
        enum: ["Men", "Women", "Others"],
        required: true
    },
    images: [String], 
    rating: {
        rate: Number,
        count: Number
    }
});

export default mongoose.model("Product", productSchema);
