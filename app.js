const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const mongoose = require("mongoose");

const app = express();

//DB confing
const db = require("./config/keys").MongoURI;

//connect to mongo
mongoose.connect(db)
.then(()=>console.log('mongo connected'))
.catch(err => console.log(err));

//EJS
app.use(express.static("public"));
app.use(expressLayouts);
app.set("view engine", "ejs");

//Routes
app.use("/", require("./routes/index"));
app.use("/users", require("./routes/users"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on ${PORT} ...`));
