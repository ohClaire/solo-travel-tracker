import { expect } from 'chai';
import Trip from '../Trip';
import tripsData from '../sample-tripsData';

describe('Trip', () => {
  let trip1;
  let trip2;

  beforeEach( () => {
    trip1 = new Trip(tripsData[0]);
    trip2 = new Trip(tripsData[1]);
  });

  it('should be a function', () => {
    expect(Trip).to.be.a('function');
  });

  it('should have an id', () => {
    expect(trip1.id).to.equal(1);
    expect(trip2.id).to.equal(71);
  });

  it('should have a userID', () => {
    expect(trip1.userID).to.equal(44);
    expect(trip2.userID).to.equal(38);
  });

  it('should have a destinationID', () => {
    expect(trip1.destinationID).to.equal(49);
    expect(trip2.destinationID).to.equal(28);
  });

  it('should have number of travelers', () => {
    expect(trip1.travelers).to.equal(1);
    expect(trip2.travelers).to.equal(1);
  });

  it('should have a date', () => {
    expect(trip1.date).to.equal('2022-09-16');
    expect(trip2.date).to.equal('2020-05-26');
  });

  it('should check the format of date is valid', () => {
    expect(trip1.validateDateFormat()).to.equal(true);
  });

  it('date should be a string', () => {
    expect(trip1.date).to.be.a('string');
  })

  it('should have a duration', () => {
    expect(trip1.duration).to.equal(8);
    expect(trip2.duration).to.equal(11);
  });

  it('should have a status from the travel agency', () => {
    expect(trip1.status).to.equal('approved');
    expect(trip2.status).to.equal('pending');
  });

  it('should start with an empty list for suggested activities', () => {
    expect(trip1.suggestedActivities).to.deep.equal([]);
  });

  // it('should have a default status of pending', () => {
  //   expect(trip)
  // });
});

