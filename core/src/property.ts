import 'reflect-metadata';

export default function(options: { editorAlias: string }): PropertyDecorator {
  return (prototype, propertyKey) => {
    console.log(options, prototype, propertyKey);
    Reflect.defineMetadata(propertyKey, options, prototype);
  };
}
