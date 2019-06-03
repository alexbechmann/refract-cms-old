import React from 'react';
import { PropertyEditorProps } from './property-editor-props';
import { PropertyType, ActualType } from './property-types';
import { Return } from '../entities/entity-schema';

type ServerResolverContext = {
  cmsBaseUrl: string;
};

type Resolver<T, V> = (source: Return<T>, context: ServerResolverContext) => V | Promise<V>;

export interface EditablePropertyOptions<T, TPropertyType extends PropertyType | any> {
  mode: 'edit';
  displayName?: string;
  editorComponent: React.ComponentType<PropertyEditorProps<ActualType<TPropertyType>>>;
  defaultValue?: (() => ActualType<TPropertyType>) | ActualType<TPropertyType> | Promise<ActualType<TPropertyType>>;
  type: TPropertyType;
}

export interface ResolvedPropertyOptions<T, TPropertyType extends PropertyType | any> {
  mode: 'resolve';
  type: TPropertyType;
  resolve?: Resolver<T, ActualType<TPropertyType>>;
}

export type PropertyOptions<T, TPropertyType extends PropertyType | any> =
  | EditablePropertyOptions<T, TPropertyType>
  | ResolvedPropertyOptions<T, TPropertyType>;
