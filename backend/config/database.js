const mongoose= require('mongoose')
const connectDatabase = ()=>{
    mongoose.connect(process.env.DB_LOCAL_URI,{
        useNewUrlParser:true,
        useUnifiedTopology:true
    }).then(con=>{
        console.log(`MongoDB is connected to the host : ${con.connection.host}`)
    })// here catch is not mention so it is unhandledRejection error
}

module.exports=connectDatabase;