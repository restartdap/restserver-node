const express = require("express");
const app = express();

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

module.exports = app;