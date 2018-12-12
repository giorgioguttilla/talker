const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

exports.deleteOldPosts = functions.https.onRequest((request, response) => {
//response.send("Hello from Firebase!");
    var currentDate = Date.now();
    var cutoffDate = currentDate - 24*60*60*1000;//one day ago
    
    var oldPostsQuery = admin.database().ref('posts').orderByChild('timestamp').endAt(cutoffDate);
    return oldPostsQuery.once('value', (snapshot) => {

        var updates = {};

        snapshot.forEach((child) => {
            updates[child.key] = null
        });

        return admin.database().ref('posts').update(updates);
    });
    //console.log('visited');
});
