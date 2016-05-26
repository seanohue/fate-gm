'use strict';

var app = require('../..');
import request from 'supertest';

var newChar;

describe('Thing API:', function() {

  describe('GET /api/characters', function() {
    var characters;

    beforeEach(function(done) {
      request(app)
        .get('/api/characters')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          characters = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      characters.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/characters', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/characters')
        .send({
          name: 'New Thing',
          info: 'This is the brand new character!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newChar = res.body;
          done();
        });
    });

    it('should respond with the newly created character', function() {
      newChar.name.should.equal('New Thing');
      newChar.info.should.equal('This is the brand new character!!!');
    });

  });

  describe('GET /api/characters/:id', function() {
    var character;

    beforeEach(function(done) {
      request(app)
        .get('/api/characters/' + newChar._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          character = res.body;
          done();
        });
    });

    afterEach(function() {
      character = {};
    });

    it('should respond with the requested character', function() {
      character.name.should.equal('New Thing');
      character.info.should.equal('This is the brand new character!!!');
    });

  });

  describe('PUT /api/characters/:id', function() {
    var updatedThing;

    beforeEach(function(done) {
      request(app)
        .put('/api/characters/' + newChar._id)
        .send({
          name: 'Updated Thing',
          info: 'This is the updated character!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedThing = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedThing = {};
    });

    it('should respond with the updated character', function() {
      updatedThing.name.should.equal('Updated Thing');
      updatedThing.info.should.equal('This is the updated character!!!');
    });

  });

  describe('DELETE /api/characters/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/characters/' + newChar._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when character does not exist', function(done) {
      request(app)
        .delete('/api/characters/' + newChar._id)
        .expect(404)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

  });

});
