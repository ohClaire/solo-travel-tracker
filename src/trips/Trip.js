import dayjs from 'dayjs'; 

class Trip {
  constructor(tripDetails) {
    this.id = tripDetails.id;
    this.userID = tripDetails.userID;
    this.destinationID = tripDetails.destinationID;
    this.travelers = tripDetails.travelers;
    this.date = this.convertDateFormat(tripDetails.date);
    this.duration = tripDetails.duration;
    this.status = tripDetails.status || "pending";
    this.suggestedActivities = tripDetails.suggestedActivities;
  }

  convertDateFormat(date) {
    const slicedDate = date.slice(0, 10);
    return slicedDate.split('/').join('-');
  }

  validateDateFormat(date) {
    const isDateValid = dayjs(this.date, 'YYYY-MM-DD').isValid();

    if (!isDateValid) {
      return "Use the 'YYYY-MM-DD' format for your date.";
    } else {
      return isDateValid;
    }
  }

  isPastTrip(now) {
    // console.log(dayjs(this.date).isBefore(now), 'is a past trip')
    return dayjs(this.date).isBefore(now);
  }

  isUpcomingTrip(now) {
    // console.log(dayjs(this.date).isAfter(now), 'is an upcoming trip')
    return dayjs(this.date).isAfter(now);
  }
  
  isPendingTrip() {
    // console.log(this.status === 'pending', 'is pending')
    return this.status === 'pending' 
  }
}

export default Trip;