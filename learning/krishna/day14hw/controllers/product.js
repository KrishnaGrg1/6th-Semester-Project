import catchAsync from "../helpers/catchAsync.js";
import Product from "../models/product.js";

import { findUserByEmail } from "../services/user.js";

const get = catchAsync(async (req, res) => {
  const product = await Product.find({}).sort({ createdAt: -1 });

  return res.json({
    product
  });
});

const post = catchAsync(async (req, res) => {
  const newProduct = await Product.create({
    ...req.body,
    createdBy: req.user._id
  });

  return res.json({
    message: "Product created Successfully",
    newProduct
  });
});

const getBUserId = catchAsync(async (req, res) => {
  const userid = req.params.userid;

  const product = await Product.find({ createdBy: userid });

  // if (!product) {

  //   throw new Error("Product not Found :Invalid Userid");
  // }

  if (product.length === 0) {
    throw new Error("Product not available,due to Invalid Userid");
  }

  return res.json({
    product
  });
});

const getByProductId = catchAsync(async (req, res) => {
  return res.json({
    product: req.existingProduct
  });
});

const edit = catchAsync(async (req, res) => {
  if (req.existingProduct.createdBy.toString() !== req.user._id.toString()) {
    throw new Error(" Only creator can edit the product  ");
  }

  req.existingProduct.name = req.body.name;
  req.existingProduct.cost = req.body.cost;
  req.existingProduct.stockQuantity = req.body.stockQuantity;
  req.existingProduct.save();
  return res.json({
    message: "Successfully Product updated",
    existingProduct: req.existingProduct
  });
});

const remove = catchAsync(async (req, res) => {
  if (req.existingProduct.createdBy.toString() !== req.user._id.toString()) {
    throw new Error(" Only creator can edit the product  ");
  }

  const updatedProduct = await Product.deleteOne(req.body);

  return res.json({
    message: "Successfully Product deleted",
    updatedProduct
  });
});

const productController = {
  get,
  post,
  getBUserId,
  getByProductId,
  edit,
  remove
};

export default productController;
