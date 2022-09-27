import { expect } from 'chai';
import Trip from '../Trip';
import tripsData from '../sample-tripsData';

describe('Trip', () => {
  let trip1;
  let trip2;
  let trip3;

  beforeEach( () => {
    trip1 = new Trip(tripsData[0]);
    trip2 = new Trip(tripsData[1]);
    trip3 = new Trip(tripsData[2]);
  });

  it('should be a function', () => {
    expect(Trip).to.be.a('function');
  });

  it('should have an id', () => {
    expect(trip1.id).to.equal(1);
    expect(trip3.id).to.equal(71);
  });

  it('should have a userID', () => {
    expect(trip1.userID).to.equal(44);
    expect(trip3.userID).to.equal(38);
  });

  it('should have a destinationID', () => {
    expect(trip1.destinationID).to.equal(49);
    expect(trip3.destinationID).to.equal(28);
  });

  it('should have number of travelers', () => {
    expect(trip1.numOfTravelers).to.equal(1);
    expect(trip2.numOfTravelers).to.equal(5);
  });

  it('should have a date', () => {
    expect(trip1.date).to.equal('2022/09/16');
    expect(trip3.date).to.equal('2020/05/26');
  });

  it('should have date converted to correct format of YYYY/MM/DD', () => {
    expect(trip1.date).to.equal('2022/09/16');
    expect(trip2.date).to.equal('2022/10/04');
  });

  it('should have a duration', () => {
    expect(trip1.duration).to.equal(8);
    expect(trip3.duration).to.equal(11);
  });

  it('should have a status', () => {
    expect(trip1.status).to.equal('approved');
    expect(trip3.status).to.equal('pending');
  });

  it('should start with an empty list for suggested activities', () => {
    expect(trip1.suggestedActivities).to.deep.equal([]);
  });

  it('should return if date is past or upcoming', () => {
    expect(trip1.isPastTrip()).to.equal(true);
    expect(trip2.isUpcomingTrip()).to.equal(true);
  });

  it('should check if status is pending', () => {
    expect(trip1.isPendingTrip()).to.equal(false);
    expect(trip3.isPendingTrip()).to.equal(true);
  });

  it('should check if a date is between now and a year ago', () => {
    expect(trip1.isBetweenAYear()).to.equal(true);
    expect(trip3.isBetweenAYear()).to.equal(false);
  });
});

