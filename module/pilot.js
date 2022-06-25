'use strict';

const eventEmmiter = require('./events-pool');
const { faker } = require('@faker-js/faker');
require('./system');

let ID = faker.datatype.uuid();

eventEmmiter.on('new-flight', pilot);
function pilot() {
  setTimeout(() => {
    let PilotTackOff = `Pilot Number ${ID} Have Been TackOff`;
    console.log(PilotTackOff);
    eventEmmiter.emit('took-off', PilotTackOff);
  }, 4000);

  setTimeout(() => {
    let arrived = `Pilut Number ${ID} have Been Arrived`;
    console.log(arrived);
    eventEmmiter.emit('Arrived', arrived);
  }, 7000);
}
