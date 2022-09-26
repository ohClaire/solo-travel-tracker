class DestinationsRepo {
  constructor(destinationsData) {
    this.destinationsData = destinationsData;
  }

  getDestinationById(destinationId) {
    return this.destinationsData.find(destination => destination.id === destinationId);
  }
};

export default DestinationsRepo;