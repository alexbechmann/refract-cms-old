export default function entity(options: { alias: string }) {
  return (target: any) => {
    target.hasBeenDecorated = true;
    target.alias = options.alias;
  };
}
