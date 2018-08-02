import { createStandardAction, action } from 'typesafe-actions';
import { Config } from '../config';
import firebase from 'firebase';

export const CONFIGURE = '@@CMS/init';

export const configure = (config: Config) => {
  firebase.initializeApp(config.firebaseConfig);
  const firestore = firebase.firestore();
  const settings = { timestampsInSnapshots: true };
  firestore.settings(settings);
  return action(CONFIGURE, config);
};
