import firebase from "firebase";
import "firebase/firestore";
import config from "./config";

if (!firebase.apps.length) {
  var firebaseApp = firebase.initializeApp(config);
} else {
  firebaseApp = firebase.app();
}

const firestore = firebase.firestore();
const settings = {
  timestampsInSnapshots: true
};

firestore.settings(settings);

export default firebaseApp.firestore();
