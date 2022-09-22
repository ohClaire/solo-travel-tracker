import { expect } from 'chai';
import Trip from '../Trip';
import TripsRepo from '../TripsRepo';
import tripsData from '../sample-tripsData';

describe('Trips Repository', () => {
  let trips;
  let allTrips;

  beforeEach( () => {
    trips = [
      new Trip(tripsData[0]),
      new Trip(tripsData[1])
    ];

    allTrips = new TripsRepo(trips);
  });

  it('should be a function', () => {
    expect(TripsRepo).to.be.a('function');
  });

  it('should be an instance of Trips Repository', () => {
    expect(allTrips).to.be.an.instanceOf(TripsRepo);
  });

  it('should store an array of trips', () => {
    expect(allTrips.tripsData).to.deep.equal(trips);
    expect(allTrips.tripsData.length).to.equal(2);
  });

  it('should store instances of Trip in the trips array', () => {
    expect(allTrips.tripsData[0]).to.be.an.instanceOf(Trip);
    expect(allTrips.tripsData[1]).to.be.an.instanceOf(Trip);
  });

  it('should return a trip object by its id', () => {
    expect(allTrips.getTripById(1)).to.deep.equal({
      id: 1,
      userID: 44,
      destinationID: 49,
      travelers: 1,
      date: "2022-09-16",
      duration: 8,
      status: "approved",
      suggestedActivities: [ ]
    });
  });

  it('should not return a trip if id is not found', () => {
    expect(allTrips.getTripById(204)).to.equal(undefined);
  });

  it('should return an array of trips by a userID', () => {
    expect(allTrips.getTripsByUserId(44)).to.deep.equal([
      {
        id: 1,
        userID: 44,
        destinationID: 49,
        travelers: 1,
        date: "2022-09-16",
        duration: 8,
        status: "approved",
        suggestedActivities: [ ]
      }
    ]);
    expect(allTrips.getTripsByUserId(38)).to.deep.equal([
      {
        id: 71,
        userID: 38,
        destinationID: 28,
        travelers: 1,
        date: "2020-05-26",
        duration: 11,
        status: "pending",
        suggestedActivities: [ ]
      }
    ]);
  });

  it('should tell user if there are no trips found for given userID', () => {
    expect(allTrips.getTripsByUserId(51)).to.equal('No trips found for this userID.');
  });

  it('should return an array of trips by a destinationID', () => {
    expect(allTrips.getTripsByDestinationId(49)).to.deep.equal([
      {
        id: 1,
        userID: 44,
        destinationID: 49,
        travelers: 1,
        date: "2022-09-16",
        duration: 8,
        status: "approved",
        suggestedActivities: [ ]
      }
    ]);
    expect(allTrips.getTripsByDestinationId(28)).to.deep.equal([
      {
        id: 71,
        userID: 38,
        destinationID: 28,
        travelers: 1,
        date: "2020-05-26",
        duration: 11,
        status: "pending",
        suggestedActivities: [ ]
      }
    ]);
  });

  it('should tell user if there are no trips found for given destinationID', () => {
    expect(allTrips.getTripsByDestinationId(51)).to.equal('No trips found for this destinationID.');
  });

  it('should trips by given status', () => {
    expect(allTrips.getTripsByStatus('approved')).to.deep.equal([
      {
        id: 1,
        userID: 44,
        destinationID: 49,
        travelers: 1,
        date: "2022-09-16",
        duration: 8,
        status: "approved",
        suggestedActivities: [ ]
      }
    ]);
    expect(allTrips.getTripsByStatus('pending')).to.deep.equal([      
      {
        id: 71,
        userID: 38,
        destinationID: 28,
        travelers: 1,
        date: "2020-05-26",
        duration: 11,
        status: "pending",
        suggestedActivities: [ ]
      }
    ]);
  });

  it('should tell user if there are no trips found for given status', () => {
    expect(allTrips.getTripsByStatus('upcoming')).to.equal('No trips found with this status.');
  });

  it('should sort trips in reverse chrological order by year, month, then day', () => {
    expect(allTrips.sortTripsByDate()).to.deep.equal([
      {
        id: 1,
        userID: 44,
        destinationID: 49,
        travelers: 1,
        date: "2022-09-16",
        duration: 8,
        status: "approved",
        suggestedActivities: [ ]
      },
      {
        id: 71,
        userID: 38,
        destinationID: 28,
        travelers: 1,
        date: "2020-05-26",
        duration: 11,
        status: "pending",
        suggestedActivities: [ ]
      }
    ]);
  });
});


