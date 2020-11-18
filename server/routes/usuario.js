const express = require("express");
const Usuario = require("../models/usuario");

const app = express();

app.get("/usuario", (req, res) => {
    res.json("get /usuario");
});

app.post("/usuario", (req, res) => {

    const body = req.body;

    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: body.password,
        role: body.role
    });

    usuario.save((err, dbUsuario) => {
        
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            usuario: dbUsuario
        });
    });
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