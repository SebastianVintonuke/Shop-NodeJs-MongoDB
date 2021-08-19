// --- Online Shop --- //

// --- Acerca del proyecto --- //

Es un proyecto basico para la integracion de diferentes tecnologias como NodeJs y MongoDB y algunos modulos como express, handlebars, session, mongoose, etc.

Consiste en una tienda online que carga y organiza sus productos desde una base de datos.
Permite a un usuario registrarse y gestionar un carrito de compras personal desde su cuenta.
Ademas incluye otras funcionalidades como envio de formularios de contacto.

// --- Dependencias --- //

bcryptjs: ^2.4.3
connect-flash: ^0.1.1
express: ^4.17.1
express-handlebars: ^5.3.3
express-session: ^1.17.2
method-override: ^3.0.0
mongoose: ^5.13.5
passport: ^0.4.1
passport-local: ^1.0.0

// --- Dependencias de Desarrollo --- //

nodemon: ^2.0.12

// --- Inicio --- //

npm i express express-handlebars express-session method-override mongoose passport passport-local bcryptjs connect-flash
instala las dependencias

npm i nodemon -D
instala las dependencias de desarrollo

npm run start
inicializacion normal

npm run dev
inicializacion por nodemon (permite refrescar el servidor al aplicar cambios, ideal para el desarrollo)

// --- Comandos --- //

addNewProduct
Para agregar productos por linea de comandos.
Igualmente se recomienda añadir directamente a la DB.

close
Cierra la entrada por linea de comandos.

// -- Mi Nombre -- //
// -- Sebastian M. Vintoñuke -- //

// -- Contacto -- //
// -- sebastian.m.vintonuke@gmail.com -- //
// -- https://github.com/SebastianVintonuke -- //
// -- https://www.linkedin.com/in/sebastian-vintoñuke-7ab06a161/ -- //
