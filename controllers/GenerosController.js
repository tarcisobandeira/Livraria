const express = require('express');
const router = express.Router();
const Generos = require('../models/generos');

// metodo para achar todos os itens da tabela e ir para a página com os itens já carregados
router.get('/generos', (req, res) => {
    Generos.findAll({
        order:[
            ['genero', 'ASC']
        ]
    }).then(generos => {
        res.render('generos/index', {generos: generos});
    })
});

// metodo para ir até uma página
router.get('/generos/novo', (req, res) => {
    res.render('generos/novo');
});

// metodo para salvar no banco
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

// metodo para trazer o item com o id expecifico
router.get('/generos/editar/:id', (req, res) => {
    var id = req.params.id;
    
    Generos.findByPk(id).then(genero => {
        res.render('generos/editar', {genero: genero});
    });
});

// metodo para alterar
router.post('/generos/alterar', (req, res) => {
    var id = req.body.id;
    var genero = req.body.genero;

    Generos.update({
        genero: genero
    },{
        where: {
            id: id
        }
    }).then(() => {
        res.redirect('/generos');
    });
});

// metodo para excluir
router.get('/generos/excluir/:id', (req, res) => {
    var id = req.params.id;

    Generos.destroy({
        where: {
            id: id
        }
    }).then(() => {
        res.redirect('/generos');
    });
});

// qualquer arquivo para controle termina com isso
module.exports = router;