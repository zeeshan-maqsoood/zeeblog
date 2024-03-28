const express = require("express");
const  authenticate  = require("../Middleware/auth");
const { updateUserProfileRoles } = require("../Validation/userValidation");
const { userValidation } = require("../Middleware/user");
const {updateUser,getAllUsers,getUserById,deleteUserById}=require("../Controllers/userProfile")
const router = express.Router();


router.put("/updateUser/:id",[updateUserProfileRoles,userValidation,authenticate],updateUser)
router.get("/getAllUsers",authenticate,getAllUsers)
router.get("/getUserById",authenticate,getUserById)
router.delete("/deleteUser/:id",authenticate,deleteUserById)
module.exports = router;
