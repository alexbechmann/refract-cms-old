import { EntitySchema, Entity, PropertyType, ImageRef, RefractTypes, PropertyOptions } from '@refract-cms/core';
import queryString from 'query-string';

export interface Property<TEntity extends Entity, P> {
  type: PropertyType<P>;
  resolve: (entity: TEntity) => P | Promise<P>;
}

export type Properties<TModel, TEntity extends Entity> = { [P in keyof TModel]: Property<TEntity, TModel[P]> };

export function extendSchema<TEntity extends Entity, TModel = any>(
  schema: EntitySchema<TEntity>,
  properties: Properties<TModel, TEntity>
  // resolve: (entity: TEntity) => TModel | Promise<TModel>
) {
  return {
    schema,
    properties
  };
}

export type CropsUrls<T extends string> = { [P in T]: string };

export interface ImageModel<TCrops extends string> {
  imageId: string;
  crops: CropsUrls<TCrops>;
}

export function resolveImageProperty<TEntity extends Entity, TCrops extends string>(
  entitySchema: EntitySchema<TEntity>,
  getPropertyOptions: (entitySchema: EntitySchema<TEntity>) => PropertyOptions<ImageRef<TCrops>>,
  getProperty: (entity: TEntity) => ImageRef<TCrops>
): Property<TEntity, ImageModel<TCrops>> {
  const imageProperty = getPropertyOptions(entitySchema);
  const crops = imageProperty.type.meta.crops.meta;
  const cropKeys = Object.keys(crops);
  return {
    type: RefractTypes.shape(
      cropKeys.reduce(
        (acc, key) => {
          acc[key] = RefractTypes.string;
          return acc;
        },
        {} as any
      )
    ),
    resolve: entity => {
      return cropKeys.reduce(
        (acc, cropKey) => {
          const property = getProperty(entity);
          if (property) {
            const crop = property.crops[cropKey];
            console.log({ pixelCrop: crop._doc });
            const pixelCrop = {
              height: crop.pixelCrop.height,
              width: crop.pixelCrop.width,
              x: crop.pixelCrop.x,
              y: crop.pixelCrop.y
            };
            const cropQuery = crop ? `?${queryString.stringify(pixelCrop)}` : '';
            acc[cropKey] = `find_server-url/files/${property.imageId}${cropQuery}`;
          }

          return acc;
        },
        {} as any
      );
    }
  };
}
