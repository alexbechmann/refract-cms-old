import 'reflect-metadata';
import * as React from 'react';
import { PropertyEditorProps } from './property-editor-props';

export default function<T>(options: {
  displayName?: string;
  editorComponent?: React.ComponentType<PropertyEditorProps<T>>;
}): PropertyDecorator {
  return (target, propertyKey) => {
    var classConstructor = target.constructor;
    const propertyData = Reflect.getMetadata('properties', classConstructor) || {};
    propertyData[propertyKey] = options;
    Reflect.defineMetadata('properties', propertyData, classConstructor);
  };
}
