# Calendar App

Proyecto creado a partir de React y Redux.

## Development steps

1. Renombrar el archivo `.env.template` por `.env`.
2. Hacer los cambios respectivos en el archivo `.env`.
3. Para levantar la aplicación en modo de desarrollo ejcutar el comando:

```
yarn dev
```

4. Para generar build de producción, ejecutar el comando:

```
yarn build
```
5. Para la creación de los archivos de Service Worker utilizar el siguiente comando (Sólo para uso con el archivo 'workbox-config.cjs' de manera predeterminada):
```
workbox generateSW workbox-config.cjs
```
6. Para la creación de los archivos de Service Worker de manera manual mediante la creación del archivo 'sw-template':
```
workbox injectManifest workbox-config.cjs
```

# Instalación y configuracion de Jest + React Testing Library

## En proyectos de React + Vite

1. Instalaciones:

```
yarn add --dev jest babel-jest @babel/preset-env @babel/preset-react
yarn add --dev @testing-library/react @types/jest jest-environment-jsdom
```

2. Opcional: Si usamos Fetch API en el proyecto:

```
yarn add --dev whatwg-fetch
```

3. Actualizar los scripts del **package.json**

```
"scripts: {
  ...
  "test": "jest --watchAll"
```

4. Crear la configuración de babel

**babel.config.js**

```
module.exports = {
    presets: [
        [ '@babel/preset-env', { targets: { esmodules: true } } ],
        [ '@babel/preset-react', { runtime: 'automatic' } ],
    ],
};
```

5. Para componentes que importen CSS, crear un archivo llamado:
   `tests/mocks/styleMock.js`

```
module.exports = {};
```

6. Opcional, pero eventualmente necesario, crear Jest config y setup:

**jest.config.js**

```
module.exports = {
    testEnvironment: 'jest-environment-jsdom',
    setupFiles: ['./jest.setup.js'],
    transformIgnorePatterns: [],

    // ModuleNameMapper sólo si ocupamos importar CSS en nuestros componentes para el testing
    moduleNameMapper: {
        '\\.(css|less)$': '<rootDir>/tests/mocks/styleMock.js',
    },
}
```

**jest.setup.js**

```
// En caso de necesitar la implementación del FetchAPI
// yarn add -D whatwg-fetch
// import 'whatwg-fetch';

// En caso de encontrar paquetes que lo requieran
// yarn add -D setimmediate
// import 'setimmediate';

// En caso de tener variables de entorno y aún no soporta el import.meta.env
// yarn add -D dotenv
// require('dotenv').config({
//     path: '.env.test'
// });

// Realizar el mock completo de las variables de entorno
// jest.mock('./src/helpers/getEnvVariables', () => ({
//     getEnvVariables: () => ({ ...process.env })
// }));
```
