import { message } from 'antd';

export const user = {
  GET_USER: 'GET_USER',
  GET_USER_SUCCESS: 'GET_USER_SUCCESS',

  CREATE_USER: 'CREATE_USER',
  CREATE_USER_SUCCESS: 'CREATE_USER_SUCCESS',

  USER_ERROR: 'USER_ERROR'
};

export const getUser = () => (dispatch) => {
  dispatch({
    type: user.GET_USER
  });

  message.loading('User data is fetching..', 60000);
  // message.error('User data fetching is failed.', 5000);
  // message.success('User data is fetched.', 5000);
  // message.destroy(); // on error of success action

  return new Promise((resolve, reject) => {

  })
};

export const createUser = () => (dispatch) => {
  dispatch({
    type: user.CREATE_USER
  });

  message.loading('User data is saving..', 60000);
  // message.error('User data saving is failed.', 5000);
  // message.success('User data is saved.', 5000);
  // message.destroy(); // on error of success action

  return new Promise((resolve, reject) => {

  })
};
