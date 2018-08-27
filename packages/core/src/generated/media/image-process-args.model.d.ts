import { PixelCrop } from "react-image-crop";
export interface ImageProcessArgs extends Partial<PixelCrop> {
    flip?: boolean;
}
