import bcrypt from "bcrypt";
import UserModel from "../models/model.js";
import PurchasedPlan from "../models/purchase.js";
import SubscriptionPlan from "../models/subscriptionPlan.js";

const viewProfileEdit = async (req, res) => {
  try {
    const loggedInUser = req.user;
    const userId = loggedInUser._id;
    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(404).send("User not found");
    }

    if (user.role === "user") {
      res.render("edit-profile", { loggedInUser, user, message: "" });
    } else if (user.role === "admin") {
      const users = await UserModel.find();
      const selectedUserId = req.query.userId || userId;
      const userToEdit = await UserModel.findById(selectedUserId);

      res.render("adminEditProfile", {
        loggedInUser,
        user,
        users,
        userToEdit,
        message: "",
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

const viewProfileDetails=async(req,res)=>{
  try{
   const loggedInUser = req.user;  // Logged-in user (admin)
       const userId = loggedInUser._id;  // Get logged-in user's ID
       const user = await UserModel.findById(userId);

       if (!user) {
           return res.status(404).send('User not found');
       }
       console.log(user)

       const purchasedplan=await PurchasedPlan.findOne({user:userId})
       
       if(!purchasedplan){
           return res.render('profiledetails', {
               user,
               purchasedplan: {
                 purchaseDate: null,
                 expiryDate: null,
                 plan_name: null,
               },
               subscriptionPlan: 0,
               daysLeft: 0, // No days left if no plan exists
             });
       }
       const subscriptionPlan=await SubscriptionPlan.findOne({_id:purchasedplan.plan_id});
       console.log(subscriptionPlan.plan_name);
       const today = new Date(); // Current date
       const expiryDate = new Date(purchasedplan.expiryDate); // Expiry date from the database
   
       // Calculate the difference in milliseconds
       const timeDifference = expiryDate - today;
   
       // Convert milliseconds to days
       const daysLeft = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
       res.render('profiledetails',{
           user,purchasedplan,subscriptionPlan,daysLeft
       })
  }
  catch (err) {
   console.error(err);
   res.status(500).send('Internal Server Error');
}
}

const updateUserProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    const { fname, lname, email, currentpassword, newPassword } = req.body;

    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).render("edit-profile", { message: "User not found", loggedInUser: req.user, user: req.user });
    }

    // Verify current password
    const isMatch = await bcrypt.compare(currentpassword, user.password);
    if (!isMatch) {
      return res.render("edit-profile", { message: "Incorrect current password", loggedInUser: req.user, user: req.user });
    }

    // Check if the email is being changed
    if (email !== user.email) {
      const existingUser = await UserModel.findOne({ email });
      if (existingUser) {
        return res.render("edit-profile", { message: "Email already in use", loggedInUser: req.user, user: req.user });
      }
    }

    // Update profile data
    user.fname = fname;
    user.lname = lname;
    user.email = email;

    // Hash new password if provided
    if (newPassword) {
      user.password = await bcrypt.hash(newPassword, 10);
    }

    await user.save();

    res.redirect("/profiledetails?success=Profile updated successfully");
  } catch (err) {
    console.error("Error updating profile:", err);
    res.status(500).render("edit-profile", { message: "Something went wrong. Please try again.", loggedInUser: req.user, user: req.user });
  }
};


const updateAdminProfile = async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).send("Forbidden");
  }

  try {
    const { userId, fname, lname, email, password } = req.body;

    // Find user
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).send("User not found");
    }

    // Check if email is already in use by another user
    const existingUser = await UserModel.findOne({ email });
    if (existingUser && existingUser._id.toString() !== userId.toString()) {
      return res.render("adminEditProfile", {
        loggedInUser: req.user,
        users: await UserModel.find(),
        userToEdit: user,
        message: "Email already in use",
      });
    }

    // Hash new password if provided
    let hashedPassword = user.password;
    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    await UserModel.findByIdAndUpdate(userId, { fname, lname, email, password: hashedPassword });

    res.redirect(`/edit-profile?userId=${userId}`);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

const profileManagementController = {
  viewProfileEdit,
  updateUserProfile,
  updateAdminProfile,
  viewProfileDetails,
};

export default profileManagementController;
