const fetchData = (fileName) => {
  return fetch(`http://localhost:3001/api/v1/${fileName}`)
    .then((response) => response.json())
    .catch((error) =>
      console.log(
        'There was a problem loading your data. Please try again.',
        error
      )
    );
};

export const fetchAll = () => {
  const travelersData = fetchData('travelers');
  const destinationsData = fetchData('destinations');
  const tripsData = fetchData('trips');
  return Promise.all([
    travelersData,
    destinationsData,
    tripsData,
  ]);
};

