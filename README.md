# Project Name: TT-Backend-Challenge

## Description

This project is a simple server application that fetches data from the Pokemon API, stores it in a Firebase Firestore database, and serves it to clients. It uses Fastify as a web framework and Axios for making HTTP requests.

## Dependencies

- [Fastify](https://www.fastify.io/): A web framework for Node.js. Used to create the server and handle routes.
- [Axios](https://axios-http.com/): A promise-based HTTP client for the browser and Node.js. Used to fetch data from the Pokemon API.
- [Firebase](https://firebase.google.com/): A platform developed by Google for creating mobile and web applications. Used here for its Firestore database.
- [@fastify/cors](https://github.com/fastify/fastify-cors): A plugin for Fastify to enable CORS.

## Setup

1. Clone the repository.
2. Install the dependencies with `npm install`.
3. Start the server with `npm start`.

## Firebase Configuration

The Firebase configuration is located in [firebase/firebaseConfig.js](firebase/firebaseConfig.js). You'll need to replace the placeholders in the `firebaseConfig` object with your own Firebase project's details.

## Server

The server is implemented in [server.js](server.js). It fetches data from the Pokemon API, stores it in Firestore, and serves it to clients.

## Scripts

- `npm start`: Starts the server.
- `npm run dev`: Starts the server with Nodemon, which will automatically restart the server whenever file changes are detected.

## License

ISC
