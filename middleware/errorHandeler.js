const { statusConstants } = require("../constants/StatusConstants");

const errorHandeler = (error, request, response, next) => {
    const statusCode = response.statusCode || 500;
    var message ="";
    console.log(statusCode)
    switch (statusCode){
        case statusConstants.VALIDATION_ERROR:
            message = "Validation error";break;
        case statusConstants.UNAUTHORISED:
            message = "Unauthorized request";break;
        case statusConstants.FORBIDDEN:
            message = "Forbidden";break;
        case statusConstants.NOT_FOUND:
            message = "Not found";break;
        case statusConstants.INTERNAL_SERVER_ERROR:
            message = "Internal server error";break;
        default:
            message = "Internal server error";break;
    }
    response.json({message:error.message, status : message,statusCode:statusCode, timeStamp :new Date().toISOString()})
};

module.exports = errorHandeler;