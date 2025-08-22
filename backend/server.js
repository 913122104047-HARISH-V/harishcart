const app=require('./app')
const connectDatabase = require('./config/database');

connectDatabase();
const server = app.listen(process.env.PORT,()=>{
    console.log(`Backend server listening to the port ${process.env.PORT} in ${process.env.NODE_ENV}`);
});

process.on('unhandledRejection',(err)=>{  // error like MongoParseError for mongo db link string wrong
  console.log(`Error:${err.message}`);
  console.log('Shutting down the server due to unhandled rejection error');
  server.close(()=>{
    process.exit(1);
  })  
})

process.on('uncaughtException',(err)=>{   // this error refers when code like " console.log(a) is present "
  console.log(`Error:${err.message}`);
  console.log('Shutting down the server due to uncaught rejection error');
  server.close(()=>{
    process.exit(1);
  })  
})

