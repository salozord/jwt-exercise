let config = require( '../config' );
let conn = require('../utilities/dbconn');

class HandlerInventario {

    getAll(req, res) {
        let puedeAcceder = req.decoded.rol === config.roles.ADMIN || req.decoded.rol === config.roles.SENIOR;
        if(puedeAcceder) {
            conn.then( client => {
                client.db().collection(config.INVENTARIO).find({})
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
        let nombre = req.params.id;
        let puedeAcceder = req.decoded.rol === config.roles.ADMIN || req.decoded.rol === config.roles.SENIOR;
        if(puedeAcceder) {
            conn.then( client => {
                client.db().collection(config.INVENTARIO).findOne(
                    { name: nombre },
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
        let puedeAcceder = req.decoded.rol === config.roles.ADMIN;
        
        if(!req.body.name || !req.body.quantity) {
            res.status(400).json({
                success: false,
                message: 'Wrong data, please check your request'
            });
        }
        else if(puedeAcceder) {
            let producto = {
                name: req.body.name,
                quantity: req.body.quantity
            };
            conn.then( client => {
                client.db().collection(config.INVENTARIO).insertOne(
                    producto,
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

    deleteOne(req, res) {
        let nombre = req.params.id;
        let puedeAcceder = req.decoded.rol === config.roles.ADMIN;
        if(puedeAcceder) {
            conn.then( client => {
                client.db().collection(config.INVENTARIO).deleteOne(
                    { name: nombre },
                    (err, r) => {
                        if (err) {
                            res.status(500).json({
                                succes: false,
                                message: `An error occured while deleting data: ${err}`
                            });
                        }
                        else {
                            res.status(200).json({
                                success: true,
                                message: 'data deleted successfully!',
                                data: r.result
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

module.exports = HandlerInventario;