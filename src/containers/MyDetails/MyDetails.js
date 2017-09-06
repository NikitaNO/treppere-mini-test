import { Row } from 'antd';
import moment from 'moment';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { push } from 'react-router-redux';

import { createUser } from '../../redux/actions';
import { MyDetailsForm } from '../../components/index';
import { withCreateUserMutation } from '../../db/mutations';

class MyDetails extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
    addUser: PropTypes.func,
    initialValues: PropTypes.object,
  };

  handleCreateUser = data => {
    data.dateOfBirth = moment(data.dateOfBirth).toDate();
    this.props.dispatch(createUser(this.props.addUser, data))
      .then(res => this.props.dispatch(push('/photos')));
  };

  render() {
    const {
      initialValues
    } = this.props;

    return (
      <div className="my-details">
        <Row>
          <h1>My Details</h1>
          <hr/>
        </Row>
        <MyDetailsForm initialValues={initialValues}
                       handleCreateUser={this.handleCreateUser} />
      </div>
    );
  }
}

const MyDetailsWithState = connect(
  state => ({
    initialValues: {
      firstName: state.user.user.first_name,
      lastName: state.user.user.last_name,
      gender: state.user.user.gender,
      dateOfBirth: state.user.user.date_of_birth
    }
  })
)(MyDetails);

export default withCreateUserMutation(MyDetailsWithState);
