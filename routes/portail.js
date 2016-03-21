var express = require('express');
var fs = require('fs');
var router = express.Router();

var user = {
    firstname: "Mike",
    name: "Heck",
    email: "mike.heck@themiddle.com",
    profil: "p"
};

var navigation = [];

/* GET menu navigation. */
router.get('/user/get', function(req, res, next) {
    res.setHeader('Content-Type', 'application/json');
    res.send(user);
});

var sendavigation = function(res, profil) {
    res.setHeader('Content-Type', 'application/json');
    res.send(navigation[profil]);
};

var readJsonNavigation = function(res, profil) {
    fs.readFile('config/navigation_' + profil + '.json', function(err, data) {
        if (!err) {
            navigation[profil] = JSON.parse(data);
            sendavigation(res, profil);
        }
    });
};

/* GET menu navigation. */
router.get('/navigation.json', function(req, res, next) {
    var profil = user ? user.profil : "_";
    
    if (!navigation[profil]) {
        readJsonNavigation(res, profil);
    } else {
        sendavigation(res, profil);
    }
});

module.exports = router;