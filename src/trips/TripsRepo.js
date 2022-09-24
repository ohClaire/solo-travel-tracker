import dayjs from 'dayjs';
import Trip from './Trip';
import Destination from '../destinations/Destination';

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

  
  getTotalSpending(destinationsData, now) {
    const userSpending = this.tripsData.reduce((sum, tripObj) => {
      const trip = new Trip(tripObj);
      const destinationObj = new Destination(destinationsData.getDestinationById(trip.destinationID));
      const totalLodgingCost = destinationObj.getTotalCostOfLodging(trip.duration);
      const totalFlightCost = destinationObj.getTotalCostOfFlights(trip.travelers);
      const totalSpending = totalLodgingCost + totalFlightCost;

      console.log(trip.isPastTrip(now))
      if (trip.status === 'approved' && trip.isPastTrip(now)) {
        sum += totalSpending;
      }

      return sum;
    }, 0);

    const agentFee = userSpending * .10;
    const total = userSpending + agentFee;

    return total.toLocaleString("en-US");
  };
};


export default TripsRepo;