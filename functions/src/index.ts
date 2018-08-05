import * as functions from 'firebase-functions';
import * as firebase from 'firebase-admin';

firebase.initializeApp(functions.config());

export const helloWorld2 = functions.https.onRequest((request, response) => {
  firebase
    .firestore()
    .collection('test')
    .doc()
    .set({ test: true })
    .then(() => {
      response.send('success');
    })
    .catch(() => response.send('error'));
});

export const ensureAdmin = functions.firestore.document('users/{userId}').onCreate(e => {
  console.log(e);
});

export const addMedia = functions.storage.object().onFinalize(e => {
  const { id, mediaLink, name } = e;
  firebase
    .firestore()
    .collection('media')
    .doc(e.id)
    .set({
      id,
      mediaLink,
      name
    });
});

export const removeMedia = functions.storage.object().onDelete(e => {
  firebase
    .firestore()
    .collection('media')
    .doc(e.id)
    .delete();
});
