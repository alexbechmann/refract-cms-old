import { configure, FileSchema } from '@refract-cms/core';
import { ExampleSchema } from './example/example.schema';
import { SettingsSchema } from './settings/settings.model';

export default configure({
  schema: [ExampleSchema, SettingsSchema, FileSchema]
});
