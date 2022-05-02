const express = require('express');
const router = express.Router();
const Usuarios = require('../models/usuarios');
const bcrypt = require('bcryptjs');

router.get('/usuarios', (req, res) => {
    Usuarios.findAll({
        order: [
            ['nome', 'ASC']
        ]
    }).then(usuarios => {
        res.render('usuarios/index', {usuarios: usuarios});
    })
});

router.get('/usuarios/novo', (req, res) => {
    res.render('usuarios/novo');
});

router.post('/usuarios/salvar', (req, res) => {
    var nome = req.body.nome;
    var email = req.body.email;
    var senha = req.body.senha;

    Usuarios.findOne({
        where: {
            email : email
        }
    }).then(usuario => {
        if(usuario == undefined)
        {
            var salt = bcrypt.genSaltSync(10);
            var senhaCripto = bcrypt.hashSync(senha, salt);

            Usuarios.create({
                nome: nome,
                email: email,
                senha: senhaCripto
            }).then(() => {
                res.redirect('/usuarios');
            })
        }
        else
        {
            res.redirect('/usuarios');
        }
    })
});

router.get('/usuarios/editar/:id', (req, res) => {
    var id = req.params.id;
    Usuarios.findByPk(id).then(usuario => {
        res.render('usuarios/editar', {usuario: usuario});
    });
});

router.post('/usuarios/alterar', (req, res) => {
    var id = req.body.id;
    var nome = req.body.nome;
    var email = req.body.email;

    Usuarios.update({
        nome: nome,
        email: email
    },
    {
        where: {
            id: id
        }
    }).then(() => {
        res.redirect('/usuarios');
    });
});

router.get('/usuarios/excluir/:id', (req, res) => {
    var id = req.params.id;

    Usuarios.destroy({
        where: {
            id: id
        }
    }).then(() => {
        res.redirect('/usuarios');
    });
});

module.exports = router;