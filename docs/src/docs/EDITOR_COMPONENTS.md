---
path: "/built-in-editor-components"
title: Built in editor components
order: 3
---

@refract-cms/core comes with built-in editor components (react based) for the basic input types:

## Text editor

```typescript
import { RefractTypes, createTextEditor } from '@refract-cms/core';

properties: {
  ...
  myProperty: {
    displayName: 'My property',
    editorComponent: createTextEditor({
      maxLength: 30
    }),
    defaultValue: '',
    type: RefractTypes.string
  }
}
```

## Date picker editor

```typescript
import { RefractTypes, createDatePickerEditor } from '@refract-cms/core';

properties: {
  ...
  myProperty: {
    displayName: 'My property',
    editorComponent: createDatePickerEditor(),
    type: RefractTypes.date
  }
}

```

## Image Picker Editor

## Single Dropdown Editor

## Multiple Dropdown Editor

## Multiple Entity Picker Editor

```typescript
import { RefractTypes, createMultipleEntityPickerEditor } from '@refract-cms/core';
import { ProductSchema } from './path/to/product.schema.tsx';

properties: {
  ...
  productIds: {
    displayName: 'List of products',
    type: RefractTypes.arrayOf(RefractTypes.string),
    editorComponent: createMultipleEntityPickerEditor({
      schema: ProductSchema,
      max: 2
    })
  }
}
```

## Single Entity Picker Editor

```typescript
import { RefractTypes, createSingleEntityPickerEditor } from '@refract-cms/core';
import { ProductSchema } from './path/to/product.schema.tsx';

properties: {
  ...
  productId: {
    displayName: 'Linked Product',
    type: RefractTypes.string,
    editorComponent: createSingleEntityPickerEditor({
      schema: ProductSchema
    })
  }
}
```

## List Editor

## File Upload Editor
