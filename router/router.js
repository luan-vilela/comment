const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
require('../models/Comment');
const Comment = mongoose.model('Comment');


router.get('/', (req, res) => {

    Comment.countDocuments({}, (err, count) => {

        if(err){
            res.send('OPS. ERRO');
            return;
        }

        //gerar número aleatório
        let random = Math.floor(Math.random() * count)
        
        Comment.findOne().skip(random).exec((err, result) => {
            if(err){
                res.send('OPS. ERRO');
                return;
            }
            console.log(result)
            res.render('home', {result: result});
        })

        
    })

    
});

router.get('/pt', (req, res) => {
    
    Comment.countDocuments({}, (err, count) => {

        if(err){
            res.send('OPS. ERRO');
            return;
        }

        //gerar número aleatório
        let random = Math.floor(Math.random() * count)
        
        Comment.findOne().skip(random).exec((err, result) => {
            if(err){
                res.send('OPS. ERRO');
                return;
            }
            console.log(result)
            res.render('homePT', {result: result});
        })

        
    })
});


router.post('/comment', (req, res) => {
    if(req.body.comment.length > 3){
        let newComment = {
            comment: req.body.comment,
            ip: req.ip
        }
        console.log(req.ip);
        new Comment(newComment).save().then((sav) => {
            console.log("salvo com sucesso! " + sav.comment);
        }).catch((err) => {
            console.log("erro: " + err);
        })
        console.log('é maior q 3')
    }
    res.redirect('/')
});


module.exports = router;