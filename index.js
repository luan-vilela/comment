const express = require('express');
const handlebars = require('express-handlebars')
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const router = require('./router/router');
const db = require('./config/db');
const app = express();


// Configurações constantes
const DB = db.mongoURI;



/*  
 *  Configuração
*/
    // HANDLEBARS
    app.engine('handlebars', handlebars({defaultLayout: 'main'}));
    app.set('view engine', 'handlebars');

    // BODY PARSER
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());

    // MONGOOSE
    mongoose.connect(DB, {useNewUrlParser: true})
        .then(() => {
            console.log("Mongo conectado!");
        }).catch((err) => {
            console.error("Erro em mongodb: " + err);
        });
       mongoose.set('useFindAndModify', false);
       mongoose.set('useUnifiedTopology', true);

/*
 *  ARQUIVOS ESTÁTICOS
*/
    app.use(express.static(__dirname + '/public'));

/**
 * ROTAS
 */
    app.use('/', router)



let port = process.env.PORT ||3000;

app.listen(port, () => {
    console.log("Servidor iniciado!")
})