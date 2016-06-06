/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import Character from '../api/character/character.model';
import User from '../api/user/user.model';

Character.find({}).remove()
  .then(() => {
    Character.create({
      name: "Beeblebrox",
      desc: "A self-righteous bastard of a space pirate.",
      concept: "Alien space pirate with three arms, who is never wrong.",
      trouble: "On the lam from the space merchant's guild's protectors after mouthing off. Also, mouthing off.",
      aspects: ["Excellent navigator", "Calm yet sassy when under fire", "Intimate knowledge of starship weaponry"],
      skills: [
        { name: "Spacecraft piloting", level: 3 },
        { name: "Sarcasm", level: 5 },
      ],
      stunts: ["When under fire, I can make disarmingly sarcastic quips to improve the confidence of my comrades and roast the enemies."],
      active: true
    });
  });

User.find({}).remove()
  .then(() => {
    User.create({
      provider: 'local',
      name: 'Test User',
      email: 'test@example.com',
      password: 'test'
    }, {
      provider: 'local',
      role: 'admin',
      name: 'Admin',
      email: 'admin@example.com',
      password: 'admin'
    })
    .then(() => {
      console.log('finished populating users');
    });
  });
