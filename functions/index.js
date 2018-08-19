const functions = require('firebase-functions');

exports.collectionsOnCreate = functions.firestore
  .document('collections/{collectionId}')
  .onCreate((snapshot, context) => {
    return snapshot.ref.update({ id: context.params.collectionId });
  });

exports.cardsOnCreate = functions.firestore
  .document('collections/{collectionId}/cards/{cardId}')
  .onCreate((snapshot, context) => {
    return snapshot.ref.update({ id: context.params.cardId });
  });

/*exports.usersOnUpdate = functions.firestore
  .document('users/{userId}')
  .onUpdate((snapshot, context) => {
    if (
      snapshot.before.data().displayName !== snapshot.after.data().displayName
    ) {

    }
  });*/
