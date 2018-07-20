import 'reflect-metadata';

export default function(options: { editorAlias: 'text' | 'number' | 'date' }): PropertyDecorator {
  return (target, propertyKey) => {
    var classConstructor = target.constructor;
    const propertyData = Reflect.getMetadata('properties', classConstructor) || [];
    propertyData.push({
      propertyKey,
      options
    });
    Reflect.defineMetadata('properties', propertyData, classConstructor);
  };
}
