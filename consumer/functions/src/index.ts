import * as functions from "firebase-functions";
import * as firestoreCmsFunctions from "@firestore-cms/functions";

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

export const ensureAdmin = firestoreCmsFunctions.ensureAdmin(functions);

export const test = functions.firestore.document("*").onUpdate(console.log);
