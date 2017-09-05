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

export const createUser = (promiseAction, userData) => (dispatch) => {
  message.destroy();
  message.loading('User data is saving..', 60);
  dispatch({
    type: user.CREATE_USER
  });

  return promiseAction(userData)
    .then(res => {
      message.destroy();
      message.success('User data is saved.', 5);
      const { dateOfBirth, firstName, lastName, gender } = res.data.createUser;
      dispatch({
        type: user.CREATE_USER_SUCCESS,
        payload: {
          date_of_birth: dateOfBirth || new Date(),
          first_name: firstName || '',
          last_name: lastName || '',
          gender: gender || 'Male'
        }
      });

      return res;
    })
    .catch(err => {
      message.destroy();
      message.error('User data saving is failed.', 5);
      dispatch({
        type: user.USER_ERROR,
        payload: {
          user: {
            date_of_birth: userData.dateOfBirth,
            first_name: userData.firstName,
            last_name: userData.lastName,
            gender: userData.gender
          },
          error: err
        }
      });
      console.error(err);
    });
};
