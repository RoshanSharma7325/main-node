const express=require("express");
const { adddatas,get,verification, login, logout, multer, getuserIMg } = require("../controller/userController");
const Verifytoken = require("../MiddleWare/VerifyToken");
const upload = require("../uploads/multer");
// const multer = require("../controller/userController");
const userRoute=express.Router();

userRoute.post("/add",adddatas);
userRoute.get("/get",get);
userRoute.post("/token",Verifytoken) 
userRoute.post("/login",login);
userRoute.post("/logout",Verifytoken ,logout);
userRoute.post("/multer",upload.array("files"),multer);
userRoute.get("/img",getuserIMg);


module.exports = userRoute




