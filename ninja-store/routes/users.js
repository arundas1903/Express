var express = require('express');
var router = express.Router();

var mongo = require('mongoskin')
var db = mongo.db('mongodb://localhost:27017/ninja_user');

router.post('/sign_up', function(req, res, next) {
    username = req.body.username;
    password1 = req.body.password1;
    password2 = req.body.password2;
    if (username && password1 && password2){
        if (password1 == password2) {
            existing_user = db.collection('users').find({username: username}).
            toArray(function(err, result) {
                if (result.length){
                    res.render('sign_up', {errors: 'Username already taken'})   ;
                }
                else {
                    db.collection('users').insert({
                        username: username,
                        password: password1
                    });
                    req.session.username = username;
                    res.redirect('/store/');  
            }});
        }
        else {
            res.render('sign_up', {errors: 'Passwords did not match'});
        }
    }
    else{
        res.render('sign_up', {errors: 'All fields are required'})
    }
  
});

router.get('/sign_up', function(req, res, next) {
  res.render('sign_up', {});
});

router.post('/login', function(req, res, next) {
    username = req.body.username
    password = req.body.password
    if (username && password){
        user = db.collection('users').find({username: username, password: password}).
        toArray(function(err, result) {
            if (result.length){
                res.render('login', {errors: 'Invalid username or password'})   
            }
            else {
                res.redirect('/store/');  
        }});
    }
    else{
        res.render('login', {errors: 'Invalid username or password'})
    }
});

router.get('/login', function(req, res, next) {
  res.render('login', {});
});

module.exports = router;
