const mongoose = require('mongoose');
const { dbHost, dbPort, dbName, dbUser, dbPassword } = require('../env');

mongoose.connect(`mongodb://${dbUser}:${dbPassword}@${dbHost}:${dbPort}/${dbName}?authSource=admin`);
const db = mongoose.connection;
// db.on('open', () => {
//     // server.listen(port);
//     // server.on('error', onError);
//     // server.on('listening', onListening);
//     console.log('Connected to MongoDB');
// });
module.exports = db;