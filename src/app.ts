import { FirebaseApp, getApp, initializeApp } from "@firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

let app: FirebaseApp;

try {
  app = getApp();
} catch {
  app = initializeApp({
    apiKey: "AIzaSyB_UscU9rpZrYs5TVhmW6eYkBav8D3UWHk",
    authDomain: "my-next-web-app.firebaseapp.com",
    projectId: "my-next-web-app",
    storageBucket: "my-next-web-app.appspot.com",
    messagingSenderId: "911767797854",
    appId: "1:911767797854:web:bbb332db41628adfbe34cf",
    measurementId: "G-W7DBQQ1TS7",
  });
}

const auth = getAuth(app);
const store = getFirestore(app);
const storage = getStorage(app);

export default app;
export { auth, store, storage };
