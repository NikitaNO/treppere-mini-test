import React, { Component } from 'react';
// import { graphql } from 'react-apollo';
import { connect } from 'react-redux';
import moment from 'moment';
// import gql from 'graphql-tag';
// import { createUser } from '../../redux/actions';
import { MyDetailsForm } from '../../components/index';

class AddPhotos extends Component {
  handleCreateUser = data => {
    data.dateOfBirth = moment(data.dateOfBirth).toDate();
    this.props.createUser(this.props.addUser, data)
      .then(res => this.props.router.replace('/photos'));
  };

  render() {
    return (
      <div></div>
    );
  }
}

// const createUserMutation = gql`
//   mutation addUser($firstName: String!, $lastName: String!, $gender: Gender!, $dateOfBirth: DateTime!) {
//     createUser(firstName: $firstName, lastName: $lastName, gender: $gender, dateOfBirth: $dateOfBirth) {
//       firstName lastName gender dateOfBirth
//     }
//   }
// `;

// const withUserMutation = graphql(createUserMutation, {
//   props: ({ ownProps, mutate }) => ({
//     addUser (data) {
//       return mutate({
//         variables: data
//       })
//     }
//   })
// });

const AddPhotosWithState = connect(
  state => ({
    userInRequest: state.user.in_request
  })
)(AddPhotos);

export default AddPhotosWithState;
