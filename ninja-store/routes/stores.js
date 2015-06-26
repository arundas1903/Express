var express = require('express');
var router = express.Router();

var mongo = require('mongoskin')
var db = mongo.db('mongodb://localhost:27017/ninja_user');

router.get('/', function(req, res, next){
	res.render('home', {title: 'Ninja Store'})
})

router.post('/', function(req, res, next){
	username = req.body.username || 'Anonymous';
    // store the username as a session variable
    req.session.username = username;
    db.collection('users').insert({username: username}, function(err, result){
        if (err) throw err;
        if (result) console.log('Added!');
    });
    db.collection('users').find().toArray(function(err, result) {
        if (err) throw err;
        console.log(result);
    });
    // redirect the user to homepage
    res.redirect('/');
})

module.exports = router;