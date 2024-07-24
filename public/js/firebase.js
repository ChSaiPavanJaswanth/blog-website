// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBpLjHAuvBEC7OWUi4GOACPFESRHf7405E',
  authDomain: 'vit-blog-website.firebaseapp.com',
  projectId: 'vit-blog-website',
  storageBucket: 'vit-blog-website.appspot.com',
  messagingSenderId: '439514519487',
  appId: '1:439514519487:web:e9c8a83a33790d0f67330a',
};

// Initialize Firebase
let app = firebase.initializeApp(firebaseConfig);
let db = firebase.fireStore();
