import dayjs from 'dayjs';
import Trip from '../trips/Trip';
import Destination from '../destinations/Destination';

class Traveler {
  constructor(userDetails, tripsData) {
    this.id = userDetails.id;
    this.name = userDetails.name;
    this.travelerType = userDetails.travelerType;
    this.listOfTrips = this.sortTripsByDate(tripsData);
  }

  getFirstName() {
    const splitName = this.name.split(' ');
    return splitName[0]
  }

  getYearlySpendingOnTrips(data) {
    const userSpending = this.listOfTrips.reduce((sum, userTrip) => {
      const trip = new Trip(userTrip);
      const tripDestination = new Destination(data.getDestinationById(trip.destinationID));
      const totalLodgingCost = tripDestination.getTotalCostOfLodging(trip.duration);
      const totalFlightCost = tripDestination.getTotalCostOfFlights(trip.numOfTravelers);
      const totalSpending = totalLodgingCost + totalFlightCost;
      console.log(trip.isBetweenAYear(), 'calculate spending for this trip')
      if (trip.status === 'approved' && trip.isBetweenAYear()) {
        sum += totalSpending;
      }
      
      return sum;
    }, 0);

    const agentFee = userSpending * .10;
    const total = userSpending + agentFee;

    return total.toLocaleString("en-US");
  }

  sortTripsByDate(tripsData) {
    const sortedTrips = tripsData
      .filter(trip => trip.userID === this.id)
      .sort((first, last) => {
        return dayjs(last.date) - dayjs(first.date);
      });

    return sortedTrips;
  }

  getEstimatedCostForTrip(listOfDestinations, userInputs) {
    const destination = new Destination(listOfDestinations.find(d => d.id === userInputs.destinationID))
    console.log(destination)
    const estimatedLogdingCost = destination.getTotalCostOfLodging(userInputs.duration);
    const estimatedFlightCost = destination.getTotalCostOfFlights(userInputs.travelers);
    const tripEstimate = estimatedLogdingCost + estimatedFlightCost;
    const agentFee = tripEstimate * .10;
    const totalEstimate = tripEstimate + agentFee;
    console.log(totalEstimate)

    return totalEstimate.toLocaleString("en-US");
  }
};

export default Traveler;