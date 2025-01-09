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

const getBUserId=catchAsync(async (req, res) => {
  
  const userid=req.params.userid;

  const product = await Product.find({createdBy:userid})

  if(!product){
    console.log(product)
    throw new Error ("Invalid userid")
  }
  
 
  return res.json({
    product
  });
});

const getByProductId=catchAsync(async (req, res) => {
  
  const productid=req.params.productid;

  const product = await Product.findOne({_id:productid})

  if(!product){
    console.log(product)
    throw new Error ("Invalid userid")
  }
  
 
  return res.json({
    product
  });
});

const productController = { get, post,getBUserId,getByProductId };

export default productController;
