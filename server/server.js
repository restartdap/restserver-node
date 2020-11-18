require("./config/config");
const express = require("express");
const app = express();

const mongoose = require("mongoose");

mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.set('useCreateIndex', true); 

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(require("./routes/usuario"));

mongoose.connect("mongodb://localhost:27017/dbCafe", (err, res) => {
    if (err) throw err;
    console.log("base de datos conectada");
});

app.listen(process.env.PORT, () => {
    console.log(`Escuchando en el puerto ${process.env.PORT}`);
});