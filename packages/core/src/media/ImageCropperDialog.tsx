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

interface State {
  height: number;
  width: number;
  crops: Crops;
}

class ImageCropperDialog extends React.Component<Props, State> {
  onImageLoaded = image => {
    const { aspect, onChange } = this.props;
    this.setState({
      height: image.height,
      width: image.width
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
    const { mediaItem, onChange, height, width, open, handleClose, cropName, aspect } = this.props;
    const { crop } = this.state.crops;
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
