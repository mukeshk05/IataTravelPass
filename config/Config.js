// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBjbgb8t9otvRF88Qn7DDBHBje6APxYmtM",
  authDomain: "iatatravelpass-94901.firebaseapp.com",
  databaseURL: "https://iatatravelpass-94901-default-rtdb.firebaseio.com",
  projectId: "iatatravelpass-94901",
  storageBucket: "iatatravelpass-94901.appspot.com",
  messagingSenderId: "187255851345",
  appId: "1:187255851345:web:7bfb47b7f63fa9e2ecab70",
};

// function initializeAppIfNecessary() {
//   try {
//     return getApp();
//   } catch (any) {
//     const firebaseConfig = {
//       apiKey: "AIzaSyBjbgb8t9otvRF88Qn7DDBHBje6APxYmtM",
//       authDomain: "iatatravelpass-94901.firebaseapp.com",
//       databaseURL: "https://iatatravelpass-94901-default-rtdb.firebaseio.com",
//       projectId: "iatatravelpass-94901",
//       storageBucket: "iatatravelpass-94901.appspot.com",
//       messagingSenderId: "187255851345",
//       appId: "1:187255851345:web:7bfb47b7f63fa9e2ecab70",
//     };
//     return initializeApp(firebaseConfig);
//   }
// }
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
