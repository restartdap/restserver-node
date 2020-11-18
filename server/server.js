require("./config/config");
const express = require("express");
const mongoose = require("mongoose");

const app = express();
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get("/usuario", (req, res) => {
    res.json("get /usuario");
});

app.post("/usuario", (req, res) => {

    const body = req.body;

    if(body.nombre === undefined) {
        res.status(400).json({
            ok: false,
            mensaje: "El valor 'nombre' es necesario"
        });
    }
    else {
        res.json({
            persona: body
        });
    }
});

app.put("/usuario/:id", (req, res) => {

    const id = req.params.id;

    res.json({
        id
    });
});

app.delete("/usuario", (req, res) => {
    res.json("delete /usuario");
});

mongoose.connect("mongodb://localhost:27017/dbCafe", (err, res) => {
    if (err) throw err;
    console.log("base de datos conectada");
});

app.listen(process.env.PORT, () => {
    console.log(`Escuchando en el puerto ${process.env.PORT}`);
});