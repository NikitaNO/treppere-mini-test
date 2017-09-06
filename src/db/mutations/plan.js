import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

// create plans
const createPlansMutation = gql`
  mutation addPlans($firstName: String!, $lastName: String!, $gender: Gender!, $dateOfBirth: DateTime!) {
    createUser(firstName: $firstName, lastName: $lastName, gender: $gender, dateOfBirth: $dateOfBirth) {
      firstName lastName gender dateOfBirth
    }
  }
`;

export const withCreatePlanMutation = graphql(createPlansMutation, {
  props: ({ ownProps, mutate }) => ({
    addUser (data) {
      return mutate({
        variables: data
      })
    },
  }),
});
