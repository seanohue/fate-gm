/**
 * Thing model events
 */

'use strict';

import {EventEmitter} from 'events';
import Character from './character.model';
const CharacterEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
CharacterEvents.setMaxListeners(0);

// Model events
const events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Character.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return doc => {
    CharacterEvents.emit(event + ':' + doc._id, doc);
    CharacterEvents.emit(event, doc);
  }
}

export default CharacterEvents;
