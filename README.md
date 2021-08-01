![logo](https://github.com/hamada-j/wellnesstg/blob/main/wellnesstg-electric/src/assets/images/log.png)

# wellnesstg

Wellnesstg se trata de una prueba de capacidad técnica, que consisten en desarrollar una aplicación que registre datos de facturación eléctrica por medio de un archivo .csv, una tabla que realiza CRUD en la misma y un compnente donde se presenta la informacion en forma de graficas, zonas de distribucion, etc.

El proyecto consta de dos carpetas (wellnesstg-electric frontend y wellnesstg-restful-api back end)

```
wellnesstg
 |
 +-- wellnesstg-electric
     |
     +-- src
 +-- wellnesstg-restful-api
     |
     +-- more
|
.gitignore
README.md
```

## Instrucciones para cargar la app

Clonar el proyecto desde la direccion en [Github](https://github.com/hamada-j/wellnesstg) o descargar como zip.

## wellnesstg-restful-api

Una vez clonado el proyecto o descomprimido, navegamos en el proyecto a la carpeta de 'wellnesstg-restful-api'

```
cd wellnesstg
cd wellnesstg-restful-api
```

Dentro de la carpeta de 'wellnesstg-restful-api' instalamos todas la dependencia necesaria por medio del gestor de proyectos. (recomiendo/necesario que se use la ultima version estable de NodeJS que a dia de hoy es v14.17.3).

```
npm install
```

Este comando creara un directorio node_modules y package-lock.json.

Añadimos el alrchivo '.env' para poder conctar con MongoDB Atlas.

```
wellnesstg
 |
 +-- wellnesstg-electric
     |
     +-- src
 +-- wellnesstg-restful-api
     |
     +-- fixtures
          |
          --- pruebas.csv
     |
     +-- more
     |
     --- .env
|
.gitignore
README.md
```

### Test

Una vez completados estos pasos, comprobamos que el archivo 'pruebas.csv' esta en la carpeta 'fixtures'. Esto nos permitira lanzar las puebas unitarias de test sobre los endpoint CRUD con las librerias Jest-Supertest.
Los test diponen de su propia Coleccion en la base de datas, por tanto los test se realizan sin tener efecto sobre los datos que se encuentran en backend de la app, para ello diponen de un model identico al modelo en produccion pero que apunta a la coleccion de Test.

Situados en la carpeta de 'wellnesstg-restful-api':

```
npm run test
```

para ver las opciones de test usamos en el test

```
w
```

`ctrl + c ` o `command + c` para salir dependiendo del SO.

Los test realizaran pruebas exportando el archivo, tranformado su información y realizando las purebas CRUD necesarias para asegurar un correcto fucionamiento del backend. Todas pruebas unitarias esta en la carpeta 'test'.

Para levantar el servidor, en la carpeta de 'wellnesstg-restful-api' por el comando:

```
npm run start
```

![backend](https://github.com/hamada-j/wellnesstg/blob/main/wellnesstg-electric/src/assets/images/backend.png)

### sobre wellnesstg-restful-api

Backend con [NodeJS](https://nodejs.dev/) donde se genera un servidor que gestiona la app de [ExpresJS](https://expressjs.com/) diseñada con el modelo de rest ful api en abase a famework que es bastante robusto. Distribuido en carpetas de diversas fucionalidades, independientes exportables. La base de datos elegida es MongoDB y su servicio Atlas que permite obtgener y almacenar la informacion en la nube. En la API hay dos formas de conectar utilizando el paquete 'MongoCliente' o en este caso la libreria 'Mongoose' que permite implementar un esquema y una docuementacion excelente. Para la gestion de CORS, Parseo, logs, variables de entorno, etc se recurre a paquetes NPM de buena reputacion y numero de descargas alto por la comunidad.

La libreia 'json-2-csv' y 'csvtojson' para convertir de CSV a JSON y viceversa, apesar de que se puede programar de forma directa con NodeJS, se opta por ambas librerias para mantener un codigo limpio y sencillo.

## WellnesstgElectric

Al utizar el stack MEAN con [Angular CLI](https://github.com/angular/angular-cli) version 12.1.3, que a dia de hoy es la ultima versión estable de Angular, ES NECESARIO DISPONER DE NODEJS en una determiada versión y [Typescript](https://www.typescriptlang.org/).
Al clonar el proyecto extrañaras la carpeta del Protractor, pero la verison +12 de Angular ya no la incluye [stackoverflow](https://stackoverflow.com/questions/67620400/new-angular-project-does-not-include-e2e-folder)

```
The Angular CLI requires a minimum Node.js version of either v12.14 or v14.15.

Please update your Node.js version or visit https://nodejs.org/ for additional instructions.
```

|Angular CLI| Angular | NodeJS |TypeScript | RxJS Version |
|12.1.x |12.1.x |12.14.x/14.15.x or later minor|4.2.x/4.3.x|6.6.x |

info via
[stackoverflow](https://stackoverflow.com/questions/60248452/is-there-a-compatibility-list-for-angular-angular-cli-and-node-js)
Comprobamos las verisones de las tecnologias:

```
node -v
```

```
ng version
```

```
tsc -v
```

Una vez comprobamos las verisones, navegamos a la carpeta de 'wellnesstg-electric' y con el comando siguiente instalamos todas las dependencia para el fontend:

```
npm install
```

Instaladas las dependencia por el gestor [NPM](https://www.npmjs.com/), podemos lazar la App. Para ello en la carpeta de 'wellnesstg-electric' con el comando siguiente:

```
ng serve
```

visitando la url `http://localhost:4200/` o con la flag -o para abrir una ventana en el browser

```
ng serve -o
```

![frontend](https://github.com/hamada-j/wellnesstg/blob/main/wellnesstg-electric/src/assets/images/frontend.png)

### sobre wellnesstg-electric

La app que esta construida con Angualar un robusto Framework soportado por [Google](https://www.google.com/), que permite diseñar frontend elegantes. Basado en [Typescript](https://www.typescriptlang.org/) permite escribir un lenguaje que sera copilado y tradcucido a Javascript bastante typado evitando errores en declaracioes, funciones y classes con una capa de typos muy solida.

Para el diseño se recurre a [Angular Material](https://material.angular.io/) basado en [Material Design](https://material.io/design) y que al estar intimamente relacionado con el Framework encaja perfectamente a nivel de tablas, botones, elementos estructurales, etc.

Para realizar una muestara grafica de la información del archivo .csv, elemento de la base de datos, etc se recurre a una popular y exclente libreria, [Highcharts](https://www.highcharts.com/) que permite por medio de un codigo simple y reutilizable exponer los datos de forma visula y sencilla de entender.

En el front, y para no enviar posible información comprometida, se recurre a un libreria [ngx-papaparse](https://www.npmjs.com/package/ngx-papaparse) para transformar el .csv en json.

El logo esta diseñado con [Adobe](https://spark.adobe.com/).

Estructura:

- Subir el archivo .csv, solo acepta archivos csv, y que cumpalan el modelo.

- Formulario de insertar registro / editar

- Tabla con los elementos con sitema de filtardo, posibilidad de editar propiedades de las filas y dos botones para editar en zona superior o borrar con un popup de confirmación.

- Graficas de los datos en la base de datos, por clientes, por contratación, por ciudades y cantidad total de potencia y consumo.

## Docker

El proyecto dispone de [Docker](https://www.docker.com/) que permite crear tanto la app como el sevidor en contenedores Docker. Y con [Docker-Compose](https://docs.docker.com/compose/) orquestar la comunicacion y el arracando de los contenedores. La base de datos al estar en MongoDB Atlas no es necesario crear un contendor para ello. Es necesario tener instalado Docker para arracar el proyecto.

Comrobamos instalcion y version de Docker:

```
docker version
```

(Es recomendable disponer del [Dashboard](https://docs.docker.com/desktop/dashboard/))

Situados en la carpeta de 'wellnesstg', donde esta el archivo 'docker-compose.yml' con el comando;

```
docker-compose up
```

Esto llevara unos minutos, implica la instalacion de las dependencies, levantar los contenedores y orquestar la comunicación. 'Compiled successfully' indiaca que ya es posible interactruar con al App en el `http://localhost:4200/`.

## CircleCI

El backend dipone de pipe de integración continua [CircleCI](https://circleci.com/) que cada vez que se realiza un cambio sobre la rama 'main' pasa los test e informa con un email de los resultado.

## Dependencia

Backend

```javascript
"dependencies": {
    "body-parser": "^1.19.0",
    "cors": "^2.8.5",
    "csvtojson": "^2.0.10",
    "dotenv": "^8.2.0",
    "express": "^4.17.1",
    "express-validator": "^6.9.2",
    "json-2-csv": "^3.14.1",
    "mongodb": "^3.6.10",
    "mongoose": "^5.11.7",
    "morgan": "^1.10.0"
  }
```

Frontend

```javascript
"dependencies": {
    "@angular/animations": "~12.1.0-",
    "@angular/cdk": "^12.1.3",
    "@angular/common": "~12.1.0-",
    "@angular/compiler": "~12.1.0-",
    "@angular/core": "~12.1.0-",
    "@angular/forms": "~12.1.0-",
    "@angular/material": "^12.1.3",
    "@angular/platform-browser": "~12.1.0-",
    "@angular/platform-browser-dynamic": "~12.1.0-",
    "@angular/router": "~12.1.0-",
    "highcharts": "^9.1.2",
    "highcharts-angular": "^2.10.0",
    "ngx-papaparse": "^5.0.0",
    "rxjs": "~6.6.0",
    "tslib": "^2.2.0",
    "zone.js": "~0.11.4"
  }
```

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## gitignore.io

- NodeJS
- MacOS
- Angular

## Demo

https://user-images.githubusercontent.com/57291487/127755026-23054379-6b21-47e4-9ea5-9a898229e0a1.mp4

Cualquier sugercia o idea es bienvenida; h.embarec@protonmail.com 🙂
