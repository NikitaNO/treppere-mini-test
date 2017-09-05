import { message } from 'antd';
import config from '../../config';

export const photoConst = {
  UPLOAD_PHOTO: 'UPLOAD_PHOTO',
  UPLOAD_PHOTO_SUCCESS: 'UPLOAD_PHOTO_SUCCESS',

  DELETE_PHOTO: 'DELETE_PHOTO',
  DELETE_PHOTO_SUCCESS: 'DELETE_PHOTO_SUCCESS',

  RESIZE_PHOTO: 'RESIZE_PHOTO',
  RESIZE_PHOTO_SUCCESS: 'RESIZE_PHOTO_SUCCESS',

  PHOTO_ERROR: 'PHOTO_ERROR'
};

export const uploadPhoto = (photoData, index) => dispatch => {
  message.destroy();
  message.loading('Photo is uploading..', 60);
  dispatch({
    type: photoConst.UPLOAD_PHOTO
  });

  return new Promise((resolve, reject) => fetch(`https://api.graph.cool/file/v1/${config.graphql.project_id}`, {
      method: 'POST',
      body: photoData
    })
      .then(response => response.json())
      .then(
        (photo) => {
          message.destroy();
          message.success('Photo is uploaded.', 5);
          dispatch({
            type: photoConst.UPLOAD_PHOTO_SUCCESS,
            payload: {
              photo,
              index
            }
          });

          resolve(photo);
        },
        (error) => {
          message.destroy();
          message.error('Photo uploading is failed.', 5);
          dispatch({
            type: photoConst.PHOTO_ERROR,
            payload: error
          })
        }
      )
  );
};

export const deletePhoto = (promiseAction, id, index) => (dispatch) => {
  message.destroy();
  message.loading('Photo is deleting..', 60);
  dispatch({
    type: photoConst.DELETE_PHOTO
  });

  return new Promise((resolve, reject) => promiseAction(id)
    .then(res => {
      message.destroy();
      message.success('Photo is deleted.', 5);
      dispatch({
        type: photoConst.DELETE_PHOTO_SUCCESS,
        payload: index
      });

      resolve(res);
    })
    .catch(err => {
      message.destroy();
      message.error('Photo deleting is failed.', 5);
      dispatch({
        type: photoConst.PHOTO_ERROR,
        payload: err
      });
      console.error(err);
    })
  );
};

export const resizePhoto = (promiseAction, id, resizedPhoto, index) => dispatch => {
  message.destroy();
  message.loading('Photo is resizing..', 60);
  dispatch({
    type: photoConst.RESIZE_PHOTO
  });

  return new Promise((resolve, reject) => promiseAction(id, [resizedPhoto])
    .then(res => {
      message.destroy();
      message.success('Photo is resized.', 5);
      dispatch({
        type: photoConst.RESIZE_PHOTO_SUCCESS,
        payload: {
          index,
          photo: {
            id,
            url: resizedPhoto
          }
        }
      });

      resolve(res);
    })
    .catch(err => {
      message.destroy();
      message.error('Photo resizing is failed.', 5);
      dispatch({
        type: photoConst.PHOTO_ERROR,
        payload: err
      });
      console.error(err);
    })
  );
};
