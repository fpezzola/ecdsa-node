## ECDSA Node

This project is an excercise of the Ethereum Bootcamp for the Alchemy university website.

Further explanation about this project can be found here:
https://github.com/alchemyplatform/ecdsa-node

### Client

The client folder contains a [react app](https://reactjs.org/) using [vite](https://vitejs.dev/). To get started, follow these steps:

1. Open up a terminal in the `/client` folder
2. Run `npm install` to install all the depedencies
3. Run `npm run dev` to start the application
4. Now you should be able to visit the app at http://127.0.0.1:5173/

### Server

The server folder contains a node.js server using [express](https://expressjs.com/). To run the server, follow these steps:

1. Open a terminal within the `/server` folder
2. Run `npm install` to install all the depedencies
3. Run `node index` to start the server

The application should connect to the default server port (3042) automatically!

### Key-pair generation

In order to get a fresh key-pair (private and public) you can execute the generate script in the server application.

1. Open a terminal within the `/server` folder
2. Run `npm install` to install all the depedencies (In case you haven't done it yet.)
3. Run `npm run generate` to generate and print in console a key-pair and the corresponding ethereum address.

### Disclaimer

This project requests the user to input their `private key` for the sake of simplicity. Normally, we would use a wallet to sign a transaction before pushing it to the backend.

_Hint_ - Use [nodemon](https://www.npmjs.com/package/nodemon) instead of `node` to automatically restart the server on any changes.
