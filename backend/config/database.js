const mongoose = require('mongoose');

const connectDatabase = ()=>{
    mongoose.connect(process.env.DB_URI, {
        useNewUrlParser:true,
        useUnifiedTopology:true,
        //createIndexes:true
    }).then((data)=>{
        const dbname = data.connection.host;
        console.log('Database connected server'+dbname);
    })
}
module.exports = connectDatabase