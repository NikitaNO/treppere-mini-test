import { userConst } from '../actions';

const initialState = {
  user: {
    id: '',
    first_name: '',
    last_name: '',
    gender: 'male',
    date_of_birth: new Date()
  },
  in_request: false,
  error: null
};

/* eslint-disable import/prefer-default-export */
export const user = (state = initialState, action) => {
  switch (action.type) {
    // GET
    case userConst.GET_USER:
      return {
        ...state,
        in_request: true,
        error: null
      };
    case userConst.GET_USER_SUCCESS:
      return {
        ...state,
        user: action.payload,
        in_request: false,
        error: null
      };

    // CREATE
    case userConst.CREATE_USER:
      return {
        ...state,
        in_request: true,
        error: null
      };
    case userConst.CREATE_USER_SUCCESS:
      return {
        ...state,
        user: action.payload,
        in_request: false,
        error: null
      };

    // ERROR
    case userConst.USER_ERROR:
      return {
        ...state,
        in_request: false,
        error: action.payload.error,
        user: action.payload.user
      };
    default:
      return state;
  }
};
