import { mongoHelper } from '../db/mongo-helper';
import { editorService } from '../editors/editor.service';

export interface Config {
  mongoConnectionString?: string;
  adminCredentials: {
    password: string;
  };
  auth: {
    tokenSecret: string;
  }
}

export const configure = async (config: Config) => {
  global['refract-cms-config'] = config;
  await editorService.ensureAdminExists(config.adminCredentials.password);
};

export const getCurrentConfig = () => global['refract-cms-config'] as Config;
