# jwt-exercise
Express + MongoDB backend with an example of JWT authentication.

## Funcionamiento
Este ejercicio provee autenticación a usuarios de 3 distintos roles, a una aplicación donde se encuentra `inventario` y `usuarios`. Los roles 
que pueden tener los usuarios son:

1. JUNIOR -> A este rol se le da el acceso más bajo, que es solo lectura de la colección `usuarios`.
2. SENIOR -> A este rol se le da el acceso medio, que es lectura de la colección `usuarios` e `inventario` y escritura en la colección `usuarios`.
3. ADMIN -> A este rol se le da acceso total, tanto lectura como escritura de la colección `usuarios` e `inventario` (creación al realizar escritura en inventario).

Es importante resaltar que cada uno de los roles son creados simplemente como ejemplo. **El usuario ADMIN es el único capaz de borrar usuarios y productos del inventario**.
La aplicación en su totalidad verifica que la información que se ingrese  en las peticiones siempre esté completa y además verifica los accesos según los permisos designados a cada rol.

## Deployment
Para desplegar, se deben ejecutar las siguientes líneas en `bash/cmd`:
```
$ npm install
$ npm start
```
