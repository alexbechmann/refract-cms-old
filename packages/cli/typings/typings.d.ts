import { Omit } from '@material-ui/core';
import { ServerConfig } from '@refract-cms/server';

declare module '@refract-cms/cli' {
  export interface CliServerConfig extends Omit<ServerConfig, 'rootPath' | 'config'> {}
}
