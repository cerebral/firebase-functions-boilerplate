/*
  This file does not use ES6 import and export syntax as it is the entry functions file and should not be
  transpiled to non-understandable code for firebase-functions
*/
const firebase = require('firebase-admin');
const admin = firebase.initializeApp({
  credential: firebase.credential.cert(JSON.parse(process.env.SERVICE_ACCOUNT)),
  databaseURL: JSON.parse(process.env.FIREBASE_CONFIG).databaseURL,
});
let functions = require('firebase-functions');

/*
  When in DEBUG mode we rather use the mock
*/
if (DEBUG) {
  functions = require('firebase-functions-mock')(admin);
}

exports.app = functions.https.onRequest(require('./app').default);
exports.translate = functions.database.ref('messages/{room}/{key}').onWrite(require('./translate').default);
