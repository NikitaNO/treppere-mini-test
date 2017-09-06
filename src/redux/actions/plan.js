import { message } from 'antd';

export const planConst = {
  CREATE_PLANS: 'CREATE_PLANS',
  CREATE_PLANS_SUCCESS: 'CREATE_PLANS_SUCCESS',

  PLAN_ERROR: 'PLAN_ERROR'
};

export const createPlans = (promiseAction, plansArray) => (dispatch) => {
  message.destroy();
  message.loading('Plans data is saving..', 60);
  dispatch({
    type: planConst.CREATE_PLANS
  });

  const promisesArray = plansArray.map(plan => promiseAction(plan));

  return new Promise((resolve, reject) => Promise.all(promisesArray)
    .then(res => {
      message.destroy();
      message.success('Plans data is saved.', 5);
      dispatch({
        type: planConst.CREATE_PLANS_SUCCESS,
        payload: plansArray
      });

      resolve(res);
    })
    .catch(err => {
      message.destroy();
      message.error('Plans data saving is failed.', 5);
      dispatch({
        type: planConst.PLAN_ERROR,
        payload: {
          plans: plansArray,
          error: err
        }
      });
      console.error(err);
    }))
};
