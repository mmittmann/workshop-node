const express = require('express');
const app = express();
const middleware = require('./log-middleware');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Desenvolvedores = require('./models/desenvolvedores');

var options = {
    server: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } },
    replset: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } }
};

mongoose.connect('mongodb://teste:teste123@ds127949.mlab.com:27949/workshop', options,
    (err) => {
        if (err) console.log('Não consegui conectar');
        else console.log('Conectado com sucesso!');
    });

app.set('view engine', 'pug');

app.use(middleware);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.render('index', { nomes: ['teste 1', 'teste 2', 'teste 3'] });
});

app.get('/contato', (req, res) => {
    res.render('contato');
});

app.get('/sobre', (req, res) => {
    res.render('sobre');
});

app.get('/cadastrar', (req, res) => {
    res.render('cadastrar');
});

var indice = 0;
app.route('/desenvolvedores')
    .post((req, res) => {
        var desenvolvedores = new Desenvolvedores({
            nome: req.body.nome,
            email: req.body.email,
            indice: ++indice
        });
        desenvolvedores.save((err) => {
            if (err) res.status(500).send('Ocorreu um erro');

            Desenvolvedores.find({},
                (err, desenvolvedores) => {
                    if (err) res.status(500).send('Deu erro');

                    res.render('desenvolvedores', { desenvolvedores: desenvolvedores });
                });
        });
    })
    .get((req, res) => {
        Desenvolvedores.find({},
            (err, desenvolvedores) => {
                if (err) res.status(500).send('Deu erro');

                res.render('desenvolvedores', { desenvolvedores: desenvolvedores });
            });
    });

app.get('/sortear', (req, res) => {
    var randomNumber = Math.floor((Math.random() * 8) + 1);

    Desenvolvedores.findOne({ indice: randomNumber }, (err, dev) => {
        res.render('sortear', { dev: dev });
    });

});

app.listen(3001, () => {
    console.log('Você está rodando a aplicação na porta 3001');
});