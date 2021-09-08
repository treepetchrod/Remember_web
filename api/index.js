const express =require("express");
const mongoose = require("mongoose");
const app = express();
const dotenv = require("dotenv")
const authRoute = require("./routers/auth")
const postRoute = require("./routers/post")

dotenv.config()
app.use(express.json());

mongoose
    .connect(process.env.MONGO_URL,{
        useNewUrlParser:true,
        useUnifiedTopology:true,
        useCreateIndex:true,
        useFindAndModify:true,
    })
    .then(console.log("Already connected to MongoDB!!!"))
    .catch((err) => console.log(err));


app.use("/api/auth",authRoute);
app.use("/api/post",postRoute);




app.listen("5000", () => {
    console.log("Server is running.")
})


