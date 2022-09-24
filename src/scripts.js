// Import styles
import './css/styles.css';
import './css/modal.css';
import './images/travel-tracker-logo.webp';
import './images/profile.webp'

// Import local files
import { fetchAll } from './apiCalls.js';
import Traveler from './travelers/Traveler';
import TravelersRepo from './travelers/TravelersRepo';
import Destination from './destinations/Destination';
import DestinationsRepo from './destinations/DestinationsRepo';
import Trip from './trips/Trip';
import TripsRepo from './trips/TripsRepo';

// Import third party libraries
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);
import MicroModal from 'micromodal';  


// Global variables
const now = dayjs();
let allTravelers;
let allDestinations;
let allTrips;
let randomUser;
let tripsByUserId;

// modal
// const openModalButton = document.querySelector('[data-modal-target]');
// const closeModalButton = document.querySelector('[data-close-button]');
// const overlay = document.querySelector('#overlay');

// Query Selectors
const username = document.querySelector('#username');
const userSpending = document.querySelector('#userSpending');
// const travelerType = document.querySelector('#travelerType');
const pastTrips = document.querySelector('#pastTrips');
const upcomingTrips = document.querySelector('#upcomingTrips');
const pendingTrips = document.querySelector('#pendingTrips');
const formDestinations = document.querySelector('#formDestinations');

// Event Listeners
window.addEventListener('load', getData);
// overlay.addEventListener('click', () => {
//   closeModalButton();
// })
// openModalButton.addEventListener('click', () => {
//   //openModal()
//   if (modal === null) {
//     modal.classList.add('active')
//     overlay.classList.add('active')
//   }
// })

// closeModalButton.addEventListener('click', () => {
//   //closeModal()
//   if (modal == null) {
//     modal.classList.remove('active')
//     overlay.classList.remove('active')
//   }
// })
// Functions
function getData() {
  fetchAll()
  .then(data => {
    const [travelersData, destinationsData, tripsData] = data;
    allTravelers = new TravelersRepo(travelersData.travelers);
    allDestinations = new DestinationsRepo(destinationsData.destinations);
    allTrips = new TripsRepo(tripsData.trips);
    randomUser = new Traveler(travelersData.travelers[Math.floor(Math.random() * travelersData.travelers.length)]);
    
    return { randomUser }
  }).then( ({ randomUser }) => {
    renderApplication(randomUser);
  }).catch((error) => console.log('There was a problem retrieving your data.', error));
};

function renderApplication(user) {
  console.log('randomUser', user)

  renderUsername(user);
  renderTripsByUserId(user.id);
  // renderDestinationChoices();
  renderTotalSpending();

}

function renderUsername(user) {
  username.innerText = user.name;
}

function renderTripsByUserId(userID) {
  console.log(userID)

  tripsByUserId = allTrips.getTripsByUserId(userID).sort((a, b) => {
    return dayjs(a.date).isBefore(dayjs(b.date)) ? 1 : -1
  });
  console.log('tripsByUserId', tripsByUserId)
  
  tripsByUserId.forEach(tripObj => {
    const trip = new Trip(tripObj);
    // console.log(trip.date)
    // console.log(trip, 'trip instance')
    // const isDateValid = trip.validateDateFormat()
    const destinationObj = new Destination(allDestinations.getDestinationById(trip.destinationID));
    // console.log(destinationObj)
    if (trip.isPastTrip(now) && !trip.isPendingTrip()) {
      pastTrips.innerHTML += `<button class="trip">${destinationObj.destination}</button>`;
    } else if (trip.isUpcomingTrip(now) && !trip.isPendingTrip()) {
      upcomingTrips.innerHTML += `<button class="trip">${destinationObj.destination}</button>`;
    } else if (trip.isPendingTrip()) {
      pendingTrips.innerHTML += `<button class="trip">${destinationObj.destination}</button>`;
    }
  });
  // return sortedTrips
}

function renderDestinationChoices() {
  allDestinations.destinationsData.forEach(destination => {
    // formDestinations.innerHTML += `<option value="${destination.destination}">${destination.destination}</option>`
  })
}

function renderTotalSpending() {
  const trips = new TripsRepo(tripsByUserId);
  const getTotalSpending = trips.getTotalSpending(allDestinations, now);

  userSpending.innerText = `Total Spending: $${getTotalSpending}`;
}

