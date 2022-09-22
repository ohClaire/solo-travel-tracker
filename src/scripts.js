// Import styles
import './css/styles.css';
import './images/travel-tracker-logo.webp'

// Import local files
import { fetchAll } from './apiCalls.js';
import Traveler from './travelers/Traveler';
import TravelerRepo from './travelers/TravelersRepo';
import Destination from './destinations/Destination';
import DestinationsRepo from './destinations/DestinationsRepo';
import Trip from './trips/Trip';
import TripsRepo from './trips/TripsRepo';

// Import third party libraries
import dayjs from 'dayjs';

// Global variables
let travelersData, destinationsData, tripsData;
let currentsUser;
let travelerRepo

// Query Selectors
window.addEventListener('load', loadUserData);

// Functions
function loadUserData() {
  fetchAll()
  .then(data => {
    const [travelersData, destinationsData, tripsData] = data;
    travelerRepo = new TravelerRepo(travelersData, tripsData);
  })
}

function getCurrentDate() {
  return dayjs();
}