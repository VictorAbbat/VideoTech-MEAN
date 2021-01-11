const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require("cors");
require('dotenv');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Configuration de la database
const dbConfig = require('./app/config/mongodb.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Connection de la database
mongoose.connect(process.env.URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Connexion etablie a MongoDB.");
    }).catch(err => {
        console.log("Echec de connexion a MongoDB.");
        process.exit();
    });

require('./app/routes/video.router.js')(app);
// Creation du serveur
var server = app.listen(8089, function () {
    var host = server.address().address
    var port = server.address().port

    console.log("Adresse http://", host, port)
})

// Test 
app.get("/", (req, res) => {
    res.json({ message: "Bienvenue dans votre gestionnaire de vidéos" });
});
