const asyncHandler = require("express-async-handler")
const jwt = require("jsonwebtoken");
const { statusConstants } = require("../constants/StatusConstants");

const validate = asyncHandler(async(request,response,next)=>{
    let token;
    let authHeaders = request.headers.Authorization || request.headers.authorization;
    if(authHeaders && authHeaders.startsWith("Bearer")){
        token= authHeaders.split(" ")[1];
        jwt.verify(token,process.env.ACCESS_TOKEN_SECRET, (erroor,decoded)=>{
            if(erroor){
                response.status(401);
                throw new Error(statusConstants.UNAUTHORISED);
            }
            request.user = decoded.user;
            next();
        })
    }else{
        response.status(401);
        throw new Error(statusConstants.UNAUTHORISED);
    }
})

module.exports = validate;