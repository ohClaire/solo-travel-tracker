class Destination {
  constructor(destinationDetails) {
    this.id = destinationDetails.id;
    this.destination = destinationDetails.destination;
    this.estimatedLodgingCostPerDay = destinationDetails.estimatedLodgingCostPerDay;
    this.estimatedFlightCostPerPerson = destinationDetails.estimatedFlightCostPerPerson;
    this.image = destinationDetails.image;
    this.alt = destinationDetails.alt;
  }
  
  getDestinationIdByName(locationName) {
    if (this.destination === locationName) {
      return this.id;
    }
  }

  getTotalCostOfLodging(duration) {
    // console.log(this.estimatedLodgingCostPerDay, duration)
    return this.estimatedLodgingCostPerDay * duration;
  }

  getTotalCostOfFlights(numOfTravelers) {
    // console.log(this.estimatedFlightCostPerPerson, numOfTravelers);
    return this.estimatedFlightCostPerPerson * numOfTravelers;
  }
};

export default Destination;