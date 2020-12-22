import firebase from "firebase";
import 'firebase/database';

export const firebaseConfig = {
    apiKey: "AIzaSyAaI1ywCBFic4yebvBBcQ0JltZJyVPkbms",
    authDomain: "react-quiz-fb6f1.firebaseapp.com",
    databaseURL: "https://react-quiz-fb6f1.firebaseio.com",
    projectId: "react-quiz-fb6f1",
    storageBucket: "react-quiz-fb6f1.appspot.com",
    messagingSenderId: "683926655637",
    appId: "1:683926655637:web:357ad509e9345f295a019c",
    measurementId: "G-8PZQ5R06PE"
};

firebase.initializeApp(firebaseConfig)
export const database = firebase.database()