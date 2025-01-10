import catchAsync from "../helpers/catchAsync.js";
import Product from "../models/product.js";

const existingProduct = catchAsync(async (req, res, next) => {
  const productId = req.params.productid;
  
  const existingProduct = await Product.findOne({ _id: productId });

  if (!existingProduct) {
  
    throw new Error("Invalid ProductID, Product ID not found");
  }else{
    req.existingProduct=existingProduct;
    next()
    
  }
  
});


export default existingProduct