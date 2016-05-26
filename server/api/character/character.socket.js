/**
 * Broadcast updates to client when the model changes
 */

'use strict';

import ThingEvents from './thing.events';

// Model events to emit
const events = ['save', 'remove'];

// Bind model events to socket events
export function register(socket) {
  events.forEach(event => {
    const listener = createListener('thing:' + event, socket);

    ThingEvents.on(event, listener);
    socket.on('disconnect', removeListener(event, listener));
  });

}


function createListener(event, socket) {
  return doc => socket.emit(event, doc);
}

function removeListener(event, listener) {
  return () => ThingEvents.removeListener(event, listener);
}
