const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

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

exports.trainingsOnCreate = functions.firestore
  .document('trainings/{trainingId}')
  .onCreate((snapshot, context) => {
    let collectionRef = admin.firestore().collection('statistics');
    let data = snapshot.data();

    return collectionRef
      .where('userId', '==', data.userId)
      .where('collectionId', '==', data.collectionId)
      .get()
      .then(querySnapshot => {
        if (querySnapshot.size) {
          let documentRef = querySnapshot.docs[0].ref;
          let queryData = querySnapshot.docs[0].data();
          let answered = queryData.answered + data.answered;
          let cards = queryData.cards + data.cards;
          documentRef.update({
            answered: answered,
            cards: cards,
            score: answered / cards
          });
        } else {
          collectionRef.add({
            collectionId: data.collectionId,
            userId: data.userId,
            answered: data.answered,
            cards: data.cards,
            score: data.answered / data.cards
          });
        }
      })
      .catch(error => console.log(error));
  });

/*exports.usersOnUpdate = functions.firestore
  .document('users/{userId}')
  .onUpdate((snapshot, context) => {
    if (
      snapshot.before.data().displayName !== snapshot.after.data().displayName
    ) {

    }
  });*/
