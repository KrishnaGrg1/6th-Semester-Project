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
  if (product.length === 0) {
    throw new Error("User has not added any products");
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

const edit=catchAsync(async (req, res) => {
  
  const productid=req.params.productid;

  const existingProduct=await Product.findOne({_id:productid});

  if(!existingProduct){
    throw new Error ("Product not found , ID: "+productid)
  }
  console.log(" create"+existingProduct.createdBy);
  console.log(" req from Product"+req.user._id);
  if (existingProduct.createdBy.toString() !== req.user._id.toString()) {
    throw new Error(existingProduct.createdBy + " Only creator can edit the product  " + req.user._id);
  }
  

  // const updatedProduct=await Product.updateOne(req.body);
  existingProduct.name=req.body.name
  existingProduct.cost=req.body.cost
  existingProduct.stockQuantity=req.body.stockQuantity
  existingProduct.save();
  return res.json({
    message:"Successfully Product updated",
    existingProduct
  })

  

  
});

const remove=catchAsync(async (req, res) => {
  
  const productid=req.params.productid;

  const existingProduct=await Product.findOne({_id:productid});
  
  if(!existingProduct){
    throw new Error ("Product not found , ID: "+productid)
  }
  
  if (existingProduct.createdBy.toString() !== req.user._id.toString()) {
    throw new Error(" Only creator can edit the product  ");
  }
  

  const updatedProduct=await Product.deleteOne(req.body);
 
  return res.json({
    message:"Successfully Product deleted",
    updatedProduct
  })

  

  
});

const productController = { get, post,getBUserId,getByProductId,edit ,remove};

export default productController;
