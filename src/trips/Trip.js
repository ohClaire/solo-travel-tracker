import dayjs from 'dayjs'; 
const isBetween = require('dayjs/plugin/isBetween');
dayjs.extend(isBetween);

class Trip {
  constructor(tripDetails) {
    this.id = tripDetails.id;
    this.userID = tripDetails.userID;
    this.destinationID = tripDetails.destinationID;
    this.numOfTravelers = tripDetails.travelers;
    this.date = this.getDate(tripDetails.date);
    this.duration = tripDetails.duration;
    this.status = tripDetails.status || "pending";
    this.suggestedActivities = tripDetails.suggestedActivities;
  }

  getDate(date) {
    return date.slice(0, 10);
  }

  isPastTrip() {
    return dayjs(this.date).isBefore(dayjs());
  }

  isUpcomingTrip() {
    return dayjs(this.date).isAfter(dayjs());
  }
  
  isPendingTrip() {
    return this.status === 'pending'; 
  }

  isBetweenAYear() {
    const dateNow = dayjs();
    const yearNow = dayjs().year();
    const dateAYearAgo = dayjs().set('year', yearNow - 1);
    
    return dayjs(this.date).isBetween(dateAYearAgo, dateNow);
  }
}

export default Trip;