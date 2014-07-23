/*global describe, it, before */
/* jshint camelcase:false */
'use strict';

var expect = require('chai').expect;
var connect = require('../../app/lib/mongodb');
var Item;


describe('Item', function(){
  before(function(done){
    connect('home-inventory-test', function(){
     Item = require('../../app/models/item');
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
          expect(couch._id).to.be.ok;
          done();
        });
      });
    });
  });
