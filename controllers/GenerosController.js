const express = require('express');
const router = express.Router();
const Generos = require('../models/generos');
const bcrypt = require('bcryptjs');

router.get('/generos', (req, res) => {
    Generos.findAll({
        order:[
            ['genero', 'ASC']
        ]
    }).then(generos => {
        res.render('generos/index', {generos: generos});
    })
});

router.get('/generos/novo', (req, res) =>{
    res.render('generos/novo');
});

router.post('/generos/salvar', (req, res) => {
    var genero = req.body.genero;

    Generos.findOne({
        where: {
            genero : genero
        }
    }).then(generos => {
        if(generos == undefined){
            Generos.create({
                genero: genero
            }).then(() => {
                res.redirect('/generos');
            })
        }else{
            res.redirect('/generos');
        }
    })
});

module.exports = router;