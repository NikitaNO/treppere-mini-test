import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

// create user
const createUserMutation = gql`
  mutation addUser($firstName: String!, $lastName: String!, $gender: Gender!, $dateOfBirth: DateTime!) {
    createUser(firstName: $firstName, lastName: $lastName, gender: $gender, dateOfBirth: $dateOfBirth) {
      firstName lastName gender dateOfBirth
    }
  }
`;

export const withCreateUserMutation = graphql(createUserMutation, {
  props: ({ ownProps, mutate }) => ({
    addUser (data) {
      return mutate({
        variables: data
      })
    },
  }),
});