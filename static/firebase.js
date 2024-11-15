// Initialize Firebase

const firebaseConfig = {
    apiKey: "Your API Key",
    authDomain: "lesson-plan-generator-4cbe8.firebaseapp.com",
    projectId: "lesson-plan-generator-4cbe8",
    storageBucket: "lesson-plan-generator-4cbe8.firebasestorage.app",
    messagingSenderId: "1022165223215",
    appId: "1:1022165223215:web:ae1c84313639a878ae43da",
    measurementId: "G-YVCF04L7FV"
  };

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore(); // Initialize Firestore

// Register function
function register() {
    console.log(" Random checking ")
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    console.log(email,password)
    try {
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(() => {
            alert("Registration successful!");
            window.location.href = "/login";  // Redirect to login after successful registration
        })
        .catch((error) => {
            alert("Error: " + error.message);
        });
    } catch (error) {
        console.log(error)
    }
    
}

// Login function
function login() {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then(() => {
            alert("Login successful!");
            window.location.href = "/dashboard";  // Redirect to dashboard after login
        })
        .catch((error) => {
            alert("Error: " + error.message);
        });
}

// Check authentication status for protected pages
function checkAuth() {
    firebase.auth().onAuthStateChanged((user) => {
        if (!user) {
            // Redirect to login if not authenticated
            window.location.href = "/login";
        }
    });
}
//db firestore

// Save lesson plan to Firestore
function saveLessonPlan(userId, lessonPlan) {
    db.collection("users").doc(userId).collection("lessonPlans").add(lessonPlan)
        .then(() => {
            alert("Lesson plan saved successfully!");
        })
        .catch((error) => {
            alert("Error saving lesson plan: " + error.message);
        });
}

// Retrieve lesson plans for a user
function getLessonPlans(userId, callback) {
    db.collection("users").doc(userId).collection("lessonPlans").get()
        .then((querySnapshot) => {
            const lessonPlans = [];
            querySnapshot.forEach((doc) => {
                lessonPlans.push(doc.data());
            });
            callback(lessonPlans);
        })
        .catch((error) => {
            console.log("Error retrieving lesson plans: " + error.message);
        });
}

