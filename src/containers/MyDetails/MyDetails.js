import React, { Component } from 'react';
import { MyDetailsForm } from '../../components/index';
import { connect } from 'react-redux';
import { Row, Spin } from 'antd';
import moment from 'moment';

class MyDetails extends Component {
  handleAddUpdateAim = data => {
    console.log(data, 'USER');
  };

  render() {
    const {
      userInRequest,
      initialValues
    } = this.props;

    return userInRequest ? (
      <Row type="flex" justify="space-around" align="middle">
        <Spin size="large"/>
      </Row>
    ) : (
      <MyDetailsForm initialValues={initialValues}
                     handleAddUpdateAim={this.handleAddUpdateAim} />
    );
  }
}

MyDetails = connect(
  state => ({
    initialValues: {
      id: state.user.user.id,
      first_name: state.user.user.first_name,
      last_name: state.user.user.last_name,
      gender: state.user.user.gender,
      date_of_birth: moment(state.user.user.date_of_birth)
    },
    userInRequest: state.user.in_request
  })
)(MyDetails);

export default MyDetails;
