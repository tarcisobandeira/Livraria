const express = require('express');
const router = express.Router();
const Editoras = require('../models/editoras');

router.get('/editoras', (req, res) => {
    Editoras.findAll({
        order:[
            ['nome', 'ASC']
        ]
    }).then(editoras => {
        res.render('editoras/index', {editoras: editoras});
    });
});

router.get('/editoras/novo', (req, res) => {
    res.render('editoras/novo');
});

router.post('/editoras/salvar', (req, res) => {
    var nome = req.body.nome;

    Editoras.findOne({
        where:{
            nome: nome
        }
    }).then(editora => {
        if(editora == undefined){
            Editoras.create({
                nome: nome
            }).then(() => {
                res.redirect('/editoras');
            })
        }else{
            res.redirect('/editoras');
        }
    })
});

router.get('/editoras/editar/:id', (req, res) => {
    var id = req.params.id;

    Editoras.findByPk(id).then(editora => {
        res.render('editoras/editar', {editora: editora});
    });
});

router.post('/editoras/alterar', (req, res) => {
    var id = req.body.id;
    var nome = req.body.nome;

    Editoras.update({
        nome: nome
    },{
        where: {
            id: id
        }
    }).then(() => {
        res.redirect('/editoras');
    });
});

router.get('/editoras/excluir/:id', (req, res) => {
    var id = req.params.id;

    Editoras.destroy({
        where: {
            id: id
        }
    }).then(() => {
        res.redirect('/editoras');
    });
});

module.exports = router;