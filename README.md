# Audiovisuales

## Get Started

### 1. Requisites

- [NodeJs](https://nodejs.org/en/)
- [NPM](https://npmjs.org/) - Node package manager
- [MySQL](https://www.mysql.com/downloads/) - Relational database management system (RDBMS)

### 2. Installation

**ℹ Note:** By using the remote database credentials, you don't need to install anything else. 

To have your own database locally, install MySQL from [here](https://dev.mysql.com/downloads/windows/installer/8.0.html) 

Execute ./database/db.sql into the project database:

 ```bash
 mysql -u username -p database_name < database/db.sql
 ```

Or optionally use Docker to initialize MySQL, it automatically execute the database sql file.

```
docker compose up
```

On the command prompt run the following commands:

**Windows** 
``` 
 $ git clone 
 $ cd audiovisuales
 $ copy .env.example .env (edit it with your secret key and database information)
 $ npm install
```

 **Mac**
``` 
 $ git clone 
 $ cd audiovisuales
 $ cp .env.example .env (edit it with your secret key and database information)
 $ npm install
```

 Finally, start and build the application:
 
```
 $ npm run build (For development)
 $ npm run build:prod (For production)
```

List of NPM Commands:
 
  ```
  $ npm run lint       # linting
  $ npm run format     # format
  $ npm run start      # server only
  $ npm run clean      # remove dist, build and node_modules folder and install dependencies
 ```

Note: Before commit, the staged files will be formatted.

### 3. Usage

URL : http://localhost:3000/

### 4. Recommendations
- Use the alias `@` for absolute imports
- Use Visual Studio Code since there is a config for absolute import autocomplete
- Install ESLint, Prettier and npm Intellisense extensions on VSCODE 

### 5. Useful Links
- Web framework for Node.js - [Express](http://expressjs.com/)
- JSON Web Tokens(jwt) - [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
- Object schema validation (Server)  - [Joi](https://www.npmjs.com/package/joi)
- Object schema validation (Client)  - [yup](https://www.npmjs.com/package/yup)
- JavaScript library for building user interfaces - [React](https://facebook.github.io/react/)
- A React component library implementing Google's Material Design - [Material-UI](https://material-ui-1dab0.firebaseapp.com/)
- State Management library - [Zustand](https://github.com/pmndrs/zustand)
- Declarative routing for React - [React-Router](https://reacttraining.com/react-router/)
- Promise based HTTP client - [Axios](https://github.com/mzabriskie/axios)
- Forms - [Formik](https://formik.org/docs/overview)
- Environment configuration - [dotenv](https://www.npmjs.com/package/dotenv)
- Code linting tool - [ESLint](http://eslint.org/)
- Code formatter - [Prettier](https://www.npmjs.com/package/prettier)


### 6. Workflow

-  [docs/gitflow.md](./docs/gitflow.md)
