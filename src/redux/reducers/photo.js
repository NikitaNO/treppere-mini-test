import { photoConst } from '../actions';

const initialState = {
  photos: ['','',''],
  in_request: false,
  error: null
};

/* eslint-disable import/prefer-default-export */
export const photo = (state = initialState, action) => {
  switch (action.type) {
    case photoConst.UPLOAD_PHOTO:
      return {
        ...state,
        in_request: true,
        error: null
      };
    case photoConst.UPLOAD_PHOTO_SUCCESS:
      let photos = [...state.photos];
      photos[action.payload.index] = action.payload.photo;

      return {
        ...state,
        photos,
        in_request: false,
        error: null
      };

    case photoConst.DELETE_PHOTO:
      return {
        ...state,
        in_request: true,
        error: null
      };
    case photoConst.DELETE_PHOTO_SUCCESS:
      photos = [...state.photos];
      photos[action.payload] = '';

      return {
        ...state,
        photos,
        in_request: false,
        error: null
      };

    case photoConst.RESIZE_PHOTO:
      return {
        ...state,
        in_request: true,
        error: null
      };
    case photoConst.RESIZE_PHOTO_SUCCESS:
      photos = [...state.photos];
      photos[action.payload.index] = action.payload.photo;

      return {
        ...state,
        photos,
        in_request: false,
        error: null
      };

    case photoConst.CROP_PHOTO:
      return {
        ...state,
        in_request: true,
        error: null
      };
    case photoConst.CROP_PHOTO_SUCCESS:
      photos = [...state.photos];
      photos[action.payload.index] = action.payload.photo;

      return {
        ...state,
        photos,
        in_request: false,
        error: null
      };

    case photoConst.PHOTO_ERROR:
      return {
        ...state,
        in_request: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
