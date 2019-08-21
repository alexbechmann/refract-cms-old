import { Omit, Theme } from '@material-ui/core';
import { ServerConfig } from '@refract-cms/server';
import { Config } from '@refract-cms/core';

declare module '@refract-cms/cli' {
  export interface CliServerConfig extends Omit<ServerConfig, 'rootPath' | 'config'> {
    configureExpress?: (app: express.Express) => void;
  }
  export interface CliConfig extends Config {
    theme: Theme;
    path?: string;
  }
  export function configureCli(config: CliConfig): CliConfig;
}
