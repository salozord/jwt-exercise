let jwt = require( 'jsonwebtoken' );
let config = require( '../config' );
let conn = require('../utilities/dbconn');
let security = require('../utilities/security');

// Clase encargada de la creación del token
class HandlerGenerator {

  login( req, res ) {
    // Extrae el usuario y la contraseña especificados en el cuerpo de la solicitud
    let username = req.body.username;
    let password = req.body.password;
    
    // Si se especifico un usuario y contraseña, proceda con la validación
    // de lo contrario, un mensaje de error es retornado
    if( username && password ) {
        // Se actualiza el password a como está en la base de datos
        password = security.esconder(password);
        
        // Se verifica que existan en la base de datos
        security.existeUsuario(username, password)
        .then( doc => {
            if(!doc) {
                res.status( 403 ).json({
                    success: false,
                    message: 'Incorrect username or password'
                });
            }
            // Si los usuarios y las contraseñas coinciden, proceda con la generación del token
            else {

                // Se genera un nuevo token para el nombre de usuario el cuál expira en 24 horas
                let token = jwt.sign( { username: doc.username, rol: doc.rol },
                config.secret, { expiresIn: '24h' } );
                
                // Retorna el token el cuál debe ser usado durante las siguientes solicitudes
                res.status(200).json({
                    success: true,
                    message: 'Successfully added token to user',
                    token: token
                });
            } 
        })
        .catch( err => {
            res.status( 500 ).json({
                success: false,
                message: `Authentication failed! There was an error during the process: ${err}`
            });
        });
    } else {

      // El error 400 corresponde a Bad Request de acuerdo al estándar HTTP
      res.status( 400 ).json({
        success: false,
        message: 'Authentication failed! Please check the request'
      });
    }
  }

  index( req, res ) {
    // Retorna una respuesta exitosa con previa validación del token
    res.status(200).json({
      success: true,
      message: 'Index page'
    });
  }

  registro( req, res ) {
    // Extrae el usuario y la contraseña especificados en el cuerpo de la solicitud
    let username = req.body.username;
    let password = req.body.password;
    let rol = req.body.rol;

    if( username && password && rol) {
        password = security.esconder(password);
        security.existeUsuario(username, password)
        .then( doc => {
            if(!doc) {
                conn.then( client => {
                    client.db().collection(config.USUARIOS).insertOne(
                        { username: username, password: password, rol: rol },
                        (err, r) => {
                            if (err) {
                                res.status(500).json({
                                    success: false,
                                    message: `Error while inserting new user into the database: ${err}`
                                });
                            }
                            else {
                                res.status(200).json({
                                    success: true,
                                    message: 'Successfully created new user',
                                    data: {
                                        username: username,
                                        rol: rol
                                    }
                                });
                            }
                        }
                    );
                });
            }
            else {
                res.status( 403 ).json({
                    success: false,
                    message: 'User already registered, please log in!'
                });
            }
        })
        .catch( err => {
            res.status( 500 ).json({
                success: false,
                message: `Authentication failed! There was an error during the process: ${err}`
            });
        });
    }
    else {
        res.status( 400 ).json({
            success: false,
            message: 'Authentication failed! Please check the request'
        });
    }
  }
}

module.exports = HandlerGenerator;