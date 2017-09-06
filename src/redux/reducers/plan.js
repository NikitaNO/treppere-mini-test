import { planConst } from '../actions';

const initialPlan = {
  destination: 'Japan',
  duration: 2,
  price: 120,
  currency: 'EUR'
};

const initialState = {
  plans: [initialPlan],
  in_request: false,
  error: null
};

/* eslint-disable import/prefer-default-export */
export const plan = (state = initialState, action) => {
  switch (action.type) {
    case planConst.CREATE_PLANS:
      return {
        ...state,
        in_request: true,
        error: null
      };
    case planConst.CREATE_PLANS_SUCCESS:
      return {
        ...state,
        plans: action.payload,
        in_request: false,
        error: null
      };

    case planConst.PLAN_ERROR:
      return {
        ...state,
        in_request: false,
        error: action.payload.error,
        plans: action.payload.plans
      };
    default:
      return state;
  }
};
