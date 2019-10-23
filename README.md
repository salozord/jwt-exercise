# jwt-exercise
Express + MongoDB backend with an example of JWT authentication.

## Funcionamiento
Este ejercicio provee autenticación a usuarios de 3 distintos roles, a una aplicación donde se encuentra `inventario` y `usuarios`. Los roles 
que pueden tener los usuarios son:

1. JUNIOR -> A este rol se le da el acceso más bajo, que es solo lectura de la colección `usuarios`.
2. SENIOR -> A este rol se le da el acceso medio, que es lectura de la colección `usuarios` e `inventario` y escritura (actualización) de la 
colección `usuarios`.
3. ADMIN -> A este rol se le da acceso total, tanto lectura como escritura de la colección `usuarios` e `inventario` (creación y actualización 
eb escritura).

Es importante resaltar que cada uno de los roles son creados simplemente como ejemplo.

## Deployment
Para desplegar, se deben ejecutar las siguientes líneas en `bash/cmd`:
```
$ npm install
$ npm start
```
