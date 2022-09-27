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
let allDestinations;
let randomUser;

// Import third party libraries
import MicroModal from 'micromodal';  

// Query Selectors
const username = document.getElementById('username');
const userSpending = document.getElementById('userSpending');
const pastTrips = document.getElementById('pastTrips');
const upcomingTrips = document.getElementById('upcomingTrips');
const pendingTrips = document.getElementById('pendingTrips');
const formTitle = document.getElementById('modalFormTitle');
const formDestinations = document.getElementById('formDestinations');
const tripRequestForm = document.getElementById('requestForm');
const bookTripBtn = document.getElementById('bookTripBtn');
const cancelBookingBtn = document.getElementById('cancelBookingBtn');
const estimatedCost = document.getElementById('formEstimatedCost');
const getEstimatedCost = document.getElementById('getEstimatedCost');
const formTripDate = document.querySelector('#formTripDate');
const formDestination = document.querySelector('#formDestinations');
const formDuration = document.querySelector('#formDuration');
const formNumOfTravelers = document.querySelector('#formNumOfTravelers');

// Event Listeners
window.addEventListener('load', () => renderApplication());
tripRequestForm.addEventListener('change', () => handleButtonState());
tripRequestForm.addEventListener('submit', (event) => handleFormSubmit(event));
getEstimatedCost.addEventListener('click', () => handleCostEstimate());
cancelBookingBtn.addEventListener('click', () => resetForm());

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
      formTitle.innerText = `Where would you like to go next, ${traveler.getFirstName()}?`
    })
}

const renderDestinationChoices = () => {
  formDestinations.innerHTML = '<option value="" disabled selected>Select a destination</option>';
  fetchData('destinations')
    .then(data => {
      data.destinations.forEach(object => {
        formDestinations.innerHTML += `<option value="${object.destination}">${object.destination}</option>`;
      });
    }).catch(err => console.log('There was a problem retrieving your data', err))
}

const renderTripsForUser = () => {
  fetchData('trips')
    .then(data => {
      const traveler = new Traveler(randomUser, data.trips);
      pastTrips.innerHTML = '<h3 class="trip-title">Past Trips</h3>';
      upcomingTrips.innerHTML = '<h3 class="trip-title">Upcoming Trips</h3>';
      pendingTrips.innerHTML = '<h3 class="trip-title">Pending Trips</h3>';
      traveler.listOfTrips.forEach(userTrip => {
        const trip = new Trip(userTrip);
        const tripDestination = allDestinations.getDestinationById(trip.destinationID);

        if (trip.isPastTrip() && !trip.isPendingTrip()) {
          pastTrips.innerHTML += `<button class="trip__btn">${tripDestination.destination} on ${trip.date}</button>`;
        } else if (trip.isUpcomingTrip() && !trip.isPendingTrip()) {
          upcomingTrips.innerHTML += `<button class="trip__btn">${tripDestination.destination} on ${trip.date}</button>`;
        } else if (trip.isPendingTrip()) {
          pendingTrips.innerHTML += `<button class="trip__btn">${tripDestination.destination} on ${trip.date}</button>`;
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
      handleButtonState();
      resetForm();
      resetEstimatedCost();
    })
}

const resetForm = () => {
  tripRequestForm.reset();
}

const resetEstimatedCost = () => {
  estimatedCost.innerText = '';
}

const handleCostEstimate = () => {
  fetchData('trips')
    .then(data => {
      const traveler = new Traveler(randomUser, data.trips);
      // let tripsLength = data.trips.length;
      let userInputs = {
        destinationID: formDestination.value, 
        travelers: parseInt(formNumOfTravelers.value),
        date: changeDateFormat(formTripDate.value),
        duration: parseInt(formDuration.value),
      }
      const estimate = traveler.getEstimatedCostForTrip(allDestinations.destinationsData, userInputs);
      renderCostEstimate(estimate);
    })
}

const renderCostEstimate = (estimate) => {
  estimatedCost.innerHTML = `<h3>Estimated Cost: $${estimate}</h3>`;
}

const handleButtonState = () => {
  if (
    formTripDate.value === "" ||
    formDestination.value === "" ||
    formDuration.value === "" ||
    formNumOfTravelers.value === ""
  ) {
    bookTripBtn.disabled = true;
    getEstimatedCost.disabled = true;
  } else {
    bookTripBtn.disabled = false;
    getEstimatedCost.disabled = false;
  }
}


