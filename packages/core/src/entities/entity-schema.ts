import composeSchema from './compose-schema';

export type EntitySchema<T = any> = ReturnType<typeof composeSchema>;
