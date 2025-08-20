import product from "../models/product.js";

export const getAllProducts = async (req, res) => {
    console.log( res.locals.customData)
  try {
    console.log("getting here")
   const products = await product.find({},{price:0}); 
    res.status(200).send(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
export const getProductById = async (req, res) => {
    try {
    const productId = req.params.id;
    const productData = await product.findById(productId);
    if (!productData) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(productData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
}
export const createProduct = async (req, res) => {
  try {
    const newProduct = new product(req.body);
    const savedProduct = await newProduct.save();
    res.status(201).json({
      message: "Product created successfully",
      product: savedProduct,
    });
  } catch (err) {
    console.error(err);

    
    if (err.name === "ValidationError") {
      return res.status(400).json({
        message: "Validation error",
        errors: err.errors, 
      });
    }

    res.status(500).json({
      message: "Server error",
      error: err.message,
    });
  }
};

const updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    // Validate the request body
    let product=new product(req.body);
    const updatedProduct = await product.findByIdAndUpdate(productId, req.body,{
        new: true, 
        runValidators: true, 
    });
    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (err) {
    console.error(err);
    if (err.name === "ValidationError") {
      return res.status(400).json({
        message: "Validation error",
        errors: err.errors, 
      });
    }
    res.status(500).json({
      message: "Server error",
      error: err.message,
    });
  }
};