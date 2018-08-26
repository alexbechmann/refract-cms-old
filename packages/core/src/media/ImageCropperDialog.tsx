import * as React from 'react';
import * as ReactCrop from 'react-image-crop';
import { makeAspectCrop, Crop } from 'react-image-crop';
import mediaService from './media.service';
import 'react-image-crop/dist/ReactCrop.css';
import { MediaItem } from './media-item.model';
import { Dialog, DialogContent, DialogActions, Button, DialogTitle } from '@material-ui/core';

export interface Props {
  mediaItem: MediaItem;
  crop: Crop;
  minHeight?: number;
  minWidth?: number;
  onChange: (crop: Crop) => void;
  open: boolean;
  handleClose: () => void;
  cropName?: string;
}

class ImageCropperDialog extends React.Component<Props> {
  onImageLoaded = image => {
    this.setState({
      crop: makeAspectCrop(this.props.crop, image.width / image.height),
      height: image.height,
      width: image.width
    });
  };

  render() {
    const { mediaItem, crop, onChange, minHeight, minWidth, open, handleClose, cropName } = this.props;
    return (
      <Dialog open={open} fullScreen>
        <DialogTitle>Edit crop {cropName}</DialogTitle>
        <DialogContent>
          <ReactCrop
            //imageStyle={{ width: '100%' }}
            // minHeight={minHeight}
            // minWidth={minWidth}
            // maxHeight={minHeight}
            // maxWidth={minWidth}
            src={mediaService.buildUrl(mediaItem._id)}
            onChange={(crop, pixelCrop) => {
              console.log(crop);
              onChange(crop);
            }}
            crop={crop}
            //onImageLoaded={() => this.setState({ something: false })}
          />
        </DialogContent>
        <DialogActions>
          <Button color="primary" variant="raised" onClick={handleClose}>
            Done
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default ImageCropperDialog;
