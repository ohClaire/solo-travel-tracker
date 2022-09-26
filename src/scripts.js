// Import styles
import './css/styles.css';
import './css/modal.css';
import './images/travel-tracker-logo.webp';
import './images/profile.webp'

// Import local files
import { fetchData, fetchAll, postTripRequest } from './apiCalls.js';
import Traveler from './travelers/Traveler';
// import Destination from './destinations/Destination';
import Trip from './trips/Trip';
import DestinationsRepo from './destinations/DestinationsRepo';

// Global variables
// const isBetween = require('dayjs/plugin/isBetween');
let allDestinations;
let randomUser;


// Import third party libraries
// import dayjs from 'dayjs';
// import customParseFormat from 'dayjs/plugin/customParseFormat';
// dayjs.extend(isBetween);
// dayjs.extend(customParseFormat);
import MicroModal from 'micromodal';  

// Query Selectors
const username = document.getElementById('username');
const userSpending = document.getElementById('userSpending');
const pastTrips = document.getElementById('pastTrips');
const upcomingTrips = document.getElementById('upcomingTrips');
const pendingTrips = document.getElementById('pendingTrips');
const formTitle = document.getElementById('modalFormTitle');
const formDestinations = document.getElementById('formDestinations');
const submitForm = document.getElementById('requestForm');
const estimatedCost = document.getElementById('formEstimatedCost');
const getEstimatedCost = document.getElementById('getEstimatedCost');
const formTripDate = document.querySelector('#formTripDate');
const formDestination = document.querySelector('#formDestinations');
const formDuration = document.querySelector('#formDuration');
const formNumOfTravelers = document.querySelector('#formNumOfTravelers');

// Event Listeners
window.addEventListener('load', () => renderApplication());
submitForm.addEventListener('submit', (event) => handleFormSubmit(event));
getEstimatedCost.addEventListener('click', () => handleCostEstimate());

const renderApplication = () => {
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
  renderUsername();
  renderDestinationChoices();
  renderTripsForUser();
  renderYearlySpending();
}

const renderUsername = () => {
  fetchData('trips')
    .then(data => {
      const traveler = new Traveler(randomUser, data.trips) 
      username.innerText = traveler.name;
      formTitle.innerText = `Where would you like to go on your next trip, ${traveler.getFirstName()}?`
    })
}

const renderDestinationChoices = () => {
  formDestinations.innerHTML = '<option value="" disabled selected>Select a destination</option>';
  allDestinations.destinationsData.forEach(data => {
    const destinationName = data.destination;
    formDestinations.innerHTML += `<option value="${destinationName}">${destinationName}</option>`;
  });
}

const renderTripsForUser = () => {
  fetchData('trips')
    .then(data => {
      const traveler = new Traveler(randomUser, data.trips);
      pastTrips.innerHTML = '<h3>Past Trips</h3>';
      upcomingTrips.innerHTML = '<h3>Upcoming Trips</h3>';
      pendingTrips.innerHTML = '<h3>Pending Trips</h3>';
      traveler.listOfTrips.forEach(userTrip => {
        const trip = new Trip(userTrip);
        const tripDestination = allDestinations.getDestinationById(trip.destinationID);

        if (trip.isPastTrip() && !trip.isPendingTrip()) {
          pastTrips.innerHTML += `<button class="trip-btn">${tripDestination.destination} on ${trip.date}</button>`;
        } else if (trip.isUpcomingTrip() && !trip.isPendingTrip()) {
          upcomingTrips.innerHTML += `<button class="trip-btn">${tripDestination.destination} on ${trip.date}</button>`;
        } else if (trip.isPendingTrip()) {
          pendingTrips.innerHTML += `<button class="trip-btn">${tripDestination.destination} on ${trip.date}</button>`;
        }
      });
    }).catch(err => console.log('There was a problem retrieving your data', err))
}

const renderYearlySpending = () => {
  fetchData('trips')
    .then(data => {
      const traveler = new Traveler(randomUser, data.trips)
      const yearlySpending = traveler.getYearlySpendingOnTrips(allDestinations);

      userSpending.innerText = `Total Spending this past year: $${yearlySpending}`;
    }).catch(err => console.log('There was a problem retrieving your data', err))
}

const changeDateFormat = (date) => {
  return date.split('-').join('/');
}

const handleFormSubmit = (event) => {
  event.preventDefault();
  fetchData('trips')
    .then(data => {
      let tripsLength = data.trips.length;
      let formData = {
        id: tripsLength + 1,
        userID: randomUser.id,
        destinationID: allDestinations.getDestinationIdByName(formDestination.value),
        travelers: parseInt(formNumOfTravelers.value),
        date: changeDateFormat(formTripDate.value),
        duration: parseInt(formDuration.value),
        status: 'pending',
        suggestedActivities: [],
      }
      return formData;
    }).then(formData => {
      postTripRequest(formData);
      renderApplication();
      event.target.reset();
    })
}

const handleCostEstimate = () => {
  fetchData('trips')
    .then(data => {
      const traveler = new Traveler(randomUser, data.trips);
      let tripsLength = data.trips.length;
      let formData = {
        id: tripsLength + 1,
        userID: randomUser.id,
        destinationID: allDestinations.getDestinationIdByName(formDestination.value),
        travelers: parseInt(formNumOfTravelers.value),
        date: changeDateFormat(formTripDate.value),
        duration: parseInt(formDuration.value),
        status: 'pending',
        suggestedActivities: [],
      }
      return {traveler, formData};
    }).then(({traveler, formData}) => {
      const estimate = traveler.getEstimatedCostForTrip(allDestinations.destinationsData, formData);
      renderCostEstimate(estimate);
    })
}

const renderCostEstimate = (estimate) => {
  estimatedCost.innerHTML += `<h3>Estimated Cost: $${estimate}</h3>`;
}

