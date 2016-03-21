var express = require('express');
var fs = require('fs');
var router = express.Router();

/* GET résultats. */
router.get('/releves/get', function(req, res, next) {
    fs.readFile('mock/releves.json', function(err, data) {
        if (!err) {
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.parse(data));
        }
    });
});

module.exports = router;