const express=require('express')
const app = express()
const bodyparser = require('body-parser')
const port = process.env.PORT || 3000
var admin = require("firebase-admin");
var serviceAccount = require("./testconnect-d06d8-firebase-adminsdk-njgkb-3efc445ccb.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
app.use(bodyparser.urlencoded())
app.use(bodyparser.json());


const db = admin.firestore();
app.post('/add',async (req,res)=>{
    let docRef=db.collection('users').doc(req.body.id)
    await docRef.set({
        FirstName: req.body.FirstName,
        LastName: req.body.LastName,
        Email: req.body.Email
    });
    res.send('done');
})

app.post('/change', (req,res) => {
    db.collection('user').doc(req.body.id).update({
      FirstName: req.body.FirstName,
      LastName: req.body.LastName,
      Email: req.body.Email
    });
    res.send('updated');
})
app.post('/delete', (req,res) => {
    db.collection('user').doc(req.body.id).delete()
    res.send('deleted');
})

app.get('/get', async (req, res) => {
    let usr=[]
     const users = await db.collection('user').get()
    if (users.docs.length > 0) {
      for (const user of users.docs) {
       usr.push(user.data())
    }}
    res.json(usr)
  })

app.listen(port,()=>{
    console.log(`Running on ${port}`)
})