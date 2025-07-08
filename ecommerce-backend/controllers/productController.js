import Product from "../models/Product.js";

// create a new product 
export const createProduct =async (req, res) => {
     try{
          const product = await Product.create(req.body)
        res.status(201).json({message: "Product created", product})
        }catch(error){
     res.status(400).json({message: "Error creating product", error});
    }
};

//Get all products
export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: "Error fetching products", error });
    }
};

// Get product by ID
export const getProductById = async (req, res) => {
    try{
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json(product);
    }catch(error){
         res.status(500).json({message:"Error getting product", error});
    }
};

// Update product by ID
export const updateProduct = async(req, res) =>{
    try{
        const product= await Product.findByIdAndUpdate(
            req.params.id,
             req.body,
            {new: true, runValidators: true}
        );
        if (!product){
            return res.status(404).json({message: "Product not found"});
        }
        res.status(200).json({mesage: "Product updated", product});

    }catch(error){
        res.status(400).json({message: " Error udating product", error});
    }
};

// Delete product by ID
export const deleteProduct = async(req, res)=> {
   try{
       const product = await Product.findByIdAndDelete(req.params.id);
       if (!product){
        return res.status(404).json({message:"Product not found"});
       }
        res.status(200).json({mesage: "Product deleted", product});
   }catch(error){
       res.status(500).json({message: "Error deleting product", error});
   }
};