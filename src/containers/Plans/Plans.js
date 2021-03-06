import { Row } from 'antd';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { push } from 'react-router-redux';
import { createPlans } from '../../redux/actions';
import { PlansFormList } from '../../components/index';
import { withCreatePlanMutation } from '../../db/mutations';

class Plans extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
    addUser: PropTypes.func,
    initialValues: PropTypes.object,
  };

  handleCreatePlans = data => {
    this.props.dispatch(createPlans(this.props.addPlan, [...data.plans]))
      .then(res => this.props.dispatch(push('/my-details')));
  };

  render() {
    const {
      initialValues
    } = this.props;

    return (
      <div className="plans">
        <Row>
          <h1>Plans</h1>
        </Row>
        <PlansFormList initialValues={initialValues}
                       handleCreatePlans={this.handleCreatePlans} />
      </div>
    );
  }
}

const PlansWithState = connect(
  state => ({
    initialValues: {
      plans: [...state.plan.plans]
    }
  })
)(Plans);

export default withCreatePlanMutation(PlansWithState);
