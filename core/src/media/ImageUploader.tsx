import * as React from 'react';
import * as ReactCrop from 'react-image-crop';
import * as firebase from 'firebase';
import { LinearProgress, IconButton } from '@material-ui/core';
import * as Icons from '@material-ui/icons';
import * as createUniqueString from 'unique-string';

interface State {
  uploadSnapshot?: firebase.storage.UploadTaskSnapshot;
  cropperSrc?: string;
  selectedFile?: File;
  croppedBlob?: Blob;
}

class ImageUploader extends React.Component<{}, State> {
  state: State = {};

  render() {
    return (
      <div>
        {this.state.uploadSnapshot && this.renderProgress()}
        {this.state.cropperSrc && this.renderCropper()}
        <input onChange={this.handleImageChange} accept="image/*" id="icon-button-file" type="file" />
        <label htmlFor="icon-button-file">
          <IconButton color="primary" component="span">
            <Icons.Photo />
          </IconButton>
        </label>
      </div>
    );
  }

  renderCropper() {
    return (
      <ReactCrop
        src={this.state.cropperSrc}
        onChange={console.log}
        crop={{
          aspect: 16 / 9
        }}
        style={{
          width: '100%',
          height: '100px'
        }}
      />
    );
  }

  handleCropChange = crop => {
    const canvas = document.createElement('canvas');
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext('2d');

    const image = new Image();
    image.src = this.state.cropperSrc;
    image.onload = () => {
      ctx.drawImage(image, crop.x, crop.y, crop.width, crop.height, 0, 0, crop.width, crop.height);

      // As Base64 string
      // const base64Image = canvas.toDataURL('image/jpeg');

      // As a blob
      new Promise((resolve, reject) => {
        canvas.toBlob(croppedBlob => {
          //file.name = fileName;
          this.setState({
            croppedBlob
          });
        }, 'image/jpeg');
      });
    };
  };

  handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files[0];
    var fileReader = new FileReader();

    fileReader.onload = e => {
      this.setState({
        cropperSrc: e.target.result,
        selectedFile
      });
    };

    fileReader.readAsDataURL(selectedFile);
  };

  upload() {
    const uniqueString = createUniqueString();
    const imageRef = firebase
      .storage()
      .ref()
      .child('firestore-cms')
      .child('media')
      .child(`${uniqueString}_${this.state.selectedFile.name}`);
    const uploadTask = imageRef.put(this.state.croppedBlob);
    uploadTask.on(
      'state_changed',
      (uploadSnapshot: firebase.storage.UploadTaskSnapshot) => {
        this.setState({
          uploadSnapshot
        });
      },
      error => console.log(error),
      () => {
        this.setState({
          uploadSnapshot: undefined
        });
      }
    );
  }

  renderProgress() {
    const { bytesTransferred, totalBytes } = this.state.uploadSnapshot!;
    return <LinearProgress variant="determinate" value={(bytesTransferred / totalBytes) * 100} />;
  }
}

export default ImageUploader;
