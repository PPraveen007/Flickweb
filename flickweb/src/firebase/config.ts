import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyD-SzNwx1YQMCFDnWZNWISHNL7zAMMQbvI",
    authDomain: "ethrex-watch.firebaseapp.com",
    projectId: "ethrex-watch",
    storageBucket: "ethrex-watch.appspot.com",
    messagingSenderId: "85293540033",
    appId: "1:85293540033:web:9d66160bb08126b43aea40"
};

firebase.initializeApp(firebaseConfig);
const projectFirestore = firebase.firestore()
export { projectFirestore };