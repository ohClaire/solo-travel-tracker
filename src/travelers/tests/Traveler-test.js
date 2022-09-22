import { expect } from 'chai';
import Traveler from '../Traveler';
import travelersData from '../sample-travelersData';

describe('Traveler', () => {
  let traveler1;
  let traveler2;

  beforeEach( () => {
    traveler1 = new Traveler(travelersData[0]);
    traveler2 = new Traveler(travelersData[1]);
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

  it('should be able to retrieve first name', () => {
    expect(traveler1.getFirstName()).to.equal('Ham');
    expect(traveler2.getFirstName()).to.equal('Rachael');
  });

  it('should have a travelerType ', () => {
    expect(traveler1.travelerType).to.equal('relaxer');
    expect(traveler2.travelerType).to.equal('thrill-seeker');
  });
});