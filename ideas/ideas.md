```tsx
const BlogItemSchema = defineEntity({
  options: {
    alias: "blobItem",
    displayName: "Blog item"
  },
  properties: {
    title: {
      displayName: "Title",
      editorComponent: createTextEditor({
        maxLength: 50
      }),
      editorComponent2: props => <TextEditor maxLength={50} {...props} />,
      type: RefractTypes.string
    }
  }
});

function getPrototype<TPropertyType extends PropertyType>(
  property: TPropertyType
) {
  if (typeof property === "object") {
    return Object.keys(property).reduce((acc, propertyKey) => {
      acc[propertyKey] = getPrototype(property[propertyKey]);
      return acc;
    }, {});
  } else {
    return property.prototype;
  }
}
```
