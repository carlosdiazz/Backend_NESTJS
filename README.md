<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

## Description

Este es de pruebas con NEST

## Installation

```bash
$ pnpm install
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

## License

@Carlosdiazz

### Comandos Basicos NestJs
** Coloco --flat si no quiero crear una carperta **

- GENERAR UN PROYECTO NESTJS: nest new NAMA
- GENERAR UN CRUD:  nest g resource users
- GENERAR UN MODULO: nest g mo
- GENERAR CONTROLADORES: nest g co controllers/NAME
- GENERAR SERVICIOS: nest g s services/NAME
- GENERAR MI PIPE PROPIO: nest g pipe common/NAME
- GENERAR UN GUARDIAN: nest g gu auth/guards/NAME --flat
- GENERAR un DECORADOR: nest g d auth/decorators/nombre

### Docker
- docker-compose up -d

### Generar Migraciones
- npm run typeorm:generate-migration --name=CreatePost

### Correr la migracion
- npm run typeorm:run-migrations

### Generar un revert de la migracion
- npm run typeorm:revert-migration

### Generar Seed
- npm run seed:config
- npm run seed:run

### Bibliotecas Usadas
- pnpm i class-validator #Validar datos
- pnpm i class-transformer #tranfosmtar clases
- pnpm i @nestjs/mapped-types #
- pnpm i @nestjs/config #Usar variables de entornos
- pnpm i pg
- pnpm i --save @nestjs/typeorm typeorm pg mysql2
- pnpm i mongo
- pnpm i @nestjs/mongoose mongoose
- pnpm i typeorm-seeding
- pnpm i bcrypt
- pnpm i -D @types/bcrypt
- pnpm i nestjs-mongoose-exclude
- pnpm i --save @nestjs/passport passport passport-local
- pnpm i --save @nestjs/jwt passport-jwt
- pnpm i --save-dev @types/passport-jwt

### Correrlo en diferentes Entornos
NODE_ENV=dev pnpm run dev