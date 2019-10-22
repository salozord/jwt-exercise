let jwt = require( 'jsonwebtoken' );
let config = require( '../config' );
let conn = require('../utilities/dbconn');
let security = require('../utilities/security');

class HandlerInventario {

    getAll(req, res) {
        let puedeAcceder = req.decode.rol === config.roles.ADMIN && req.decode.rol === config.roles.SENIOR;
        if(puedeAcceder) {
            conn.then( client => {
                client.db().collection(config.INVENTARIO).find({})
                .toArray((err, data) => {
                    if (err) {
                        res.send(500).json({
                            succes: false,
                            message: `An error occured while retrieving data: ${err}`
                        });
                    }
                    else {
                        res.send(200).json({
                            success: true,
                            message: 'data retrieved successfully!',
                            data: data
                        });
                    }
                });
            });
        }
        else {
            res.send(403).json({
                success: false,
                message: 'Your role is not allowed to do this request'
            });
        }
    }

    getOne(req, res) {
        let nombre = req.params.id;
        let puedeAcceder = req.decode.rol === config.roles.ADMIN && req.decode.rol === config.roles.SENIOR;
        if(puedeAcceder) {
            conn.then( client => {
                client.db().collection(config.INVENTARIO).findOne(
                    { name: nombre },
                    (err, r) => {
                        if (err) {
                            res.send(500).json({
                                succes: false,
                                message: `An error occured while retrieving data: ${err}`
                            });
                        }
                        else {
                            res.send(200).json({
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
            res.send(403).json({
                success: false,
                message: 'Your role is not allowed to do this request'
            });
        }
    }

    insertOne(req, res) {
        let puedeAcceder = req.decode.rol === config.roles.ADMIN && req.decode.rol === config.roles.SENIOR;
        let producto = {
            name: req.body.name,
            quantity: req.body.quantity
        };
        if(puedeAcceder) {
            conn.then( client => {
                client.db().collection(config.INVENTARIO).insertOne(
                    producto,
                    (err, r) => {
                        if (err) {
                            res.send(500).json({
                                succes: false,
                                message: `An error occured while inserting data: ${err}`
                            });
                        }
                        else {
                            res.send(200).json({
                                success: true,
                                message: 'data inserted successfully!',
                                data: r
                            });
                        }
                    }
                );
            });
        }
        else {
            res.send(403).json({
                success: false,
                message: 'Your role is not allowed to do this request'
            });
        }
    }

}

module.exports = HandlerInventario;