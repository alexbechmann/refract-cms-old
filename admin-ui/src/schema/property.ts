import 'reflect-metadata';

export default function(options: {
  editorAlias: 'text' | 'number' | 'date' | 'custom';
  editorComponent?: any;
}): PropertyDecorator {
  return (target, propertyKey) => {
    var classConstructor = target.constructor;
    const propertyData = Reflect.getMetadata('properties', classConstructor) || {};
    propertyData[propertyKey] = options;
    Reflect.defineMetadata('properties', propertyData, classConstructor);
  };
}
