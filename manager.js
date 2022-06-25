'use strict';
const eventEmitter = require('./module/events-pool');
const { faker } = require('@faker-js/faker');

require('./module/pilot');
require('./module/system');
let ID = faker.datatype.uuid();
let pilot = faker.internet.userName();

setInterval(() => {
  let InformationNewFlight = `New Flight Number:${ID}`;
  console.log(InformationNewFlight);
  eventEmitter.emit('new-flight', InformationNewFlight);
}, 5000);

eventEmitter.on('Arrived', manager2);
function manager2() {
  console.log(`We are arriving with Pilot ${pilot}`);
}
