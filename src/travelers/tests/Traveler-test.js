import { expect } from 'chai';
import Traveler from '../Traveler';
import travelersData from '../sample-travelersData';
import tripsData from '../../trips/sample-tripsData';
import destinationsData from '../../destinations/sample-destinationsData';
import DestinationsRepo from '../../destinations/DestinationsRepo';

describe('Traveler', () => {
  let traveler1;
  let traveler2;
  let destinationsRepo;
  let userInputs;

  beforeEach( () => {
    traveler1 = new Traveler(travelersData[0], tripsData);
    traveler2 = new Traveler(travelersData[1], tripsData);
    destinationsRepo = new DestinationsRepo(destinationsData);
    userInputs = {
      destination: "Lima, Peru",
      travelers: 2,
      date: 2022/12/12,
      duration: 10,
    }
  });
  
  it('should be a function', () => {
    expect(Traveler).to.be.a('function');
  });

  it('should have an id', () => {
    expect(traveler1.id).to.equal(1);
    expect(traveler2.id).to.equal(2);
  });

  it('should have a valid id number', () => {
    expect(traveler1.id).to.be.a('number')
  });

  it('should have a name', () => {
    expect(traveler1.name).to.equal('Ham Leadbeater');
    expect(traveler2.name).to.equal('Rachael Vaughten');
  });

  it('should have a travelerType ', () => {
    expect(traveler1.travelerType).to.equal('relaxer');
    expect(traveler2.travelerType).to.equal('thrill-seeker');
  });

  it('should have a list of trips for this user', () => {
    expect(traveler1.listOfTrips).to.deep.equal([tripsData[3]]);
    expect(traveler2.listOfTrips).to.deep.equal([
      tripsData[5], 
      tripsData[4],
    ]);
  });

  it('should sort list of dates in reverse chronological order', () => {
    expect(traveler2.sortTripsByDate(tripsData)).to.deep.equal([
      tripsData[5],
      tripsData[4],
    ]);
  });

  it('should be able to get the first name', () => {
    expect(traveler1.getFirstName()).to.equal('Ham');
    expect(traveler2.getFirstName()).to.equal('Rachael');
  });

  it('should get yearly spending on trips', () => {
    expect(traveler1.getYearlySpendingOnTrips(destinationsRepo)).to.equal('0');
    expect(traveler2.getYearlySpendingOnTrips(destinationsRepo)).to.equal('0');
  });

  it('should get estimated cost for trip', () => {
    expect(traveler1.getEstimatedCostForTrip(destinationsRepo.destinationsData, userInputs)).to.equal('1,650');
  });
});