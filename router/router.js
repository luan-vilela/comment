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
                res.send('OPS. ERRO' + err);
                return;
            }
            if(result != null)
                result.countWhisper = result.whisper.length;
            else{
                result = {
                    comment: "Nothin' On You",
                    countWhisper: 0,
                    whisper: [],
                    like: 0,
                    dislike: 0
                }
            }
                

            console.log(result)
            res.render('home', {result: result});
        })

        
    })

    
});

router.post('/comment', (req, res) => {
    if(req.body.comment.length > 3){
        let newComment = {
            comment: req.body.comment,
            like: 0,
            dislike: 0,
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

router.use('/statuswhisper/:num', (req, res) => {
    
    if(req.params.num === "like"){

        Comment.findById(req.query.id).then((objReturn) => {
            objReturn.like = objReturn.like + 1;
            console.log(objReturn)
            Comment(objReturn).save();
        }).catch((err) => {
            console.log('erro like: ' + err);
        });
    }
    else if(req.params.num === "dislike"){
        Comment.findById(req.query.id).then((objReturn) => {
            objReturn.dislike = objReturn.dislike + 1;
            console.log(objReturn)
            Comment(objReturn).save();
        }).catch((err) => {
            console.log('erro dislike: ' + err);
        });
    }
    else if(req.params.num === "whisper"){
        Comment.findById(req.query.id).then((objReturn) => {
            objReturn.whisper.push(req.query.whisper)
            console.log(objReturn)
            Comment(objReturn).save();
        }).catch((err) => {
            console.log('erro whisper: ' + err);
        });
    }

})

router.get('/about', (req, res) => {
    res.render('about');
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

module.exports = router;