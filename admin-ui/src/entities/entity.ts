import { EntityOptions } from './entity-options';

export default function entity(options: EntityOptions) {
  return (target: any) => {
    target.hasBeenDecorated = true;
    target.options = options;
    Reflect.defineMetadata('options', options, target);
  };
}
