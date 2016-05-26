'use strict';

import mongoose from 'mongoose';

//TODO: Update to reflect FATE character sheet.
const CharacterSchema = new mongoose.Schema({
  name: String,
  info: String,
  active: Boolean
});

export default mongoose.model('Character', CharacterSchema);
