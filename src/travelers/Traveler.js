class Traveler {
  constructor(userDetails) {
    this.id = userDetails.id;
    this.name = userDetails.name;
    this.travelerType = userDetails.travelerType;
  }

  getFirstName() {
    const splitName = this.name.split(' ');
    
    return splitName[0];
  }
};

export default Traveler;