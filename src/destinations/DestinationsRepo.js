class DestinationsRepo {
  constructor(destinationsData) {
    this.destinationsData = destinationsData;
  }

  getDestinationById(destinationId) {
    return this.destinationsData.find(destination => destination.id === destinationId);
  }

  getDestinationIdByName(locationName) {
    const destination = this.destinationsData.find(obj => obj.destination === locationName)
    return destination.id;
  }
};

export default DestinationsRepo;