var express = require('express');
var router = express.Router();

var HandlerInventario = require("../handlers/handlerinventario.js");
var middleware = require("../middleware.js");

HandlerInventario = new HandlerInventario();

router.get('/', middleware.checkToken, HandlerInventario.getAll);
router.post('/', middleware.checkToken, HandlerInventario.insertOne);
router.get('/:id', middleware.checkToken, HandlerInventario.getOne);
router.delete('/:id', middleware.checkToken, HandlerInventario.deleteOne);

module.exports = router;
