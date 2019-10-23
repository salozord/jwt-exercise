var express = require('express');
var router = express.Router();

var HandlerUsers = require("../handlers/handlerusers");
var middleware = require("../middleware");

HandlerUsers = new HandlerUsers();

router.get('/', middleware.checkToken, HandlerUsers.getAll);
router.post('/', middleware.checkToken, HandlerUsers.insertOne);
router.get('/:id', middleware.checkToken, HandlerUsers.getOne);
router.delete('/:id', middleware.checkToken, HandlerUsers.deleteOne);

module.exports = router;
