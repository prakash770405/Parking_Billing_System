require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const app = express();

mongoose.connect(
process.env.MONGO_URL
)
.then(()=>console.log("Mongo Connected"));

app.set("view engine","ejs");

app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

app.use(require("./routes/auth"));
app.use(require("./routes/assistant"));
app.use(require("./routes/admin"));
app.use(require("./routes/search"));

app.listen(process.env.PORT,()=>{

    console.log("Server Started");
});

app.use((req,res)=>{

    res.status(404).render("404");

});