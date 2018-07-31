import 'reflect-metadata';
import * as React from 'react';
import { PropertyOptions } from './property-options';

export default function<T>(options: PropertyOptions<T>): PropertyDecorator {
  return (target, propertyKey) => {
    var classConstructor = target.constructor;
    const propertyData = Reflect.getMetadata('properties', classConstructor) || {};
    propertyData[propertyKey] = options;
    Reflect.defineMetadata('properties', propertyData, classConstructor);
  };
}
