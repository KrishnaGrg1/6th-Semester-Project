import catchAsync from "../helpers/catchAsync.js";
import Product from "../models/product.js";
import User from "../models/user.js";
import findUserByEmail from "../services/user.js";

const get = catchAsync(async (req, res) => {
  // const id=req.headers.X-Powered-By;

  const userId = req.headers["x-powered-by"];
  if (!userId) {
    throw new Error("Unauthorized: UserId required");
  }
  const existingUser = await User.findOne({ _id: userId });

  if (!existingUser) {
    throw new Error("Invalid Id");
  }
  const product = await Product.find({})
 
  return res.json({
    product
  });
});

const post = catchAsync(async (req, res) => {
  // const id=req.headers.X-Powered-By;
  const { name, cost, stockQuantity } = req.body;
  const userId = req.headers["x-powered-by"];
  if (!userId) {
    throw new Error("Unauthorized: UserId required");
  }
  const existingUser = await User.findOne({ _id: userId });

  if (!existingUser) {
    throw new Error("Invalid Id");
  }

  const createdBy = existingUser._id;

  const newProduct = await Product.create({
    name,
    cost,
    stockQuantity,
    createdBy
  });
  return res.json({
    message: "Product created Successfully",
    newProduct: { ...newProduct.toObject(), _id: undefined }
  });
});


const productController = { get, post };

export default productController;
