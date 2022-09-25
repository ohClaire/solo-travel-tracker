class DestinationsRepo {
  constructor(destinationsData) {
    this.destinationsData = destinationsData;
    // console.log(this.destinationsData)
  }

  getDestinationById(destinationId) {
    return this.destinationsData.find(destination => destination.id === destinationId);
  }
};

export default DestinationsRepo;