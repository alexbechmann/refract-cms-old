import * as React from 'react';
import * as ReactCrop from 'react-image-crop';
import { LinearProgress, IconButton, Button, CircularProgress } from '@material-ui/core';
import * as Icons from '@material-ui/icons';
import * as createUniqueString from 'unique-string';
import mediaService from './media.service';

interface State {
  // cropperSrc?: string;
  // crop?: any;
  // selectedFile?: File;
  // croppedBlob?: Blob;
  // croppedPreviewSrc?: string;
  file?: File;
  uploading: boolean;
}

interface ImageUploaderProps {
  onUploaded?: () => void;
}

class ImageUploader extends React.Component<ImageUploaderProps, State> {
  state: State = {
    uploading: false
  };

  constructor(props) {
    super(props);
    this.upload = this.upload.bind(this);
  }

  render() {
    return (
      <div>
        {/* {this.state.uploadSnapshot && this.renderProgress()} */}
        {/* {this.state.cropperSrc && this.renderCropper()} */}
        <input hidden onChange={this.handleImageChange} accept="image/*" id="icon-button-file" type="file" />
        <label htmlFor="icon-button-file">
          <IconButton color="primary" component="span">
            <Icons.Photo />
          </IconButton>
        </label>
        {/* {this.state.croppedBlob && this.renderPreview()} */}
        {this.state.file && !this.state.uploading ? <Button onClick={this.upload}>Upload</Button> : <React.Fragment />}
        {this.state.uploading && <CircularProgress />}
      </div>
    );
  }

  // renderCropper() {
  //   return (
  //     <ReactCrop
  //       src={this.state.cropperSrc}
  //       onChange={crop => this.setState({ crop })}
  //       onImageLoaded={image => {
  //         const crop = { x: 0, y: 0, width: image.width, height: image.height };
  //         this.setState({ crop });
  //         this.handleCropComplete(null, crop);
  //       }}
  //       crop={this.state.crop}
  //       style={{
  //         height: '100px'
  //       }}
  //       onComplete={this.handleCropComplete}
  //     />
  //   );
  // }

  // renderPreview() {
  //   return (
  //     <div>
  //       <img style={{ maxHeight: 100, maxWidth: 100 }} src={this.state.croppedPreviewSrc} />
  //       <Button onClick={this.upload}> Upload</Button>
  //     </div>
  //   );
  // }

  // handleCropComplete = (_, crop) => {
  //   const canvas = document.createElement('canvas');
  //   canvas.width = crop.width;
  //   canvas.height = crop.height;
  //   const ctx = canvas.getContext('2d');

  //   const image = new Image();
  //   image.src = this.state.cropperSrc;
  //   ctx.drawImage(image, crop.x, crop.y, crop.width, crop.height, 0, 0, crop.width, crop.height);

  //   // As Base64 string
  //   // const base64Image = canvas.toDataURL('image/jpeg');

  //   // As a blob
  //   canvas.toBlob(croppedBlob => {
  //     //file.name = fileName;
  //     this.setState({
  //       croppedBlob
  //     });
  //     this.toDataUrl(croppedBlob).then(dataUrl => {
  //       this.setState({
  //         croppedPreviewSrc: dataUrl
  //       });
  //     });
  //   }, 'image/jpeg');
  // };

  handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files[0];
    this.setState({
      file
    });
    // this.toDataUrl(selectedFile).then(dataUrl => {
    //   this.setState({
    //     cropperSrc: dataUrl,
    //     selectedFile
    //   });
    // });
  };

  // toDataUrl(file) {
  //   return new Promise<string>((resolve, reject) => {
  //     var fileReader = new FileReader();
  //     fileReader.onload = e => resolve(e.target.result);
  //     fileReader.readAsDataURL(file);
  //   });
  // }

  upload() {
    const uniqueString = createUniqueString();
    const filename = `${uniqueString}_${this.state.file.name}`;
    this.setState({
      uploading: true
    });
    mediaService.upload(this.state.file, filename).then(() => {
      this.setState({ uploading: false });
      if (this.props.onUploaded) {
        this.props.onUploaded();
      }
    });

    // const imageRef = firebase
    //   .storage()
    //   .ref()
    //   .child('firestore-cms')
    //   .child('media')
    //   .child(`${uniqueString}_${this.state.selectedFile.name}`);
    // const uploadTask = imageRef.put(this.state.croppedBlob);
    // uploadTask.on(
    //   'state_changed',
    //   (uploadSnapshot: firebase.storage.UploadTaskSnapshot) => {
    //     this.setState({
    //       uploadSnapshot
    //     });
    //   },
    //   error => console.log(error),
    //   () => {
    //     this.setState({
    //       uploadSnapshot: undefined
    //     });
    //   }
    // );
  }

  // renderProgress() {
  //   const { bytesTransferred, totalBytes } = this.state.uploadSnapshot!;
  //   return <LinearProgress variant="determinate" value={(bytesTransferred / totalBytes) * 100} />;
  // }
}

export default ImageUploader;
