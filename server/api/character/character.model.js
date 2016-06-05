'use strict';

import mongoose from 'mongoose';

//TODO: Update to reflect FATE character sheet.
const CharacterSchema = new mongoose.Schema({
  name: String,
  desc: String,

  concept: String,
  trouble: String,
  aspects: [ String ],

  skills: [ {
    name: String,
    level: Number,
  } ],

  stunts: [ String ],

  refresh: { type: Number, default: 3 },
  fate: { type: Number, default: 3}

  active: Boolean
});

export default mongoose.model('Character', CharacterSchema);
