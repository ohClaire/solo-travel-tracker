import { expect } from 'chai';
import Traveler from '../Traveler';
import TravelersRepo from '../TravelersRepo';
import travelersData from '../sample-travelersData';

describe('Travelers Repository', () => {
  let travelers;
  let allTravelers;

  beforeEach( () => {
    travelers = [
      new Traveler(travelersData[0]),
      new Traveler(travelersData[1])
    ];

    allTravelers = new TravelersRepo(travelers);
  });
  
  it('should be a function', () => {
    expect(TravelersRepo).to.be.a('function');
  });

  it('should be an instance of Travelers Repository', () => {
    expect(allTravelers).to.be.an.instanceOf(TravelersRepo);
  });

  it('should store an array of travelers', () => {
    expect(allTravelers.travelersData).to.deep.equal(travelers);
    expect(allTravelers.travelersData.length).to.equal(2);
  });

  it('should store instances of Traveler in the travelers array', () => {
    expect(allTravelers.travelersData[0]).to.be.an.instanceOf(Traveler);
    expect(allTravelers.travelersData[1]).to.be.an.instanceOf(Traveler);
  });

  it('should return a user object by their id', () => {
    expect(allTravelers.getUserData(1)).to.deep.equal(travelers[0]);
    expect(allTravelers.getUserData(2)).to.deep.equal(travelers[1]);
  });

  it('should not return a user if their id is not found', () => {
    expect(allTravelers.getUserData(3)).to.equal(undefined);
  });
});
