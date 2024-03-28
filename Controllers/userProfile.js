const { findUserById } = require("../utills/user");
const { hashPassword } = require("../utills/hashPassword");
const apiResponse = require("../utills/apiResponse");
const User = require("../Models/user");
const updateUser = async (req, res) => {
  try {
    if (!req.params) {
      throw new Error("Provide Post Id");
    }
    const { username, email, password, role } = req.body;
    const user = await findUserById(req.params.id);
    console.log(user, "user");
    if (!user) {
      throw new Error("No User Found");
    }
 
    const hashedPassword = await hashPassword(password);
    const updatedUser = await User.findOneAndUpdate(
      { _id: req.params.id },
      {
        username: username,
        email: email,
        password: hashedPassword,
        role: role,
      }
    );
    if (updatedUser) {
      apiResponse.success(res, "Your Profile has been updated");
    }
  } catch (error) {
    apiResponse.fail(res, error.message);
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    if (!users) {
      throw new Error("No user found");
    }
    apiResponse.success(res, users);
  } catch (error) {
    apiResponse.fail(res, error.message);
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await findUserById(req.params.id);
    if (!user) {
      throw new Error("no user found");
    }
    apiResponse.success(res,user)
  } catch (error) {
    apiResponse.fail(res,error.message)
  }
};

const deleteUserById=async(req,res)=>{
    try {
        const {id}=req.params
        const deleteUser=await User.findByIdAndDelete({_id:id})
        if(!deleteUser){
            throw new Error("No Id Found")
        }
        apiResponse.success(res,"User has been deleted")
    } catch (error) {
        apiResponse.fail(res,error.message)
    }
}



module.exports = { updateUser, getAllUsers, getUserById,deleteUserById };
