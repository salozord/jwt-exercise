const crypto = require('crypto');
const config = require('../config');
let conn = require('./dbconn');
const hasher = crypto.createHash('sha256');

module.exports = {
    esconder: (data) => {
        const plusSalt = data + config.salt;
        hasher.update(plusSalt);
        return hasher.digest('hex');
    },
    existeUsuario: (username, pass) => {
        return new Promise((resolve,reject)=> {
            conn.then(client => {
                client.db().collection(config.USUARIOS).findOne(
                    {username: username, password: pass}, 
                    (err, document) => {
                        if(err) reject(err);
                        else if (!document) resolve(document);
                        else resolve(document);
                    }
                );
            });
        });
    },
    existeToken: (token) => {
        return new Promise((resolve, reject) => {
            conn.then(client => {
                client.db().collection(config.USUARIOS).findOne(
                    { token: token },
                    (err, document) => {
                        if(err) reject(err);
                        else if (!document) resolve(document);
                        else resolve(document);
                    }
                );
            });
        });
    }
};