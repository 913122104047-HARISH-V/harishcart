class ErrorHandler extends Error {     // error details given , by using Error class
    constructor(message,statusCode){
       super(message); // statuscode is optional
       this.statusCode=statusCode;
       Error.captureStackTrace(this,this.constructor)
    }
}
module.exports =ErrorHandler; // this class exports to all resources