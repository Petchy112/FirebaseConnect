var admin = require("firebase-admin");

var serviceAccount = require("./testconnect-d06d8-firebase-adminsdk-njgkb-3efc445ccb.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
