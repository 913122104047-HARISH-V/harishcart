module.exports = func => (req,res,next)=> Promise.resolve(func(req,res,next)).catch(next)

 
// // if any validation error ,cast error occurs to catch this type of error, we create middle ware like catchAsyncError // if errro occured , next() method pass this error to errormiddleware (error.js) , this action happened in app.js 

/* (or) module.exports = function(func){
  return function(req,res, next){
    return Promise.resolve(func(req,res,next)).catch(next);
  };
};*/
