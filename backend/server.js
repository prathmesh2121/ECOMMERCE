const app = require('./app');
const dotenv = require('dotenv');
const connectDatabase = require('./config/database');

// HANDLING UNCOUGHT EXCEPTION
process.on("uncaughtException", (err)=>{

        console.log(`ERROR : ${err.message}`)
        console.log(`SHUTTING DOWN SERVER - DUE TO UNHANDLE uncaughtException `)
        server.close(()=>
        {
            process.exit(1);
        })
    
    
})





//config
dotenv.config({path:'backend/config/config.env'});

//connectin to db
connectDatabase();

const port = process.env.PORT;
const server = app.listen(process.env.PORT, ()=>{
    console.log('server runnning on http://localhost:',{port});
})



process.on("unhandledRejection", (err)=>{
    console.log(`ERROR : ${err.message}`);
    console.log(`SHUTTING DOWN SERVER - DUE TO UNHANDLE PROMISE REJECTION`)

    server.close(()=>
    {
        process.exit(1);
    })
})