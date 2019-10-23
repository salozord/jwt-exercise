let config = require( '../config' );
let conn = require('../utilities/dbconn');
let security = require('../utilities/security');

class HandlerUsers {

    getAll(req, res) {
        let puedeAcceder = req.decoded.rol === config.roles.ADMIN || req.decoded.rol === config.roles.SENIOR || req.decoded.rol === config.roles.JUNIOR;
        if(puedeAcceder) {
            conn.then( client => {
                client.db().collection(config.USUARIOS).find({}, { _id: 0, password: 0, username: 1, rol: 1})
                .toArray((err, data) => {
                    if (err) {
                        res.status(500).json({
                            succes: false,
                            message: `An error occured while retrieving data: ${err}`
                        });
                    }
                    else {
                        res.status(200).json({
                            success: true,
                            message: 'data retrieved successfully!',
                            data: data
                        });
                    }
                });
            });
        }
        else {
            res.status(403).json({
                success: false,
                message: 'Your role is not allowed to do this request'
            });
        }
    }

    getOne(req, res) {
        let usr = req.params.id;
        let puedeAcceder = req.decoded.rol === config.roles.ADMIN || req.decoded.rol === config.roles.SENIOR || req.decoded.rol === config.roles.JUNIOR;
        if(puedeAcceder) {
            conn.then( client => {
                client.db().collection(config.USUARIOS).findOne(
                    { username: usr },
                    (err, r) => {
                        if (err) {
                            res.status(500).json({
                                succes: false,
                                message: `An error occured while retrieving data: ${err}`
                            });
                        }
                        else {
                            res.status(200).json({
                                success: true,
                                message: 'data retrieved successfully!',
                                data: r
                            });
                        }
                    }
                );
            });
        }
        else {
            res.status(403).json({
                success: false,
                message: 'Your role is not allowed to do this request'
            });
        }
    }

    insertOne(req, res) {
        let puedeAcceder = req.decoded.rol === config.roles.ADMIN || req.decoded.rol === config.roles.SENIOR;
        if(!req.body.username || !req.body.password || !req.body.rol) {
            res.status(400).json({
                success: false,
                message: 'Wrong data, please check your request'
            });
        }
        else if(puedeAcceder) {
            let usuario = {
                username: req.body.username,
                password: security.esconder(req.body.password),
                rol: req.body.rol
            };
            conn.then( client => {
                client.db().collection(config.USUARIOS).insertOne(
                    usuario,
                    (err, r) => {
                        if (err) {
                            res.status(500).json({
                                succes: false,
                                message: `An error occured while inserting data: ${err}`
                            });
                        }
                        else {
                            res.status(200).json({
                                success: true,
                                message: 'data inserted successfully!',
                                data: r.ops[0]
                            });
                        }
                    }
                );
            });
        }
        else {
            res.status(403).json({
                success: false,
                message: 'Your role is not allowed to do this request'
            });
        }
    }

}

module.exports = HandlerUsers;