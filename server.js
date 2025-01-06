const express = require("express");
const dataScienceRouter = require("./routers/dataSciRouters")
const app = express()
const cors = require('cors');
app.use(cors({ origin: 'http://localhost:5173' })); // Allow only your front-end URL
app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use("/" , dataScienceRouter);

app.listen(3005 , ()=>{
    console.log("listening at http://localhost:3005");
})
