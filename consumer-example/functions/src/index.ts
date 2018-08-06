import * as functions from 'firebase-functions';
import * as firebase from 'firebase-admin';
import { helloWorld2 } from '@firestore-cms/functions';
import { request } from 'http';

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
export const helloWorld = functions.https.onRequest((request, response) => {
  response.send('Hello from Firebase!');
});

export * from '@firestore-cms/functions';
