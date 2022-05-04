const express = require('express');
const app = express();
const connection = require('./database/database');

// setup do ambiente
// View engine
app.set('view engine', 'ejs');

// Ativar os arquivos estáticos
app.use(express.static('public'));

// Banco de Dados
connection
   .authenticate()
   .then(() => {
       console.log('Conexão feita com sucesso!');
   })
   .catch(erro => {
       console.log('Problemas na conexão');
   });

// Parser de formulários
app.use(express.urlencoded({extended: false}));
app.use(express.json());

// Models
const Usuario = require('./models/usuarios');
const Genero = require('./models/generos');
const Editora = require('./models/editoras');
const Autor = require('./models/autores');
const Livro = require('./models/livros');

// Controller
const UsuariosController = require('./controllers/UsuariosController');
const GenerosController = require('./controllers/GenerosController');
const EditorasController = require('./controllers/EditorasController');
const AutoresController = require('./controllers/AutoresController');

// Rotas
app.get('/', (req, res) => {
    res.render('index');
}); 

// Rotas externas
app.use('/', UsuariosController);
app.use('/', GenerosController);
app.use('/', EditorasController);
app.use('/', AutoresController);

app.listen(8080, () => {
    console.log('O servidor está ativo');
});