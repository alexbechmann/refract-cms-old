/* tslint:disable */
import { Crop } from '../files/crop.model';
import { ImageRef, Crops } from '../files/image-ref.model';
import { EntitySchema } from '../entities/entity-schema';
import { EntityRef } from '../entities/entity-ref.model';
import { Entity } from '../entities/entity.model';

export interface PropertyDescription<T, TAlias extends Alias, TMeta = any> {
  alias: TAlias;
  meta?: TMeta;
}

export type Alias = 'String' | 'Number' | 'Array' | 'Boolean' | 'Date' | 'Shape' | 'Ref';

// type GetElementType<T extends any[]> = T extends (infer U)[] ? U : never;

export const arrayOf = <T extends U[], U>(p: PropertyType<U>) =>
  ({ alias: 'Array', meta: p } as PropertyDescription<T, 'Array', PropertyType<U>>);
export const bool: PropertyType<boolean> = { alias: 'Boolean' } as PropertyDescription<boolean, 'Boolean'>;
export const number: PropertyType<number> = { alias: 'Number' } as PropertyDescription<number, 'Number'>;
export const date: PropertyType<Date> = { alias: 'Date' } as PropertyDescription<Date, 'Date'>;
export const string: PropertyType<string> = ({ alias: 'String' } as any) as PropertyDescription<string, 'String'>;
export const ref = <TRef extends EntityRef<TEntity>, TEntity extends Entity>(entitySchema: EntitySchema<TEntity>) =>
  (({ alias: 'Ref', meta: entitySchema } as any) as PropertyDescription<TRef, 'Ref', EntitySchema<TEntity>>);

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

function imageShape<TCrops extends string>(crops: ShapeArgs<Crops<TCrops>>) {
  return RefractTypes.shape<ImageRef<TCrops>>({
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
  cropShape,
  ref
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

// Workaround to avoid circular type ref
export type PropertyTypeSimple<T> = T extends string
  ? PropertyDescription<string, 'String'>
  : T extends number
  ? PropertyDescription<number, 'Number'>
  : T extends boolean
  ? PropertyDescription<boolean, 'Boolean'>
  : T extends Date
  ? PropertyDescription<Date, 'Date'> // : T extends (infer U)[] // ? PropertyDescription<T, 'Array', PropertyType<U>>
  : PropertyDescription<T, 'Shape', ShapeArgs<T>>;

export type PropertyType<T> = T extends string
  ? PropertyDescription<string, 'String'>
  : T extends number
  ? PropertyDescription<number, 'Number'>
  : T extends boolean
  ? PropertyDescription<boolean, 'Boolean'>
  : T extends Date
  ? PropertyDescription<Date, 'Date'>
  : T extends (infer U)[]
  ? PropertyDescription<T, 'Array', PropertyTypeSimple<U>>
  : T extends EntityRefType<infer U>
  ? PropertyDescription<T, 'Ref', EntitySchema<U>>
  : PropertyDescription<T, 'Shape', ShapeArgs<T>>;

type EntityRefType<U> = U extends Entity ? EntityRef<U> : never;
