module.exports=(err,req,res,next)=>{  // this middleware in mentioned in app.js to handle all errors
    err.statusCode = err.statusCode || 500;  // throwed error object contain error message and status code by error handler method in utilis folder 
    if(process.env.NODE_ENV =='development') {
      res.status(err.statusCode).json({ 
      success : false, 
      message : err.message,
      stack : err.stack,
      error : err
      })
    }

   if(process.env.NODE_ENV =='production') {
       let message = err.message; // access message 
       let error =new Error(message);
 //      let error = {...err}; // duplicating the error
      if(err.name=='ValidationError'){
        message = Object.values(err.errors).map(value => value.message) // for access message properties like "ValidationError"
        error = new Error(message) //change value of error message by our given 
        // here this error class convert message array to string like :
        // {"success": false,"message": ["Please enter product description","Please enter product name"]} to { "success": false, "message": "Please enter product description,Please enter product name" }
        err.statusCode=400
      }

      if(err.name =='CastError'){  //path": "_id"
        message=`Resource not found : ${err.path}`;
        error = new Error(message)
        err.statusCode=400
      }

      if(err.code == 11000){
        let message=`Duplicate ${Object.keys(err.keyValue)} error`;
        error = new Error(message)
        err.statusCode=400
      }
    if(err.name == 'JSONWebTokenError'){
       let message = `JSON web Token is invalid. Try again`;
       error = new Error(message)
       err.statusCode=400
    }
    if(err.name == 'TokenExpiredError'){
      let message = `JSON web Token is expired. Try again`;
      error = new Error(message)
      err.statusCode=400
    }
      res.status(err.statusCode).json({ 
        success : false, message : error.message || "Internal server error"
      })
   }
}

/*
during production :
{
  "success": false,
  "message": "Product validation failed: description: Please enter product description, name: Please enter product name"
}
so see here : 
during development : if any field is missing while creating
{
  "success": false,
  "message": "Product validation failed: description: Please enter product description, name: Please enter product name",
  "stack": "ValidationError: Product validation failed: description: Please enter product description, name: Please enter product name\n    at Document.invalidate (C:\\Users\\hari\\Downloads\\proj\\node_modules\\mongoose\\lib\\document.js:3331:32)\n    at C:\\Users\\hari\\Downloads\\proj\\node_modules\\mongoose\\lib\\document.js:3092:17\n    at C:\\Users\\hari\\Downloads\\proj\\node_modules\\mongoose\\lib\\schemaType.js:1407:9\n    at process.processTicksAndRejections (node:internal/process/task_queues:77:11)",
  "error": {
    "errors": {
      "description": {
        "name": "ValidatorError",
        "message": "Please enter product description",
        "properties": {
          "message": "Please enter product description",
          "type": "required",
          "path": "description"
        },
        "kind": "required",
        "path": "description"
      },
      "name": {
        "name": "ValidatorError",
        "message": "Please enter product name",
        "properties": {
          "message": "Please enter product name",
          "type": "required",
          "path": "name"
        },
        "kind": "required",
        "path": "name"
      }
    },
    "_message": "Product validation failed",
    "statusCode": 500,
    "name": "ValidationError",
    "message": "Product validation failed: description: Please enter product description, name: Please enter product name"
  }

  here we if error is "ValidationError" then do some in production
}*/


/*
during production : when type random id like "dhsdgfjh"
{
  "success": false,
  "message": "Internal server error"
}
{
  during development 
  "success": false,
  "message": "Cast to ObjectId failed for value \"676a408692182732c7b5\" (type string) at path \"_id\" for model \"Product\"",
  "stack": "CastError: Cast to ObjectId failed for value \"676a408692182732c7b5\" (type string) at path \"_id\" for model \"Product\"\n    at SchemaObjectId.cast (C:\\Users\\hari\\Downloads\\proj\\node_modules\\mongoose\\lib\\schema\\objectId.js:250:11)\n    at SchemaType.applySetters (C:\\Users\\hari\\Downloads\\proj\\node_modules\\mongoose\\lib\\schemaType.js:1255:12)\n    at SchemaType.castForQuery (C:\\Users\\hari\\Downloads\\proj\\node_modules\\mongoose\\lib\\schemaType.js:1673:17)\n    at cast (C:\\Users\\hari\\Downloads\\proj\\node_modules\\mongoose\\lib\\cast.js:390:32)\n    at Query.cast (C:\\Users\\hari\\Downloads\\proj\\node_modules\\mongoose\\lib\\query.js:4889:12)\n    at Query._castConditions (C:\\Users\\hari\\Downloads\\proj\\node_modules\\mongoose\\lib\\query.js:2306:10)\n    at model.Query._findOne (C:\\Users\\hari\\Downloads\\proj\\node_modules\\mongoose\\lib\\query.js:2630:8)\n    at model.Query.exec (C:\\Users\\hari\\Downloads\\proj\\node_modules\\mongoose\\lib\\query.js:4438:80)\n    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)\n    at async C:\\Users\\hari\\Downloads\\proj\\backend\\controllers\\productController.js:19:22",
  "error": {
    "stringValue": "\"676a408692182732c7b5\"",
    "valueType": "string",
    "kind": "ObjectId",
    "value": "676a408692182732c7b5",
    "path": "_id",
    "reason": {},
    "name": "CastError",
    "message": "Cast to ObjectId failed for value \"676a408692182732c7b5\" (type string) at path \"_id\" for model \"Product\""
  }
}
*/

/*
during developement with wrong id like : "676a40b7018692182731c7b5" in "instead of "676a40b7018692182732c7b5"
{
  "success": false,
  "message": "Product not found",
  "stack": "Error: Product not found\n    at C:\\Users\\hari\\Downloads\\proj\\backend\\controllers\\productController.js:21:21\n    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)",
  "error": {
    "statusCode": 404
  }
}

during production :
{
  "success": false,
  "message": "Internal server error"
}
*/


/*
when same user email id is register : 
in production time : 
{
  "success": false,
  "message": "E11000 duplicate key error collection: harishcart.users index: email_1 dup key: { email: \"harish@example.com\" }"
}
in development time :
{
  "success": false,
  "message": "E11000 duplicate key error collection: harishcart.users index: email_1 dup key: { email: \"harish@example.com\" }",
  "stack": "MongoServerError: E11000 duplicate key error collection: harishcart.users index: email_1 dup key: { email: \"harish@example.com\" }\n    at InsertOneOperation.execute (C:\\Users\\hari\\Downloads\\proj\\node_modules\\mongodb\\lib\\operations\\insert.js:51:19)\n    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)\n    at async tryOperation (C:\\Users\\hari\\Downloads\\proj\\node_modules\\mongodb\\lib\\operations\\execute_operation.js:203:20)\n    at async executeOperation (C:\\Users\\hari\\Downloads\\proj\\node_modules\\mongodb\\lib\\operations\\execute_operation.js:73:16)\n    at async Collection.insertOne (C:\\Users\\hari\\Downloads\\proj\\node_modules\\mongodb\\lib\\collection.js:157:16)",
  "error": {
    "errorResponse": {
      "index": 0,
      "code": 11000,
      "errmsg": "E11000 duplicate key error collection: harishcart.users index: email_1 dup key: { email: \"harish@example.com\" }",
      "keyPattern": {
        "email": 1
      },
      "keyValue": {
        "email": "harish@example.com"
      }
    },
    "index": 0,
    "code": 11000,
    "keyPattern": {
      "email": 1
    },
    "keyValue": {
      "email": "harish@example.com"
    },
    "statusCode": 500
  }
}

*/