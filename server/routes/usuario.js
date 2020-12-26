const express = require("express");
const bcrypt = require("bcrypt");
const _ = require("underscore");

const Usuario = require("../models/usuario");

const app = express();

app.get("/usuario", (req, res) => {
    let numeroPagina = req.query.page || 0;
    numeroPagina = Number(numeroPagina);
    
    Usuario.find({estado: true}, "nombre email role estado google img")
    .skip(5 * numeroPagina)
    .limit(5)
    .exec((err, usuarios) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        Usuario.countDocuments({estado: true}, (err, conteo) => {

            res.json({
                ok: true,
                usuarios,
                cuantos: conteo
            });
        });
    });
});

app.post("/usuario", (req, res) => {

    const body = req.body;

    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role
    });

    usuario.save((err, dbUsuario) => {
        
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        /*
        // Forma sencilla (se hace de una forma mejor en el modelo)
        dbUsuario.password = null;
        */

        res.json({
            ok: true,
            usuario: dbUsuario
        });
    });
});

app.put("/usuario/:id", (req, res) => {
    const id = req.params.id;
    let body = _.pick(req.body, ["nombre", "email", "img", "role", "estado"]);
    
    Usuario.findByIdAndUpdate(id, body, {new: true, runValidators: true, context:"query"}, (err, dbUsuario) => {
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

app.delete("/usuario/:id", (req, res) => {
    
    let id = req.params.id;

    Usuario.findByIdAndUpdate(id, {estado: false}, {new: true}, (err, usuarioActualizado) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        if(!usuarioActualizado) {
            return res.status(400).json({
                ok: false,
                error: {
                    message: "Usuario no encontrado"
                }
            });
        }

        res.json({
            ok: true,
            usuario: usuarioActualizado
        });
    });

    /*
    // Eliminar definitivamente
    Usuario.findByIdAndRemove(id, (err, usuarioBorrado) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        if(!usuarioBorrado) {
            return res.status(400).json({
                ok: false,
                error: {
                    message: "Usuario no encontrado"
                }
            });
        }

        res.json({
            ok: true,
            usuario: usuarioBorrado
        });
    });
    */
});

module.exports = app;