import * as React from 'react';
import Cropper from 'react-cropper';
import { makeAspectCrop, Crop, PixelCrop } from 'react-image-crop';
import mediaService from './media.service';
import 'cropperjs/dist/cropper.css';
import { MediaItem } from './media-item.model';
import { Dialog, DialogContent, DialogActions, Button, DialogTitle } from '@material-ui/core';
import { Crops } from './models/crops.model';
import * as cropperjs from 'cropperjs';

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

  cropper() {
    return (this.refs.cropper as any) as cropperjs;
  }

  _crop() {
    const cropper = this.cropper();
    console.log(cropper.getData().height);
    //console.log((this.refs.cropper as any).getCroppedCanvas().toDataURL());
  }

  render() {
    const { mediaItem, onChange, height, width, open, handleClose, cropName } = this.props;
    const crop = this.state.crops ? this.state.crops.crop : ({} as Crop);
    let dimensionProps = {};
    if (width && height) {
      dimensionProps = {
        minContainerHeight: height,
        maxContainerHeight: height,
        minContainerWidth: width,
        maxContainerWidth: width
      };
    }
    return (
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit crop {cropName}</DialogTitle>
        <DialogContent>
          <Cropper
            ref="cropper"
            {...dimensionProps}
            data={{
              x: 0,
              y: 5,
              width: 100,
              height: 800
            }}
            aspectRatio={16 / 9}
            src={mediaService.buildUrl(mediaItem._id)}
            style={{ height: 400, width: '100%' }}
            // onChange={(crop, pixelCrop) => {
            //   // if ((!width && !height) || (pixelCrop.height === height && pixelCrop.width === width)) {

            //   // }
            //   this.setState({
            //     crops: {
            //       crop
            //     }
            //   });
            // }}
            onImageLoaded={this.onImageLoaded}
            //crop={crop}
            crop={this._crop.bind(this)}
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
