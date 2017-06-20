/** @jsx h */
import runtime from 'serviceworker-webpack-plugin/lib/runtime';
import { h, render } from 'preact';
import firebase from 'firebase';
import App from './components/App';

firebase.initializeApp(JSON.parse(process.env.FIREBASE_CONFIG));

/*
  Render the App, replacing existing content
*/
render(<App />, document.body, document.body.lastChild);

if ('serviceWorker' in navigator) {
  runtime.register().then(registration => {
    // Use registration to for example register it to firebase messaging
  });
}
