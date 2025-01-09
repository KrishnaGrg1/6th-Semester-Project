import catchAsync from "../helpers/catchAsync.js";
import Product from "../models/product.js";

import {findUserByEmail} from "../services/user.js";

const get = catchAsync(async (req, res) => {
 
  const product = await Product.find({}).sort({ createdAt: -1 }) 
 
  return res.json({
    product
  });
});

const post = catchAsync(async (req, res) => {
  

  const newProduct = await Product.create({ ...req.body, createdBy: req.user._id });

  return res.json({
    message: "Product created Successfully",
    newProduct
  
  });
});


const productController = { get, post };

export default productController;
