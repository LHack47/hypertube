import axios from 'axios';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE';

const requestLogin = creds => ({
  type: LOGIN_REQUEST,
  isFetching: true,
  isAuthenticated: false,
  creds,
});

const receiveLogin = () => ({
  type: LOGIN_SUCCESS,
  isFetching: false,
  isAuthenticated: true,
});

const loginError = message => ({
  type: LOGIN_FAILURE,
  isFetching: false,
  isAuthenticated: false,
  message,
});

const requestLogout = () => ({
  type: LOGOUT_REQUEST,
  isFetching: true,
  isAuthenticated: true,
});

const receiveLogout = () => ({
  type: LOGOUT_SUCCESS,
  isFetching: false,
  isAuthenticated: false,
});

// const logoutError = message => ({
//   type: LOGOUT_FAILURE,
//   isFetching: false,
//   isAuthenticated: true,
//   message,
// });

// login action function, calls the API to get a token
const loginUser = (creds, oauth = false) => (dispatch) => {
  dispatch(requestLogin(creds));

  let request;
  if (oauth) {
    request = axios.get(`/api/auth/${creds.provider}/callback?code=${creds.code}`);
  } else {
    request = axios.post('/api/signin', creds);
  }

  request.then(({ data: { error }, headers }) => {
    if (!error) {
      localStorage.setItem('x-access-token', headers['x-access-token']);
      localStorage.setItem('isAuthenticated', true);
      localStorage.setItem('lang-user', headers['lang-user']);
      axios.defaults.headers.common['x-access-token'] = headers['x-access-token'];
      dispatch(receiveLogin());
    } else {
      dispatch(loginError(error));
    }
  })
  .catch(err => console.log('Error: ', err));
};

// logout action function, remove local storage
const logoutUser = () => (dispatch) => {
  dispatch(requestLogout());
  localStorage.removeItem('x-access-token');
  localStorage.removeItem('isAuthenticated');
  localStorage.removeItem('lang-user');
  delete axios.defaults.headers.common['x-access-token'];
  dispatch(receiveLogout());
};

export {
  loginUser,
  logoutUser,
};
