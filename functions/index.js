// Import the Firebase SDK for Google Cloud Functions.
const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

exports.setupNewUser = functions.auth.user().onCreate(event => {
  const user = event.data;

  admin.database().ref('/users/' + user.uid).set({
    name: user.displayName,
    created: new Date().toISOString(),
    createdBy: user.uid,
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/kla-scrum-poker.appspot.com/o/user-profile-images%2Fno-image.png?alt=media&token=663c6ead-4d9d-4e78-8233-0c4e8da22636"
  });
});

exports.ticketStats = functions.https.onRequest((req, res) => {
  // Result object that will be returned
  const result = {
    totalTickets: 0,
  };

  // This will not scale well. A database trigger would be better.
  admin.database().ref('/tickets').once("value").then(function(snapshot) {
    const collection = snapshot.val();

    // Count of tickets
    result.totalTickets = Object.keys(collection).length;

    res.send(result);
  });

});

exports.voteSync = functions.database.ref('/users/{$uid}/votes').onWrite(event => {
  if (event.data.exists() && event.params.exist()) {
    const $key = event.data.key;
    const data = event.data.val();
    const $uid = event.params.$uid;
    data.updateCount = data.updateCount++;
    if (data.created) {
      data.lastModified = new Date().toISOString();
      data.lastModifiedBy = $uid;
    } else {
      data.created = new Date().toISOString();
      data.createdBy = $uid;
    }
    return admin.database().ref('/votes/' + $key).set(data);
  }
});

exports.ticketSync = functions.database.ref('/users/{$uid}/tickets').onWrite(event => {
  if (event.data.exists()) {
    const $key = event.data.key;
    const data = event.data.val();
    const $uid = event.params.$uid;
    if (data.created) {
      data.lastModified = new Date().toISOString();
      data.lastModifiedBy = $uid;
    } else {
      data.created = new Date().toISOString();
      data.createdBy = $uid;
    }
    return admin.database().ref('/tickets/' + $key).set(data);
  }
});
