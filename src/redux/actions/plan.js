import { message } from 'antd';

export const planConst = {
  CREATE_PLANS: 'CREATE_PLANS',
  CREATE_PLANS_SUCCESS: 'CREATE_PLANS_SUCCESS',

  REMOVE_PLAN: 'DELETE_PLAN',
  ADD_PLAN: 'ADD_PLAN',

  PLAN_ERROR: 'PLAN_ERROR'
};

export const addPlan = () => (dispatch) => {
  dispatch({
    type: planConst.ADD_PLAN
  })
};

export const removePlan = index => (dispatch) => {
  dispatch({
    type: planConst.REMOVE_PLAN,
    payload: index
  })
};

export const createPlans = (promiseAction, plansArray) => (dispatch) => {
  message.destroy();
  message.loading('Plans data is saving..', 60);
  dispatch({
    type: planConst.CREATE_PLANS
  });

  const promisesArray = plansArray.map(plan => promiseAction(plan));

  return Promise.all(promisesArray)
    .then(res => {
      message.destroy();
      message.success('Plans data is saved.', 5);
      dispatch({
        type: planConst.CREATE_PLANS_SUCCESS,
        payload: plansArray
      });

      return res;
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
    });
};
