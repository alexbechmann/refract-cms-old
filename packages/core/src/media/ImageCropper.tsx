import * as React from 'react';
import * as ReactCrop from 'react-image-crop';
import mediaService from './media.service';
import 'react-image-crop/dist/ReactCrop.css';

export interface Props {
  imageId: string;
  crop: any;
  onChange: (crop: any) => void;
}

class ImageCropper extends React.Component<Props> {
  render() {
    const { imageId, crop, onChange } = this.props;
    return (
      <ReactCrop
        src={mediaService.buildUrl(imageId)}
        onChange={(crop, pixelCrop) => {
          onChange(crop);
        }}
        crop={crop}
        disabled={false}
        onImageLoaded={img => {}}
      />
    );
  }
}

export default ImageCropper;
