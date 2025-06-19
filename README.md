# apis-grupo-6

Figma: https://www.figma.com/design/1xDcN1qLUAf701NGl0AcaY/EntrenApp?node-id=0-1&p=f&t=xYvQJVp16b0jF6j0-0

## Pasos para correr el servidor:

1) ejecutar: `npm install`

2) correrlo en modo dev: `npm run dev`

- opcional para correrlo en modo produccion: `npm run start`

3) Duplicar el archivo `.env.template` renombrarlo a `.env` y agregarle las variables de entorno

## Ver Swagger:

mientras el servidor este corriendo abrir `http://localhost:3000/api/docs/` en el navegador

## Usar Token

1) Hacer Login con un usuario `localhost:3000/api/users/login` en la response vamos a ver el token

2) Copiar el token del login para agregarlo como metodo de auth en postman
 - Auth > Auth type > Bearer Token > pegar el token en el input