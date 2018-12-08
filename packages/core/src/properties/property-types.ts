import { Crop } from '../files/crop.model';
import { ImageRef, Crops } from '../files/image-ref.model';

export interface PropertyDescription<T, TAlias extends Alias, TMeta = any> {
  alias: TAlias;
  meta?: TMeta;
}

export type Alias = 'String' | 'Number' | 'Array' | 'Boolean' | 'Date' | 'Shape';

export const arrayOf = <T extends K[], K>(p: PropertyDescription<K, AliasType<K>, PropertyType<K>>) =>
  ({ alias: 'Array', meta: p.alias } as PropertyDescription<T, 'Array', AliasType<K>>);
export const bool = { alias: 'Boolean' } as PropertyDescription<boolean, 'Boolean'>;
export const number = { alias: 'Number' } as PropertyDescription<number, 'Number'>;
export const date = { alias: 'Date' } as PropertyDescription<Date, 'Date'>;
export const string = ({ alias: 'String' } as any) as PropertyDescription<string, 'String'>;

export type ShapeArgs<T> = { [P in keyof T]: PropertyType<T[P]> };

export function shape<T>(type: ShapeArgs<T>) {
  return {
    alias: 'Shape',
    meta: type
  } as PropertyDescription<T, 'Shape', ShapeArgs<T>>;
}

const cropShape = shape<Crop>({
  crop: shape({
    x: number,
    y: number
  }),
  zoom: number,
  pixelCrop: shape({
    height: number,
    width: number,
    x: number,
    y: number
  }),
  url: string
});

function imageShape<TCrops extends string, TImageRef extends ImageRef<TCrops>>(crops: ShapeArgs<Crops<TCrops>>) {
  return RefractTypes.shape({
    imageId: RefractTypes.string,
    imageUrl: RefractTypes.string,
    crops: shape(crops)
  });
}

export const RefractTypes = {
  arrayOf,
  bool,
  number,
  string,
  date,
  shape,
  imageShape,
  cropShape
};

export type AliasType<T> = T extends string
  ? 'String'
  : T extends number
  ? 'Number'
  : T extends boolean
  ? 'Boolean'
  : T extends Date
  ? 'Date'
  : 'Shape';

type GetElementType<T extends any[]> = T extends (infer U)[] ? U : never;

export type PropertyType<T> = T extends string
  ? PropertyDescription<string, 'String'>
  : T extends number
  ? PropertyDescription<number, 'Number'>
  : T extends boolean
  ? PropertyDescription<boolean, 'Boolean'>
  : T extends Date
  ? PropertyDescription<Date, 'Date'>
  : T extends any[]
  ? PropertyDescription<T, 'Array', AliasType<GetElementType<T>>>
  : PropertyDescription<T, 'Shape', ShapeArgs<T>>;
