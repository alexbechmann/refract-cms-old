import * as React from 'react';
import * as ReactCrop from 'react-image-crop';
import { makeAspectCrop, Crop, PixelCrop } from 'react-image-crop';
import mediaService from './media.service';
import 'react-image-crop/dist/ReactCrop.css';
import { MediaItem } from './media-item.model';
import { Dialog, DialogContent, DialogActions, Button, DialogTitle } from '@material-ui/core';
import { Crops } from './models/crops.model';

export interface Props {
  mediaItem: MediaItem;
  crops: Crops;
  height?: number;
  width?: number;
  aspect?: number;
  onChange: (crops: Crops) => void;
  open: boolean;
  handleClose: () => void;
  cropName?: string;
}

class ImageCropperDialog extends React.Component<Props> {
  state = {
    width: -1,
    height: -1
  };
  onImageLoaded = image => {
    const { aspect, onChange } = this.props;
    // if (aspect) {
    //   onChange()
    // }

    this.setState({
      // crop: makeAspectCrop(this.props.crop, image.width / image.height),
      height: image.height,
      width: image.width
    });
  };

  render() {
    const { mediaItem, crops, onChange, height, width, open, handleClose, cropName, aspect } = this.props;
    const crop = crops ? crops.crop : undefined;
    let dimensionProps = {};
    if (width && height) {
      const heightPercentage = (height / this.state.height) * 100;
      const widthPercentage = (width / this.state.width) * 100;
      dimensionProps = {
        minHeight: heightPercentage,
        maxHeight: heightPercentage,
        minWidth: widthPercentage,
        maxWidth: widthPercentage
      };
    } else if (aspect) {
    }
    return (
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit crop {cropName}</DialogTitle>
        <DialogContent>
          <ReactCrop
            {...dimensionProps}
            src={mediaService.buildUrl(mediaItem._id)}
            onChange={(crop, pixelCrop) => {
              if (true) {
                // TODO: if respects min/max
                onChange({
                  crop,
                  pixelCrop
                });
              }
            }}
            onImageLoaded={this.onImageLoaded}
            crop={crop}
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
