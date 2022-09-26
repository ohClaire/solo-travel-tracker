class DestinationsRepo {
  constructor(destinationsData) {
    this.destinationsData = destinationsData;
    // console.log(this.destinationsData)
  }

  getDestinationById(destinationId) {
    return this.destinationsData.find(destination => destination.id === destinationId);
  }

  getDestinationIdByName (destinationName) {
    const findDestinationObj = this.destinationsData.find(obj => obj.destination === destinationName);

    return findDestinationObj.id;
  }
};

export default DestinationsRepo;