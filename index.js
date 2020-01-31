const express = require('express');
const handlebars = require('express-handlebars')
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();


// Configurações constantes
const DB = 'mongodb://127.0.0.1/database';



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


/*
 *  ARQUIVOS ESTÁTICOS
*/
    app.use(express.static(__dirname + '/public'));

/**
 * ROTAS
 */

app.get('/', (req, res) => {
    res.render('home')
});


app.post('/comment', (req, res) => {
    
    let comment = {
        comment: req.body.comment,
        ip: req.ip
    }

    const Comments = require('./models/Comment');

    Comments.save(comment).then((resComment) => {
        console.log('Comentário salvo', resComment.comment)
    }).catch((err) => {
        console.log('Erro: ' + err);
    })

    
    app.redirect('/')

});




app.listen(3000, () => {
    console.log("Servidor iniciado!")
})