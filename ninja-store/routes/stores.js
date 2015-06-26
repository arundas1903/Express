var express = require('express');
var router = express.Router();

var mongo = require('mongoskin')
var db = mongo.db('mongodb://localhost:27017/ninja_user');

router.get('/', function(req, res, next){
    // store the username as a session variable
    if (req.session.username){
        res.send("You are logged in")        
    }
    else{
        res.send("Not logged in. Invalid permission")            
    }
    // redirect the user to homepage
})

module.exports = router;