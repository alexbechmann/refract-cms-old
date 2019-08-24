import { createServerPlugin } from './create-server-plugin';
import { ASTNode } from 'graphql';
import { emitGraphqlCodeGen } from '../graphql/emit-graphql-codegen';

export interface CodeGenServerPluginOptions {
  outputPath: string;
  queries?: ASTNode[];
}

export const codeGenServerPlugin = (options: CodeGenServerPluginOptions) =>
  createServerPlugin(
    {
      name: '',
      schema: []
    },
    {
      events: {
        onSchemaBuilt: schema => {
          emitGraphqlCodeGen(schema, options);
        }
      }
    }
  );
