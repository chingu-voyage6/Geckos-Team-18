const functions = require('firebase-functions');


exports.collectionsOnCreate = functions.firestore.document('collections/{collectionId}').onCreate((snapshot, context) => {
    return snapshot.ref.update({id: context.params.id});  
});
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
