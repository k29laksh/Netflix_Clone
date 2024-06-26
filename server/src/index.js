import dotenv from 'dotenv'  //now config it

import { connectDB } from './db/index.js'
import app from './app.js'


dotenv.config({
    path: '../.env'
})


connectDB()
.then(()=>{
    app.listen((process.env.PORT||5000), () => {
        console.log(`SERVER STARTED AT PORT: ${process.env.PORT||5000}`)
    })
})
.catch((err)=>{
    console.log("MongoDb connection error",err)
})