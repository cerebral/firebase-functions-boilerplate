# firebase-functions-boilerplate
A boilerplate to work with firebase-functions locally

## Features

- A Firebase-Functions local workflow with ES2015 transpiling of client and functions code
- Using [Preact](https://preactjs.com/) for rendering, also server side rendering
- Serviceworker included
- Prepared for deploy on Travis
- Example express application
- Based on the **jsblog.io** project, [repo](https://github.com/cerebral/jsblog)
- ESLint prettier config

## How to start

Install deps:
`npm install`

Create a Firebase project and configure:
- **.firebaserc** - Set the name of your project (firebase console)
- **.babel.rc.define.development.js** - Insert your config for development (firebase console)

Start project:
`npm start`

Go to *localhost:3000*

## How to work with the project
`npm start` fires up two processes. A **webpack-dev-server** to build the client project and a **babel-watch** process to run the server side process. You can write ES2015 code everywhere, also in the serviceworker. The only exception is the main "functions" entrypoint (commented).

Think of the project as a typical express application, only it is running on functions when deployed.

## Deploying
Create a new Firebase project for production. Create a repo for your application and hook it up to [travis](https://travis-ci.org/). When you update your **master** branch the application is automatically deployed to Firebase.

To configure deployment, do the following:

- **.travis.yml** - Set the CI token (`firebase login:ci`)
- On Travis go to the settings and add env variables:
  - **FIREBASE_CONFIG** - Your production firebase config (Use `JSON.stringify(config).replace(/"/g, '\\"')` to make it valid as env variable)
  - **SERVICE_ACCOUNT** - Your production service config (Use `JSON.stringify(config).replace(/"/g, '\\"')` to make it valid as env variable)
  - **NODE_ENV** - production

## More help
This project is based on the **jsblog.io** project, which is open source. Please refer to [this repo](https://github.com/cerebral/jsblog) for guidance on messaging and other features. If something does not work in this project please help by creating PRs.
