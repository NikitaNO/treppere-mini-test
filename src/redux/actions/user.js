import { message } from 'antd';

export const userConst = {
  CREATE_USER: 'CREATE_USER',
  CREATE_USER_SUCCESS: 'CREATE_USER_SUCCESS',

  USER_ERROR: 'USER_ERROR'
};

export const createUser = (promiseAction, userData) => (dispatch) => {
  message.destroy();
  message.loading('User data is saving..', 60);
  dispatch({
    type: userConst.CREATE_USER
  });

  return new Promise((resolve, reject) => promiseAction(userData)
    .then(res => {
      message.destroy();
      message.success('User data is saved.', 5);
      const {dateOfBirth, firstName, lastName, gender} = res.data.createUser;
      dispatch({
        type: userConst.CREATE_USER_SUCCESS,
        payload: {
          date_of_birth: dateOfBirth || new Date(),
          first_name: firstName || '',
          last_name: lastName || '',
          gender: gender || 'Male'
        }
      });

      resolve(res);
    })
    .catch(err => {
      message.destroy();
      message.error('User data saving is failed.', 5);
      dispatch({
        type: userConst.USER_ERROR,
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
    })
  );
};
