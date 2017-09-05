import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { connect } from 'react-redux';
import moment from 'moment';
import gql from 'graphql-tag';
import { createUser } from '../../redux/actions';
import { MyDetailsForm } from '../../components/index';

class MyDetails extends Component {
  handleCreateUser = data => {
    data.dateOfBirth = moment(data.dateOfBirth).toDate();
    this.props.createUser(this.props.addUser, data)
      .then(res => this.props.router.replace('/photos'));
  };

  render() {
    const {
      initialValues
    } = this.props;

    return (
      <MyDetailsForm initialValues={initialValues}
                     handleCreateUser={this.handleCreateUser} />
    );
  }
}

const createUserMutation = gql`
  mutation addUser($firstName: String!, $lastName: String!, $gender: Gender!, $dateOfBirth: DateTime!) {
    createUser(firstName: $firstName, lastName: $lastName, gender: $gender, dateOfBirth: $dateOfBirth) {
      firstName lastName gender dateOfBirth
    }
  }
`;

const withUserMutation = graphql(createUserMutation, {
  props: ({ ownProps, mutate }) => ({
    addUser (data) {
      return mutate({
        variables: data
      })
    },
  }),
});

const MyDetailsWithState = connect(
  state => ({
    initialValues: {
      firstName: state.user.user.first_name,
      lastName: state.user.user.last_name,
      gender: state.user.user.gender,
      dateOfBirth: state.user.user.date_of_birth
    },
    userInRequest: state.user.in_request
  }), {
    createUser
  }
)(MyDetails);

export default withUserMutation(MyDetailsWithState);
