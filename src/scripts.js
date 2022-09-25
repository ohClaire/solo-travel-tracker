// Import styles
import './css/styles.css';
import './css/modal.css';
import './images/travel-tracker-logo.webp';
import './images/profile.webp'

// Import local files
import { fetchData, fetchAll, postData } from './apiCalls.js';
import Traveler from './travelers/Traveler';
import Destination from './destinations/Destination';
import Trip from './trips/Trip';
import DestinationsRepo from './destinations/DestinationsRepo';

// Global variables
const isBetween = require('dayjs/plugin/isBetween');
// let allTravelers;
let allDestinations
// let allTrips;
let randomUser;


// Import third party libraries
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(isBetween);
dayjs.extend(customParseFormat);
import MicroModal from 'micromodal';  

// Query Selectors
const username = document.querySelector('#username');
const userSpending = document.querySelector('#userSpending');
// const travelerType = document.querySelector('#travelerType');
const pastTrips = document.querySelector('#pastTrips');
const upcomingTrips = document.querySelector('#upcomingTrips');
const pendingTrips = document.querySelector('#pendingTrips');
const formDestinations = document.querySelector('#formDestinations');

// Event Listeners
window.addEventListener('load', renderApplication);


// Functions
// function getData() {
//   fetchAll()
//   .then(data => {
//     const destinationsData = data;
//     allTrips = new TripsRepo(tripsData.trips);
//     allTravelers = new TravelersRepo(travelersData.travelers, allTrips);
//     allDestinations = new DestinationsRepo(destinationsData.destinations);
  
//     randomUser = new Traveler(travelersData.travelers[Math.floor(Math.random() * travelersData.travelers.length)], allTrips);
    
//     return { randomUser }
//   }).then( ({ randomUser }) => {
//     renderApplication(randomUser);
//   }).catch((error) => console.log('There was a problem retrieving your data.', error));
// };

function renderApplication() {
  MicroModal.init();

  if (!randomUser) {
    fetchData('travelers')
      .then(data => {
        randomUser = data.travelers[Math.floor(Math.random() * data.travelers.length)];
        renderApplication();
      }).catch(err => console.log('There was a problem retrieving your data', err));
    return null;
  }
  if (!allDestinations) {
    fetchData('destinations')
      .then(data => {
        allDestinations = new DestinationsRepo(data.destinations);
        renderApplication();
      }).catch(err => console.log('There was a problem retrieving your data', err))
      
    return null;
  }
  console.log(randomUser, allDestinations)
  renderUsername();
  renderDestinationChoices();
  renderTripsForUser();
  renderYearlySpending();
}

function renderUsername() {
  username.innerText = randomUser.name;
}

function renderDestinationChoices() {
  allDestinations.destinationsData.forEach(data => {
  const destinationName = data.destination
    formDestinations.innerHTML += `<option value="${destinationName}">${destinationName}</option>`;
  });
  // show destinations in the main content?
}

function renderTripsForUser() {
  fetchData('trips')
    .then(data => {
      const traveler = new Traveler(randomUser, data.trips);

      traveler.listOfTrips.forEach(userTrip => {
        const trip = new Trip(userTrip);
        const tripDestination = allDestinations.getDestinationById(trip.destinationID);

        if (trip.isPastTrip() && !trip.isPendingTrip()) {
          pastTrips.innerHTML += `<button class="trip">${tripDestination.destination} on ${trip.date}</button>`;
        } else if (trip.isUpcomingTrip() && !trip.isPendingTrip()) {
          upcomingTrips.innerHTML += `<button class="trip">${tripDestination.destination} on ${trip.date}</button>`;
        } else if (trip.isPendingTrip()) {
          pendingTrips.innerHTML += `<button class="trip">${tripDestination.destination} on ${trip.date}</button>`;
        }
      });
    }).catch(err => console.log('There was a problem retrieving your data', err))
}

function renderYearlySpending() {
  fetchData('trips')
    .then(data => {
      const traveler = new Traveler(randomUser, data.trips)
      console.log(traveler)
      const yearlySpending = traveler.getYearlySpendingOnTrips(allDestinations);

      userSpending.innerText = `Total Spending this past year: $${yearlySpending}`;
    }).catch(err => console.log('There was a problem retrieving your data', err))
}


