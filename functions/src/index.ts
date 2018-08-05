import * as functions from 'firebase-functions';
type Functions = typeof functions;

const ensureAdmin = (functions: Functions) =>
  functions.firestore.document('users/{userId}').onCreate(e => {
    console.log(e);
  });

export { ensureAdmin };
