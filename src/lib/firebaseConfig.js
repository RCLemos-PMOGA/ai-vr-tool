import { initializeApp } from 'firebase/app';

const firebaseConfig = {
    apiKey: "AIzaSyDIdYSvnnE0gw5W5gChAL1xe-QixcEWZzw",
    authDomain: "exemplo2-57c2a.firebaseapp.com",
    databaseURL: "https://exemplo2-57c2a-default-rtdb.firebaseio.com",
    projectId: "exemplo2-57c2a",
    storageBucket: "exemplo2-57c2a.appspot.com",
    messagingSenderId: "943755642817",
    appId: "1:943755642817:web:233e8bd9559ab31abdd140"
};

const firebaseApp = initializeApp(firebaseConfig);

export { firebaseApp };