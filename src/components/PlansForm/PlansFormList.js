import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FieldArray, reduxForm } from 'redux-form';
import { PlansFormItem } from '../../components';

import { Row, Button } from 'antd';

class PlansFormList extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    handleCreatePlans: PropTypes.func.isRequired
  };

  render() {
    const {
      handleSubmit,
      handleCreatePlans
    } = this.props;

    return (
      <form className="plans__form" onSubmit={handleSubmit(handleCreatePlans)}>
        <Row className="form form__body" >
          <FieldArray name="plans" component={PlansFormItem}/>
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
