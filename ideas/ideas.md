```ts
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
      type: RefractTypes.string
    }
  }
});
```
