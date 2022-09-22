import dayjs from 'dayjs';

class TripsRepo {
  constructor(tripsData) {
    this.tripsData = tripsData;
  }

  getTripById(tripID) {
    return this.tripsData.find(trip => trip.id === tripID);
  }

  getTripsByUserId(userID) {  
    const listOfTrips = this.tripsData.filter(trip => trip.userID === userID);

    if (listOfTrips.length === 0) {
      return 'No trips found for this userID.';
    } else {
      return listOfTrips;
    }
  }

  getTripsByDestinationId(destinationID) {
    const listOfTrips = this.tripsData.filter(trip => trip.destinationID === destinationID);

    if (listOfTrips.length === 0) {
      return 'No trips found for this destinationID.';
    } else {
      return listOfTrips;
    }
  }

  getTripsByStatus(status) {
     const listOfTrips = this.tripsData.filter(trip => trip.status === status);

     if (listOfTrips.length === 0) {
      return 'No trips found with this status.';
     } else {
      return listOfTrips;
     }
  }

  sortTripsByDate() {
    const sortedTrips = this.tripsData.sort((first, last) => {
      return dayjs(last.date) - dayjs(first.date);
    });

    return sortedTrips;
  }
};


export default TripsRepo;