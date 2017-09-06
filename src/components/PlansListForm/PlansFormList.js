import React, { Component } from 'react';
import { FieldArray, reduxForm } from 'redux-form';
import { PlansFormItem } from '../../components';

import { Row, Button } from 'antd';

class PlansFormList extends Component {
  render() {
    const {
      handleSubmit,
      handleCreatePlans,
      handleRemovePlan,
      handleAddPlan
    } = this.props;

    return (
      <form className="plans__form" onSubmit={handleSubmit(handleCreatePlans)}>
        <Row className="form form__body" >
          <FieldArray name="plans" component={PlansFormItem} handleRemovePlan={handleRemovePlan}/>
          <span className="add-plan-btn" onClick={handleAddPlan}>+ Add plan (optional)</span>
        </Row>
        <Row className="form form__btn">
          <Button
            type="primary"
            htmlType="submit"
          >NEXT</Button>
        </Row>
      </form>
    )
  }
}

PlansFormList = reduxForm({
  form: 'plansForm',
  enableReinitialize: true
})(PlansFormList);

export default PlansFormList;
