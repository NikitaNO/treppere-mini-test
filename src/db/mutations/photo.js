import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

// delete photo
const deletePhotoMutation = gql`
  mutation deleteFile($id: ID!) {
    deleteFile(id: $id) { id }
  }
`;

export const withDeletePhotoMutation = graphql(deletePhotoMutation, {
  props: ({ ownProps, mutate }) => ({
    deleteFile(id) {
      return mutate({
        variables: { id }
      })
    },
  }),
});

// resize photo
const addResizedCopiesMutation = gql`
  mutation addResizedCopies($id: ID!, $resizedCopies: [String!]!) {
    updateFile(id: $id, resizedCopies: $resizedCopies) { id resizedCopies }
  }
`;

export const withAddResizedCopiesMutation = graphql(addResizedCopiesMutation, {
    props: ({ ownProps, mutate }) => ({
      addResizedCopies (id, resizedCopies) {
        return mutate({
          variables: {
            id,
            resizedCopies
          }
        })
      }
    })
  }
);

// crop photo
const addCroppedCopiesMutation = gql`
  mutation addCroppedCopies($id: ID!, $croppedCopies: [String!]!) {
    updateFile(id: $id, croppedCopies: $croppedCopies) { id croppedCopies }
  }
`;

export const withAddCroppedCopiesMutation = graphql(addCroppedCopiesMutation, {
    props: ({ ownProps, mutate }) => ({
      addCroppedCopies (id, croppedCopies) {
        return mutate({
          variables: {
            id,
            croppedCopies
          }
        })
      }
    })
  }
);
