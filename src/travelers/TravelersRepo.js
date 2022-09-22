class TravelersRepo {
  constructor(travelersData) {
    this.travelersData = travelersData;
  }

  getUserData(userID) {
    return this.travelersData.find(user => user.id === userID);
  }
};

export default TravelersRepo;


