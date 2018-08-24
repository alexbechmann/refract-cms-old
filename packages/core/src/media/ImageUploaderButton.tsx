import * as React from 'react';
import * as ReactCrop from 'react-image-crop';
import {
  LinearProgress,
  IconButton,
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  DialogContentText
} from '@material-ui/core';
import * as Icons from '@material-ui/icons';
import * as createUniqueString from 'unique-string';
import mediaService from './media.service';

interface State {
  file?: File;
  uploading: boolean;
  dialogOpen: boolean;
}

export interface ImageUploaderButtonProps {
  onUploaded?: () => void;
}

class ImageUploaderButton extends React.Component<ImageUploaderButtonProps, State> {
  state: State = {
    uploading: false,
    dialogOpen: false
  };

  constructor(props) {
    super(props);
    this.upload = this.upload.bind(this);
    this.toggleOpen = this.toggleOpen.bind(this);
  }

  toggleOpen() {
    this.setState(state => ({
      dialogOpen: !state.dialogOpen
    }));
  }

  render() {
    return (
      <div>
        <Button onClick={this.toggleOpen}>Upload image</Button>
        <Dialog open={this.state.dialogOpen}>
          <DialogTitle>Upload an image</DialogTitle>
          <DialogContent>
            <DialogContentText>Choose an image & click upload.</DialogContentText>
            {this.state.uploading && <LinearProgress />}
            <input hidden onChange={this.handleImageChange} accept="image/*" id="icon-button-file" type="file" />
            <label htmlFor="icon-button-file">
              <Button color="primary" component="span">
                <Icons.Photo />
                Select photo
              </Button>
            </label>
            {this.state.file && <p>Click upload to upload file to server</p>}
          </DialogContent>
          <DialogActions>
            {this.state.file && !this.state.uploading ? (
              <Button onClick={this.upload}>Upload</Button>
            ) : (
              <React.Fragment />
            )}
            <Button onClick={this.toggleOpen}>Done</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }

  handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files[0];
    this.setState({
      file
    });
  };

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
  }
}

export default ImageUploaderButton as React.ComponentType<ImageUploaderButtonProps>;
