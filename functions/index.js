const functions = require("firebase-functions");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

const admin = require("firebase-admin");
admin.initializeApp();
// exports.createUserInDatabase = functions.auth.user().onCreate(async (user) => {
//   const email = user.email;
//   try {
//     const snapshot = await admin
//       .database()
//       .ref("users/" + user.uid)
//       .set({ email: email, uid: user.uid });
//     return snapshot;
//   } catch (error) {
//     console.log(error);
//   }
// });
