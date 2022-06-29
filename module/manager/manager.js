'use strict';
require('dotenv').config();
const io = require('socket.io-client');
const PORT = process.env.PORT || 3010;
const { faker } = require('@faker-js/faker');
const host = `http://localhost:${PORT}`;
const flightId = faker.datatype.uuid();
const mainConnection = io.connect(host);
const airlineConnection = io.connect(`${host}/airline`);
setInterval(() => {
  let newFlight = `Manager: new flight with ID ${flightId} have been scheduled`;
  console.log(newFlight);
  mainConnection.emit('new-flight', flightId);
  airlineConnection.emit('new-flight', flightId);
}, 10000);

airlineConnection.on('arrived', (pilotName) => {
  console.log(`we’re greatly thankful for the amazing flight, ${pilotName}`);
});
//
