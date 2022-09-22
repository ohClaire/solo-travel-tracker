import dayjs from 'dayjs'; 

class Trip {
  constructor(tripDetails) {
    this.id = tripDetails.id;
    this.userID = tripDetails.userID;
    this.destinationID = tripDetails.destinationID;
    this.travelers = tripDetails.travelers;
    this.date = this.convertedDateFormat(tripDetails.date);
    this.duration = tripDetails.duration;
    this.status = tripDetails.status || "pending";
    this.suggestedActivities = tripDetails.suggestedActivities;
  }

  convertedDateFormat(date) {
    return date.split('/').join('-');
  }

  validateDateFormat() {
    const isDateValid = dayjs(this.date, 'YYYY-MM-DD').isValid();

    if (!isDateValid) {
      return "Use the 'YYYY-MM-DD' format for your date.";
    } else {
      return isDateValid;
    }
  }
}

export default Trip;