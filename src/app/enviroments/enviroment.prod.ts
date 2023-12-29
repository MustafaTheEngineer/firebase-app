// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: 'AIzaSyBsnjdb6o4CLbjbaC8y2qZ02FzPg0yHqd8',
  authDomain: 'recipes-2df5a.firebaseapp.com',
  projectId: 'recipes-2df5a',
  storageBucket: 'recipes-2df5a.appspot.com',
  messagingSenderId: '286696006391',
  appId: '1:286696006391:web:27753659100619d6a169f2',
  measurementId: 'G-L2EYEJK4TG',
};
// Initialize Firebase

const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);
