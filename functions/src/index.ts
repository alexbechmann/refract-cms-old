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

export const addMedia = functions.storage.object().onFinalize((obj, context) => {
  console.log(obj, context);
  const { id, mediaLink, name } = obj;
  return firebase
    .firestore()
    .collection('media')
    .doc(obj.etag)
    .set({
      url: obj.mediaLink.replace(
        'https://www.googleapis.com/download/storage/v1/b/',
        'https://firebasestorage.googleapis.com/v0/b/'
      ),
      fullPath: obj.name
    });
});

export const removeMedia = functions.storage.object().onDelete((obj, context) => {
  console.log(obj, context);
  return firebase
    .firestore()
    .collection('media')
    .doc(obj.etag)
    .delete();
});
