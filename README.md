## Proyecto de inicio de sesión, registro y recuperación de constraseña via email

# DESCRIPCIÓN DEL PROYECTO
El proyecto tiene como base en backend node, express y mongodb. En el frontend con React + js.
Consiste en un módulo web que ofrece las siguientes funcionalidades:

1. Inicio de sesión: Validación de credenciales del usuario y generación de un
JWT para autorización. Los usuarios pueden autenticarse ingresando su
nombre de usuario y contraseña. Si las credenciales son correctas, se genera
un JWT que se utiliza para autorizar el acceso a rutas protegidas dentro de la
aplicación.

3. Recuperación de contraseña: Envío de un enlace de recuperación al correo
electrónico ingresado por el usuario en caso de olvido de la contraseña. Si un
usuario olvida su contraseña, puede solicitar un enlace de recuperación
ingresando su correo electrónico. Se envía un enlace de recuperación a su
correo, el cual incluye un token de un solo uso que expira a los 7 minutos de
haberse generado.

3. Actualización de contraseña: Permitir al usuario modificar su contraseña a
través del enlace de recuperación. Al hacer clic en el enlace de recuperación,
el usuario es redirigido a un formulario donde puede ingresar una nueva
contraseña. Esta contraseña se actualiza en la base de datos, permitiendo al
usuario iniciar sesión nuevamente con sus nuevas credenciales.
