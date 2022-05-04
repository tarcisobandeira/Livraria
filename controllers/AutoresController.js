const express = require('express');
const router = express.Router();
const Autores = require('../models/autores');

router.get('/autores', (req, res) => {
    Autores.findAll({
        order:[
            ['nome', 'ASC']
        ]
    }).then(autores => {
        res.render('autores/index', {autores: autores});
    });
});

router.get('/autores/novo', (req, res) => {
    res.render('autores/novo');
});

router.post('/autores/salvar', (req, res) => {
    var nome = req.body.nome;
    var nascimento = req.body.nascimento;
    var morte = req.body.morte;

    Autores.findOne({
        where:{
            nome: nome
        }
    }).then(autores => {
        if(autores == undefined){
            Autores.create({
                nome: nome,
                nascimento: nascimento,
                morte: morte
            }).then(() => {
                res.redirect('/autores');
            })
        }else{
            res.redirect('/autores');
        }
    })
});

router.get('/autores/editar/:id', (req, res) => {
    var id = req.params.id;

    Autores.findByPk(id).then(autores => {
        res.render('autores/editar', {autores: autores});
    });
});

router.post('/autores/alterar', (req, res) => {
    var id = req.body.id;
    var nome = req.body.nome;
    var nascimento = req.body.nascimento;
    var morte = req.body.morte;

    Autores.update({
        nome: nome,
        nascimento: nascimento,
        morte: morte
    },{
        where: {
            id: id
        }
    }).then(() => {
        res.redirect('/autores');
    });
});

router.get('/autores/excluir/:id', (req, res) => {
    var id = req.params.id;

    Autores.destroy({
        where: {
            id: id
        }
    }).then(() => {
        res.redirect('/autores');
    });
});

module.exports = router;