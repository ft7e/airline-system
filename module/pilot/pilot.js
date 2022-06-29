'use strict';
require('dotenv').config();
const PORT = process.env.PORT || 3010;
const io = require('socket.io-client');
const { faker } = require('@faker-js/faker');
const host = `http://localhost:${PORT}`;
let ID = faker.datatype.uuid();
const mainConnection = io.connect(host);
const airlineConnection = io.connect(`${host}/airline`);
airlineConnection.on('new-flight', () => {
  setTimeout(() => {
    let tookoffAlert = `flight number ${ID} just took off`;
    console.log(tookoffAlert);
    mainConnection.emit('took-off', tookoffAlert);
  }, 4000);
  setTimeout(() => {
    let arriveAlert = `flight number ${ID} just arrived`;
    console.log(arriveAlert);
    mainConnection.emit('arrived', arriveAlert);
  }, 7000);
});
