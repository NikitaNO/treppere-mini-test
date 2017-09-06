import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

// create plan
const createPlanMutation = gql`
  mutation addPlan($destination: Destinations!, $duration: Int!, $price: Int!, $currency: Currencies!) {
    addPlan(destination: $destination, duration: $duration, price: $price, currency: $currency) {
      destination duration price currency
    }
  }
`;

export const withCreatePlanMutation = graphql(createPlanMutation, {
  props: ({ ownProps, mutate }) => ({
    addUser (data) {
      return mutate({
        variables: data
      })
    },
  }),
});
