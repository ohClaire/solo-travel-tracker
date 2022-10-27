const errorMessage = document.getElementById('postErrorMessage');

export const fetchData = (fileName) => {
  return fetch(
    `https://travel-tracker-qotghu8qo-ohclaire.vercel.app/api/v1/${fileName}`
  )
    .then((response) => response.json())
    .catch((error) =>
      console.log(
        'There was a problem loading your data. Please try again.',
        error
      )
    );
};

export const postTripRequest = (formData) => {
  fetch('https://travel-tracker-qotghu8qo-ohclaire.vercel.app/api/v1/trips', {
    method: 'POST',
    body: JSON.stringify(formData),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.message) {
        console.log(data.message);
        displayErrorMessage(data);
      }
    })
    .catch((err) => displayErrorMessage(err));
};

const displayErrorMessage = (data) => {
  if (!data.message.includes('successfully posted')) {
    errorMessage.innerText = `There was an issue processing your request. ${data.message}`;
  }
  errorMessage.classList.remove('hidden');
};
