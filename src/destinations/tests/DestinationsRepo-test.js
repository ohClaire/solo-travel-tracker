import { expect } from 'chai';
import Destination from '../Destination';
import DestinationsRepo from '../DestinationsRepo';
import destinationsData from '../sample-destinationsData';

describe('Destinations Repository', () => {
  let locations;
  let allLocations;

  beforeEach( () => {
    locations = [
      new Destination(destinationsData[0]),
      new Destination(destinationsData[1])
    ];

    allLocations = new DestinationsRepo(locations);
  });

  it('should be a function', () => {
    expect(DestinationsRepo).to.be.a('function');
  });

  it('should be an instance of Destinations Repository', () => {
    expect(allLocations).to.be.an.instanceOf(DestinationsRepo);
  });

  it('should store an array of destinations', () => {
    expect(allLocations.destinationsData).to.deep.equal(locations);
    expect(allLocations.destinationsData.length).to.equal(2);
  });

  it('should store instances of Destination in the locations array', () => {
    expect(allLocations.destinationsData[0]).to.be.an.instanceOf(Destination);
    expect(allLocations.destinationsData[1]).to.be.an.instanceOf(Destination);
  });

  it('should return a destination object by its id', () => {
    expect(allLocations.getDestinationById(1)).to.deep.equal(destinationsData[0]);
  });

  it('should not return a destination object if id does not exist', () => {
    expect(allLocations.getDestinationById(51)).to.equal(undefined);
  });
});