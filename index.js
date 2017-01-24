const express = require('express');
const app = express();
const middleware = require('./log-middleware');

app.use('view engine', 'pug');

app.use(middleware);

app.get('/', (req, res) => {
    app.render('index');
});

app.get('/contato', (req, res) => {
    fs.readFile('./views/contato.html', 'UTF-8', (err, content) => {
        if (err) res.status(500).send('Ocorreu um erro');

        res.status(200).send(content);
    });
});

app.get('/sobre', (req, res) => {
    fs.readFile('./views/sobre.html', 'UTF-8', (err, content) => {
        if (err) res.status(500).send('Ocorreu um erro');

        res.status(200).send(content);
    });
});

app.listen(3001, () => {
    console.log('Você está rodando a aplicação na porta 3001');
});