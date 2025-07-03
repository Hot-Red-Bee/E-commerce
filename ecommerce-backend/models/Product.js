import mongoose, {Schema} from "mongoose";

const productSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: [3, "Product name must be at least 3 characters long"],
        maxlength: [100, "Product name must not exceed 100 characters"]
    },
    description: {
        type: String,
        required: true,
        trim: true,
        minlength: [10, "Product description must be at least 10 characters long"],
        maxlength: [500, "Product description must not exceed 500 characters"]
    },
    price: {
        type: Number,
        required: true,
        min: [0, "Price must be a positive number"]
    },
    category: {
        type: String,
        required: true,
        trim: true,
        enum: ["electronics", "clothing", "home", "books", "toys", "sports"]
    },
    stock: {
        type: Number,
        required: true,
        min: [0, "Stock must be a non-negative number"]
    },
    images: [{
        type: String,
        required: true
    }],
    ratings: {
        average: {
            type: Number,
            default: 0,
            min: [0, "Rating must be between 0 and 5"],
            max: [5, "Rating must be between 0 and 5"]
        },
        count: {
            type: Number,
            default: 0
        }
    },
    isFeatured: {
        type: Boolean,
        default: false
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });
const Product = mongoose.model("Product", productSchema);
export default Product;