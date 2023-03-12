 # Backend for realtime chat App

 # Local Development Setup

## Technology stack

- Node 18.12.0

## Installation

### Requirements

Before you get started, the following needs to be installed:
  * **Node** 18.12.0
  * **NPM** 8.19.2
  * **nodemon** 2.0.20
  * mongoDB

### Requirements

### Setting up the development environment

1.  make .env file in root directory
    ```bash
    SECRET_KEY= your Secret key (jwt token)
    FRONTEND_URL= local host link on which your frontend is running
    DB_URL= Write DB yrl for mongoDB (for example mongodb://localhost/chat)
    ```

2.  Install nodemon by running the following command in the terminal:

    ```bash
    sudo npm install -g --force nodemon
    ```

3.  Install the required packages by running the following command in the project root directory:

    ```bash
    npm i
    ```

4.  Run server:

    ```
    npm start
    ```

5.  Run test cases:

    First stop your server if running
    Go to server.test.js and add the existing username and password at the place of test@example.com and password then run the command

    ```
    npm run test
    ```

