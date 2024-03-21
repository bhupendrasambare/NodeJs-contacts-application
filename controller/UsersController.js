const {StatusConstants} = require("../constants/StatusConstants")
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken')
const asyncHandler = require("express-async-handler")
const Users = require("../models/usersModel");

/*
* Login
* @route POST /app/users/login
* @access public
*/
const login = asyncHandler( async (request, response)=>{
    const {email,password} = request.body;
    if(!password || !email){
        response.status(statusConstants.VALIDATION_ERROR);
        throw new Error("Email and password are mendatory fields");
    }
    const existingUser = await Users.findOne({ email });
    if (!existingUser) {
        throw new Error("user not exist with this email");
    }
    if(existingUser && (await bcrypt.compare(password,existingUser.password))){
        const accessToken = jwt.sign({
            user:{
                _id:existingUser._id,
                firstName:existingUser.firstName,
                lastName:existingUser.lastName,
                email:existingUser.email,
                userName:existingUser.userName,
                phone:existingUser.phone
            }
        },process.env.ACCESS_TOKEN_SECRET,{expiresIn:"24h"});
        response.status(200).json({token:accessToken})
    }else{
        response.status(201);
        throw new Error("Invalid password");
    }
})
/*
* Login
* @route POST /app/users/register
* @access public
*/
const register = asyncHandler( async (request, response)=>{
    const {firstName,password,email,userName} = request.body;
    if(!firstName || !password || !email || !userName){
        response.status(statusConstants.VALIDATION_ERROR);
        throw new Error("firstName, password, email, userName are mendatory fields");
    }
    const existingUser = await Users.findOne({ $or: [{ email }, { userName }] });
    console.log(existingUser);
    if (existingUser) {
        throw new Error("Username and email must be unique");
    }
    const hashPassword = await bcrypt.hash(password,10);
    request.body.password = hashPassword;
    const user = await Users.create(request.body);
    response.status(200).json({_id:user._id,email:user.email,userName:user.userName});
})

/*
* All Contacts
* @route GET /app/users/get
* @access public
*/
const getUsers = asyncHandler( async (request, response)=>{
    const users = await Users.find();
    response.status(200).json(users);
})

/*
* All Contacts
* @route GET /app/users/profile
* @access login
*/
const profile = asyncHandler( async (request, response)=>{
    const id = request.user._id;
    console.log(request.user)
    const users = await Users.findById(id);
    response.status(200).json(users);
})
module.exports = {login,register,getUsers,profile}