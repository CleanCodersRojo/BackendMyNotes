##Diagrama de Arquitectura Hexagonal
- Diagrama de Modelo de Dominio
![MODELO DE DOMINIO - Página 2](https://github.com/CleanCodersRojo/BackendMyNotes/assets/74473129/9136d983-366f-4bff-b6d6-873528fd5742)

- Aplicacion e Infraestructura
![MODELO DE DOMINIO - Copia de Página 2](https://github.com/CleanCodersRojo/BackendMyNotes/assets/74473129/ec05bd05-591e-4205-832c-f0594433edf3)


## Installation

```bash
$ npm install

#Dependencies
$ npm install @nestjs/common
$ npm install @nestjs/core
$ npm install uuid
$ npm install @types/uuid -D
$ npm install @nestjs/testing
$ npm install @nestjs/mongoose
$ npm install class-validator class-transformer
$ npm install --save-dev @types/mocha
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Commits relevantes
- De Luis(segun la lista de tareas en el Trello):
  2. lote de commits para la tarea 2. Crear nota:
    - Merge #6 Funcionalidad CrearNota
    - Validaciones de Crear Nota
    - Nuevo generador UUID 
    - Servicio de Applicacion Crear Nota
  3. Eliminacion de dependencias no utilizadas
    - (dentro de este push hay 2 commits, el primero es la inclusion de la tarea 3. Eliminar notas)
  4. Modificar Nota
  28. lote de commits para el manejo de imagenes en el cuerpo de la nota:
    - Cambio en la forma del cuerpo v1
    - Refactorizacion del Cuerpo 
    - Refactorizacion de Fabricas del Cuerpo
    - Validacion del Cuerpo de la nota v1
  7. Búsquedas de notas
  24. Establecer Logs para Servicios de la Nota 

- Adicionales:
    - Esqueleto para Command y Query side. 


## Referencias del proyecto
- Libro "Patterns, Principles and Practices of Domain-Driven Design", escrito por Scott Millett
    - Referente para la implementacion del patron memento junto con el repositorio
- Libro "CQRS by example", escrito por Carlos Buenosvinos, Christian Soronellas, Keyvan Akbary
    - Referencia para el diseño del query side para los servicios de búsqueda de notas.
- Tutorial en youtube: "Nestjs & Mongodb, REST API" de link: https://www.youtube.com/watch?v=jEKsD5f3Bqc&t=4246s
- Tutorial en youtube: "NESTJS base de datos ¿Como conectarnos con una base de datos mongoose ?" de link: https://www.youtube.com/watch?v=OTrGvc4bYWE&t=1132s


## Consideraciones Adicionales
- Funcionalidades faltantes en el backEnd:
    - Usuario
    - Etiquetas
    - Notificaciones Push


## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
