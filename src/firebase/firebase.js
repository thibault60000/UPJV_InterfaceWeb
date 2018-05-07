import * as firebase from 'firebase';

const prodConfig = {
  apiKey: "AIzaSyAFGhVm8-176tivfD29MuHy5bU36rAOC4I",
  authDomain: "interfaceweb-631bc.firebaseapp.com",
  databaseURL: "https://interfaceweb-631bc.firebaseio.com",
  projectId: "interfaceweb-631bc",
  storageBucket: "interfaceweb-631bc.appspot.com",
  messagingSenderId: "24344935425"
};

const devConfig = {
  apiKey: "AIzaSyAFGhVm8-176tivfD29MuHy5bU36rAOC4I",
  authDomain: "interfaceweb-631bc.firebaseapp.com",
  databaseURL: "https://interfaceweb-631bc.firebaseio.com",
  projectId: "interfaceweb-631bc",
  storageBucket: "interfaceweb-631bc.appspot.com",
  messagingSenderId: "24344935425"
};

const config = process.env.NODE_ENV === 'production'
  ? prodConfig
  : devConfig;

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const st = firebase.storage();
const db = firebase.database();
const auth = firebase.auth();

export {
  db,
  auth,
  st
};
