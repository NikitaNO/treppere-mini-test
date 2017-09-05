import React, { Component } from 'react';
import { connect } from 'react-redux';
import { message } from 'antd';
import { Row, Button } from 'antd';
import { graphql } from 'react-apollo';
import BigNumber from 'bignumber.js';
import gql from 'graphql-tag';
import {
  uploadPhoto,
  deletePhoto,
  resizePhoto
} from '../../redux/actions';
import config from '../../config';
import { PhotoItem } from '../../components';

class AddPhotos extends Component {
  constructor(props) {
    super(props);

    this.state = {
      imageUrl: '',
      imageId: '',
    };
  }

  onPhotoUpload = (acceptedFiles, rejectedFiles, index) => {
    if (rejectedFiles && rejectedFiles.length) {
      message.error('Photo size is exceeded of 3mb.', 5);
      return;
    }

    const { addResizedCopies, dispatch } = this.props;
    let data = new FormData();
    data.append('data', acceptedFiles[0]);

    dispatch(uploadPhoto(data, index))
      .then(res => {
        const img = new Image();

        img.onload = function(){
          const h = new BigNumber(img.height);
          const w = new BigNumber(img.width);
          const reqH = new BigNumber(252);
          const reqW = new BigNumber(178);

          const wh = w.div(h);
          const reqHreqW = reqW.div(reqH);

          if (!wh.equals(reqHreqW)) {
            dispatch(
              resizePhoto(addResizedCopies, res.id, `https://images.graph.cool/v1/${config.graphql.project_id}/${res.secret}/178x252`, index)
            );

          } else {
            console.log('crop')
          }
        };

        img.src = res.url;
      });
  };

  onPhotoDelete = (id, index) => {
    this.props.dispatch(deletePhoto(this.props.deleteFile, id, index));
  };

  render() {
    return (
      <div className="add-photos add-photos__form">
        <Row>
          <h1>Add Photos</h1>
          <hr/>
        </Row>
        <Row className="form form__header">
          <h2><b>Add your quality photos</b></h2>
          <h3>Photos increase the chance to be picked by 80%!</h3>
        </Row>
        <Row className="form form__body">
          {this.props.photos.map((photo, index) => (
            <PhotoItem photo={photo}
                       index={index}
                       onPhotoDelete={this.onPhotoDelete}
                       onPhotoUpload={this.onPhotoUpload}/>
          ))}
        </Row>
        <Row className="form form__btn">
          <Button
            type="primary"
            htmlType="submit"
          >NEXT</Button>
        </Row>
      </div>
    );
  }
}

const deletePhotoMutation = gql`
  mutation deleteFile($id: ID!) {
    deleteFile(id: $id) { id }
  }
`;

const withPhotoMutation = graphql(deletePhotoMutation, {
  props: ({ ownProps, mutate }) => ({
    deleteFile(id) {
      return mutate({
        variables: { id }
      })
    },
  }),
});

const resizePhotoMutation = gql`
  mutation addResizedCopies($id: ID!, $resizedCopies: [String!]!) {
    updateFile(id: $id, resizedCopies: $resizedCopies) { id resizedCopies }
  }
`;

const withAddResizedCopies = graphql(resizePhotoMutation, {
    props: ({ ownProps, mutate }) => ({
      addResizedCopies (id, resizedCopies) {
        return mutate({
          variables: {
            id,
            resizedCopies
          },
          updateQueries: {}
        })
      }
    })
  }
);

const AddPhotosWithState = connect(
  state => ({
    photos: state.photo.photos
  })
)(AddPhotos);

export default withPhotoMutation(withAddResizedCopies(AddPhotosWithState));
