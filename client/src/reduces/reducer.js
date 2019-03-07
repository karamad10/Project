import services from '../services/GetInfo';

const initState = {
  houses: [],
  loading: true
};

services
  .getMainInfo()
  .then(
    Response => initState.houses.splice(0, initState.houses.length, ...Response),
    (initState.loading = true)
  );

// services.addItem().then(Response => console.log(Response));

const reducer = (state = initState, action) => {
  return state;
};

export default reducer;
