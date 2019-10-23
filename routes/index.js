var express = require('express');
var router = express.Router();

var HandlerGenerator = require("../handlers/handlegenerator.js");
var middleware = require("../middleware.js");

HandlerGenerator = new HandlerGenerator();

/* GET home page. */
router.get('/', HandlerGenerator.index);
router.post('/login', HandlerGenerator.login);
router.post('/registro', HandlerGenerator.registro);

module.exports = router;
