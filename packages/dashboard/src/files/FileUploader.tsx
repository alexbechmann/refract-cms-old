import React from 'react';
import { LinearProgress, IconButton, Button, CircularProgress } from '@material-ui/core';
import * as Icons from '@material-ui/icons';
import createUniqueString from 'unique-string';
import fileService from './file.service';

interface State {
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
    const { file, uploading } = this.state;
    return (
      <div>
        {!uploading && (
          <div>
            <input hidden onChange={this.handleImageChange} accept="image/*" id="icon-button-file" type="file" />
            <label htmlFor="icon-button-file">
              <IconButton color="primary" component="span">
                <Icons.Photo />
              </IconButton>
            </label>
          </div>
        )}
        {file && !this.state.uploading ? <Button onClick={this.upload}>Upload</Button> : <React.Fragment />}
        {uploading && <CircularProgress />}
      </div>
    );
  }

  handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e && e.target && e.target.files) {
      const file = e.target.files[0];
      this.setState({
        file
      });
    }
  };

  upload() {
    const { file } = this.state;
    if (file) {
      const uniqueString = createUniqueString();
      const filename = `${uniqueString}_${file.name}`;
      this.setState({
        uploading: true
      });
      fileService.upload(file, filename).then(() => {
        this.setState({ uploading: false });
        if (this.props.onUploaded) {
          this.props.onUploaded();
        }
      });
    }
  }
}

export default ImageUploader;
