const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb+srv://usuario:usuario@cluster-web-vilrj.mongodb.net/jwt?retryWrites=true&w=majority';

module.exports = MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });