/*global describe, it, before, beforeEach */
/* jshint camelcase:false */
'use strict';

var expect = require('chai').expect;
var connect = require('../../app/lib/mongodb');
var Item;
var Mongo = require('mongodb');

describe('Item', function(){
  before(function(done){//forces it to connect to mongo before running the test//
    connect('home-inventory-test', function(){
     Item = require('../../app/models/item');
      done();
    });
  });
// clears out items before running test (keeps it from having more items than declared and failing test)//
  beforeEach(function(done){
    global.mongodb.collection('items').remove(function(){
      done();
    });
  });

  describe('constructor', function(){
    it('should create a new Item', function(){
      var couch = new Item('Couch', 'Living', '3/4/2009', '2', '1100');

      expect(couch).to.be.instanceof(Item);
      expect(couch.name).to.equal('Couch');
      expect(couch.room).to.equal('Living');
      expect(couch.acquired).to.be.instanceof(Date);
      expect(couch.count).to.be.a('number');
      expect(couch.count).to.equal(2);
      expect(couch.cost).to.be.a('number');
      expect(couch.cost).to.equal(1100);
    });
  });

  describe('#save', function(){
    it('should save an item to the mongo database', function(done){
      var couch = new Item('Couch', 'Living', '3/4/2009', '2', '1100');
        couch.save(function(){
          expect(couch._id).to.be.instanceof(Mongo.ObjectID);
          done();
        });
      });
    });
  describe('.find', function(){
    it('should find all the items from the mongo database', function(done){
      var couch = new Item('Couch', 'Living', '3/4/2009', '2', '1100');
      couch.save(function(){
        Item.find({}, function(items){
          expect(items).to.have.length(1);
          done();
          });
        });
      });
    });
  describe('.find', function(){
    it('should find specific items from the mongo database', function(done){
      var chair = new Item('Chair', 'Living', '3/4/2009', '2', '300');
      var bed = new Item('Bed', 'Bedroom', '3/4/2009', '1','1300');
      var couch = new Item('Couch', 'Living', '3/4/2009', '2', '1100');

      chair.save(function(){
        bed.save(function(){
          couch.save(function(){
            Item.find({name:'Bed'}, function(items){
              expect(items).to.have.length(1);
              expect(items[0].name).to.equal('Bed');
              done();
            });
          });
        });
      });
    });
  });
});
