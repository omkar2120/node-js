const express = require('express')
const UserController = require("../controller/userController")

const router = express.Router();

router.post("/userRegister", UserController.UserRegister)
router.post("/findUserById" , UserController.findUserById)
router.post("/updateUser", UserController.updateUser )
router.post("/deleteUserData", UserController.deleteUserData) 
router.post("/getAllUserListSearch" , UserController.getAllUserListSearch)
module.exports= router;