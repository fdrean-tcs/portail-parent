var express = require('express');
var router = express.Router();

/* POST contact. */
router.post('/send', function(req, res, next) {
    console.log(req.body.contact);
    res.send();
});

module.exports = router;