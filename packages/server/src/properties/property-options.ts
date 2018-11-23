import * as React from 'react';
import { GraphQLScalarType, GraphQLNonNull, GraphQLNullableType } from 'graphql';

export interface PropertyOptions<T = any> {
  type: GraphQLScalarType | GraphQLNonNull<GraphQLNullableType>
}