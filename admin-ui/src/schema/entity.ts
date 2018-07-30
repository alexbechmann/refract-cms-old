export default function entity(options: { alias: string; displayName?: string; allowMultiple?: boolean }) {
  return (target: any) => {
    target.hasBeenDecorated = true;
    target.options = options;
    Reflect.defineMetadata('options', options, target);
  };
}
