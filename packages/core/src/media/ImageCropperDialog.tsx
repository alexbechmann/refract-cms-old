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
  onChange: (crops: Crops) => void;
  open: boolean;
  handleClose: () => void;
  cropName?: string;
}

interface State {
  height: number;
  width: number;
  crops: Crops;
}

class ImageCropperDialog extends React.Component<Props, State> {
  onImageLoaded = (image: HTMLImageElement) => {
    this.setState({
      height: image.naturalHeight,
      width: image.naturalWidth
    });
  };

  constructor(props) {
    super(props);
    this.state = {
      width: -1,
      height: -1,
      crops: props.crops
    };
  }

  render() {
    const { mediaItem, onChange, height, width, open, handleClose, cropName } = this.props;
    const crop = this.state.crops ? this.state.crops.crop : ({} as Crop);
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
    }
    return (
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit crop {cropName}</DialogTitle>
        <DialogContent>
          <ReactCrop
            {...dimensionProps}
            src={mediaService.buildUrl(mediaItem._id)}
            onChange={(crop, pixelCrop) => {
              console.log(pixelCrop.height, height, pixelCrop.width, width, crop, pixelCrop, this.state);
              if ((!width && !height) || (pixelCrop.height === height && pixelCrop.width === width)) {
                this.setState({
                  crops: {
                    crop,
                    pixelCrop
                  }
                });
              }
            }}
            onImageLoaded={this.onImageLoaded}
            crop={crop}
          />
        </DialogContent>
        <DialogActions>
          <Button
            color="primary"
            variant="raised"
            onClick={() => {
              onChange(this.state.crops);
              handleClose();
            }}
          >
            Done
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default ImageCropperDialog as React.ComponentType<Props>;
