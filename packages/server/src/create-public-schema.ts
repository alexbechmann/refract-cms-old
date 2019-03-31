import { EntitySchema, Entity, PropertyType, ImageRef, RefractTypes, PropertyOptions } from '@refract-cms/core';
import queryString from 'query-string';
import { Omit } from '@material-ui/core';

export interface Property<TEntity extends Entity, P> {
  type: PropertyType<P>;
  resolve: (entity: TEntity) => P | Promise<P>;
}

export type Properties<TModel, TEntity extends Entity> = { [P in keyof TModel]?: Property<TEntity, TModel[P]> };

export function createPublicSchema<TEntity extends Entity, TModel = any>(
  schema: EntitySchema<TEntity>,
  properties: Omit<Properties<TModel, TEntity>, '_id' | 'createDate' | 'updateDate'>
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
  baseUrl: string,
  propertyOptions: PropertyOptions<ImageRef<TCrops>>,
  getProperty: (entity: TEntity) => ImageRef<TCrops>
): Property<TEntity, ImageModel<TCrops>> {
  const crops = propertyOptions.type.meta.crops.meta;
  const cropKeys = Object.keys(crops);
  return {
    type: RefractTypes.shape({
      imageId: RefractTypes.string,
      crops: RefractTypes.shape(
        cropKeys.reduce((acc, key) => {
          acc[key] = RefractTypes.string;
          return acc;
        }, {})
      )
    }) as any,
    resolve: entity => {
      const property = getProperty(entity);
      if (!property) {
        return null;
      }
      return {
        imageId: property.imageId,
        crops: cropKeys.reduce(
          (acc, cropKey) => {
            const crop = property.crops[cropKey];
            const pixelCrop = crop.pixelCrop
              ? {
                  height: crop.pixelCrop.height,
                  width: crop.pixelCrop.width,
                  x: crop.pixelCrop.x,
                  y: crop.pixelCrop.y
                }
              : undefined;
            const cropQuery = crop && pixelCrop ? `?${queryString.stringify(pixelCrop)}` : '';
            acc[cropKey] = `${baseUrl}/files/${property.imageId}${cropQuery}`;
            return acc;
          },
          {} as any
        )
      } as ImageModel<TCrops>;
    }
  };
}
