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

export const createPlans = (promiseAction, planData) => (dispatch) => {
  message.destroy();
  message.loading('Plan data is saving..', 60);
  dispatch({
    type: planConst.CREATE_PLANS
  });

  return new Promise((resolve, reject) => promiseAction(planData)
    .then(res => {
      message.destroy();
      message.success('Plan data is saved.', 5);
      const { destination, duration, price, currency } = res.data.createPlan;
      dispatch({
        type: planConst.CREATE_PLANS_SUCCESS,
        payload: {
          destination: destination || 'Japan',
          duration: duration || 0,
          price: price || 0,
          currency: currency || 'EUR'
        }
      });

      resolve(res);
    })
    .catch(err => {
      message.destroy();
      message.error('Plan data saving is failed.', 5);
      dispatch({
        type: planData.PLAN_ERROR,
        payload: {
          user: {
            destination: planData.destination || 'Japan',
            duration: duration || 0,
            price: planData.price || 0,
            currency: planData.currency || 'EUR'
          },
          error: err
        }
      });
      console.error(err);
    })
  );
};
