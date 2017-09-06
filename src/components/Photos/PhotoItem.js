import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';

export default class PhotoItem extends Component {
  static propTypes = {
    photoUrl: PropTypes.string,
    onPhotoUpload: PropTypes.func,
    onPhotoDelete: PropTypes.func,
    index: PropTypes.number
  };

  render() {
    const { photo, onPhotoUpload, onPhotoDelete, index } = this.props;
    const dropzoneStyle = {
      width: 178,
      height: 252,
      borderWidth: 2,
      borderColor: 'rgb(102, 102, 102)',
      borderStyle: 'dashed',
      borderRadius: 5,
      backgroundColor: '#f1f1f1',
      cursor: 'pointer'
    };

    const dropzoneImageStyle = {
      width: 178,
      height: 252,
      cursor: 'pointer',
      background: `url(${photo.url}) 50% 50% no-repeat`
    };

    return (
      <div>
        <Dropzone onDrop={(acceptedFiles, rejectedFiles) => onPhotoUpload(acceptedFiles, rejectedFiles, index)}

                  accept='image/*'
                  style={photo ? dropzoneImageStyle : dropzoneStyle}
                  maxSize={3000000}
                  multiple={false}>
          {!photo && <div className="plus">+</div>}
        </Dropzone>
        {photo && <span className="delete-photo" onClick={() => onPhotoDelete(photo.id, index)}>delete photo</span>}
      </div>
    )
  }
}
