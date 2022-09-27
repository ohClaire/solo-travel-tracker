// Import styles
import './css/styles.css';
import './css/modal.css';
import './images/travel-tracker-logo.webp';
import './images/profile.webp'

// Import local files
import { fetchData, postTripRequest } from './apiCalls.js';
import Traveler from './travelers/Traveler';
import Trip from './trips/Trip';
import DestinationsRepo from './destinations/DestinationsRepo';

// Global variables
let allDestinations;
let currentUser;

// Import third party libraries
import MicroModal from 'micromodal';

// Query Selectors
const username = document.getElementById('username');
const userSpending = document.getElementById('userSpending');
const previewDestination = document.getElementById('previewDestination');
const previewTripDate = document.getElementById('previewTripDate');
const previewDuration = document.getElementById('previewDuration');
const previewNumberOfPeople = document.getElementById('previewNumberOfPeople');
const previewTripCost = document.getElementById('previewTripCost');
const previewImage = document.getElementById('previewImage');
const pastTrips = document.getElementById('pastTrips');
const upcomingTrips = document.getElementById('upcomingTrips');
const pendingTrips = document.getElementById('pendingTrips');
const formTitle = document.getElementById('modalFormTitle');
const formDestinations = document.getElementById('formDestinations');
const tripRequestForm = document.getElementById('requestForm');
const bookTripBtn = document.getElementById('bookTripBtn');
const estimatedCost = document.getElementById('formEstimatedCost');
const getEstimatedCost = document.getElementById('getEstimatedCost');
const formTripDate = document.getElementById('formTripDate');
const formDestination = document.getElementById('formDestinations');
const formDuration = document.getElementById('formDuration');
const formNumOfTravelers = document.getElementById('formNumOfTravelers');
const tripsContainer = document.getElementById('tripsContainer');
const loginForm = document.getElementById('loginForm');
const usernameLogin = document.getElementById('usernameLogin');
const password = document.getElementById('password');
const loginPage = document.getElementById('loginPage');
const userPage = document.getElementById('userPage');
const invalidLogin = document.getElementById('invalidLogin');

// Event Listeners
window.addEventListener('load', () => startApplication());
tripRequestForm.addEventListener('change', () => handleButtonState());
tripRequestForm.addEventListener('submit', (event) => handleFormSubmit(event));
getEstimatedCost.addEventListener('click', () => handleCostEstimate());
tripsContainer.addEventListener('click', (event) => renderSelectedTrip(event))
loginForm.addEventListener('submit', (event) => handleLogin(event));

// Functions
const startApplication = () => {
  MicroModal.init();
}

const renderApplication = () => {
  if (!allDestinations) {
    fetchData('destinations')
      .then(data => {
        allDestinations = new DestinationsRepo(data.destinations);
        renderApplication();
      }).catch((error) => console.log('There was a problem retrieving your data.', error));

    return null;
  }

  if (currentUser && allDestinations) {
    renderUsername();
    renderDestinationChoices(allDestinations);
    renderTripsForUser();
    renderYearlySpending();
    renderMostRecentTrip();
  }
}
  

const renderUsername = () => {
  fetchData('trips')
    .then(data => {
      const traveler = new Traveler(currentUser, data.trips);
      username.innerText = traveler.name;
      formTitle.innerText = `Where would you like to go next, ${traveler.getFirstName()}?`;
    })
}

const renderDestinationChoices = () => {
  formDestinations.innerHTML = '<option value="" disabled selected>Select a destination</option>';
  allDestinations.destinationsData.forEach(object => {
    formDestinations.innerHTML += `<option value="${object.destination}">${object.destination}</option>`;
  });
}

const renderTripsForUser = () => {
  fetchData('trips')
    .then(data => {
      currentUser = new Traveler(currentUser, data.trips);
      pastTrips.innerHTML = '<h3 class="trip-title">Past Trips</h3>';
      upcomingTrips.innerHTML = '<h3 class="trip-title">Upcoming Trips</h3>';
      pendingTrips.innerHTML = '<h3 class="trip-title">Pending Trips</h3>';
      currentUser.listOfTrips.forEach(userTrip => {
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
    currentUser = new Traveler(currentUser, data.trips)
    const yearlySpending = currentUser.getYearlySpendingOnTrips(allDestinations);
    userSpending.innerText = `Total Spending this past year: $${yearlySpending}`;
  });
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
        userID: currentUser.id,
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
      event.target.reset();
      resetEstimatedCost();
    })
}

const resetEstimatedCost = () => {
  estimatedCost.innerText = '';
}

const handleCostEstimate = () => {
  fetchData('trips')
    .then(data => {
      currentUser = new Traveler(currentUser, data.trips);
      let userInputs = {
        destination: formDestination.value, 
        travelers: parseInt(formNumOfTravelers.value),
        duration: parseInt(formDuration.value),
      }
      const estimate = currentUser.getEstimatedCostForTrip(allDestinations.destinationsData, userInputs);
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

const renderMostRecentTrip = () => {
  fetchData('trips')
    .then(data => {
      const traveler = new Traveler(currentUser, data.trips);
      const mostRecentTrip = traveler.listOfTrips[0];
      const destination = allDestinations.getDestinationById(mostRecentTrip.destinationID)

      previewDestination.innerText = destination.destination;
      previewImage.src = destination.image;
      previewImage.alt = destination.alt;
      previewTripDate.innerText = mostRecentTrip.date;
      previewDuration.innerText = `${mostRecentTrip.duration} days`;
      previewNumberOfPeople.innerText = `${mostRecentTrip.travelers} travelers`;
      previewTripCost.innerText = `Cost $${traveler.getEstimatedCostForTrip(allDestinations.destinationsData, {
        destination: destination.destination, 
        travelers: parseInt(mostRecentTrip.travelers),
        duration: parseInt(mostRecentTrip.duration),
      })}`
    })
}
const renderSelectedTrip = (event) => {
  fetchData('trips') 
    .then(data => {
      const traveler = new Traveler(currentUser, data.trips);
      const getInnerText = event.target.innerText;
      const splitText = getInnerText.split(' ');
      const destinationName = splitText.slice(0, splitText.length - 2).join(' ');
      const destinationId = allDestinations.getDestinationIdByName(destinationName);
      const tripObj = traveler.listOfTrips.find(trip => trip.destinationID === destinationId)
      const destination = allDestinations.getDestinationById(destinationId);

      previewDestination.innerText = destination.destination;
      previewImage.src = destination.image;
      previewImage.alt = destination.alt;
      previewTripDate.innerText = tripObj.date;
      previewDuration.innerText = `${tripObj.duration} days`;
      previewNumberOfPeople.innerText = `${tripObj.travelers} travelers`;
      previewTripCost.innerText = `Cost $${traveler.getEstimatedCostForTrip(allDestinations.destinationsData, {
        destination: destinationName, 
        travelers: parseInt(tripObj.travelers),
        duration: parseInt(tripObj.duration),
      })}`
    })
}

const handleLogin = (event) => {
  event.preventDefault();
  if (usernameLogin.value === 'traveler50' && 
  password.value === 'travel') {
    loginPage.classList.add('hidden');
    userPage.classList.remove('hidden');
    event.target.reset();

    fetchData('travelers/50')
      .then(data => {
        currentUser = data;
        renderApplication();
      }).catch((error) => console.log('There was a problem retrieving your data.', error));
  } else {
    renderInvalidLogin();
    event.target.reset();
  }
}

const renderInvalidLogin = () => {
  invalidLogin.innerText = 'Invalid login. Please try again.'
  invalidLogin.classList.remove('hidden');
}
