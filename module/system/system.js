'use strict';
require('dotenv').config();
const PORT = process.env.PORT || 3010;
const ioServer = require('socket.io')(PORT);
const { faker } = require('@faker-js/faker');

const airline = 'British Airlines';
const flightId = faker.datatype.uuid();
const pilotName = faker.name.findName();
const destination = faker.address.cityName();

const airlinePath = ioServer.of('/airline');
airlinePath.on('connection', (socket) => {
  console.log(`connection established to airline ${socket.id}`);
});
ioServer.on('connection', (socket) => {
  console.log('connection established to main', socket.id);
  socket.on('new-flight', () => {
    newFlight();
    airlinePath.emit('new-flight');
  });
  socket.on('took-off', tookoffAlert);
  socket.on('arrived', () => {
    arriveAlert();
    airlinePath.emit('arrived', pilotName);
  });
});

function newFlight() {
  let newFlight = {
    Flight: {
      event: 'new-flight',
      time: faker.date.past(),
      Details: {
        airLine: airline,
        flightID: flightId,
        pilot: pilotName,
        destination: destination,
      },
    },
  };
  console.log(newFlight);
}
function tookoffAlert() {
  let newFlight = {
    Flight: {
      event: 'took_off',
      time: faker.date.past(),
      Details: {
        airLine: airline,
        flightID: flightId,
        pilot: pilotName,
        destination: destination,
      },
    },
  };
  console.log(newFlight);
}
function arriveAlert() {
  let newFlight = {
    Flight: {
      event: 'arrived',
      time: faker.date.past(),
      Details: {
        airLine: airline,
        flightID: flightId,
        pilot: pilotName,
        destination: destination,
      },
    },
  };
  console.log(newFlight);
}
