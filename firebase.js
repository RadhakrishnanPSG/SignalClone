import "firebase/compat/firestore";
import "firebase/compat/auth";
import firebase from "firebase/compat/app";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDPp0s-6alV90tjc9PjSIEifHN9k03u2yI",
  authDomain: "mcpackage-f0398.firebaseapp.com",
  projectId: "mcpackage-f0398",
  storageBucket: "mcpackage-f0398.appspot.com",
  messagingSenderId: "130463831428",
  appId: "1:130463831428:web:00fef295e103f59cdeb9d1",
  measurementId: "G-B6BCVXTTND"
};

let app;

if(firebase.apps.length === 0)
{
  app = firebase.initializeApp(firebaseConfig);
}
else
{
  app = firebase.app();
}

const db = app.firestore();
const auth = firebase.auth();

export {db ,auth}